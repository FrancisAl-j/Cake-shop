import dotenv from "dotenv";
dotenv.config();
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kikobilas123@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

// Token
const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

const registerUser = async (req, res) => {
  const { name, email, password, temporaryToken } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validationg email and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be more than 8 characters" });
    }

    const payload = {
      name: name,
      email: email,
    };

    // hashed passsword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      temporaryToken: jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 12000,
      }),
    });

    const user = await newUser.save();
    const token = await createToken(user._id);

    const activateEmail = {
      from: "Cake Shop Staff, staff@CakeShop@gmail.com",
      to: user.email,
      subject: "Account Activation",
      text: `Hello ${user.name}, Activate your account by clinic the provided link`, // Plain text fallback
      html: `Hello <strong>${user.name}</strong>,<br><br>Activate your account by clicking the link provided!<br><br>
  <a href="http://localhost:5174/verify/email/${user.temporaryToken}">Click here to log in</a>`,
    };

    transporter.sendMail(activateEmail, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Activation Message Confirmation:", info.response);
      }
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Checks the temporary token to confirm email
const verifyToken = async (req, res) => {
  try {
    // Find the user with the temporaryToken using await
    const user = await User.findOne({ temporaryToken: req.params.token });

    // If user is not found, handle accordingly
    if (!user) {
      return res.json({
        success: false,
        message: "Activation link has expired.",
      });
    }

    const token = req.params.token; // Save the token from URL for verification
    console.log("the token is", token);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Activation link has expired.",
        });
      }

      // Update user details
      user.temporaryToken = false; // Remove temporary token
      user.active = true; // Change account status to Activated

      // Save the updated user data
      try {
        await user.save();

        // If save succeeds, create and send email confirmation
        const emailActivate = {
          from: "Localhost Staff, staff@localhost.com",
          to: user.email,
          subject: "Localhost Account Activated",
          text: `Hello ${user.name}, Your account has been successfully activated!`,
          html: `Hello <strong>${user.name}</strong>,<br><br>Your account has been successfully activated!`,
        };

        // Send email confirmation
        transporter.sendMail(emailActivate, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Activation Message Confirmation:", info.response);
          }
        });

        // Respond with success message
        res.json({
          succeed: true,
          message: "User has been successfully activated",
        });
      } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ message: "Failed to activate user" });
      }
    });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Failed to find user for activation" });
  }
};

// User login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credemtials, please check your email or password.",
      });
    }

    const token = await createToken(user._id);

    res.status(200).json({ token: token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin Side
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    const allCustomers = users.length;

    res.status(200).json(allCustomers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { registerUser, userLogin, verifyToken };
