import dotenv from "dotenv";
dotenv.config();
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// Token
const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
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

    // hashed passsword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = await createToken(user._id);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credemtials, please check your email or password.",
      });
    }

    const token = await createToken(user._id);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { registerUser, userLogin };
