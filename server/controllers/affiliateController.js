import Admin from "../models/adminModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

const affiliateSignUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already existing." });
    }

    // Validator
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be more than 8 characters." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAffiliate = new Admin({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === "Admin") {
      newAffiliate.active = true;
    }

    const affiliate = await newAffiliate.save();

    res.status(200).json(affiliate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const affiliateSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const affiliate = await Admin.findOne({ email });
    if (!affiliate) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, affiliate.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials, Please chech your email and password.",
      });
    }

    const token = await createToken(affiliate._id);

    res.status(200).json({ user: affiliate, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetching workers/employee
const getAffiliate = async (req, res) => {
  try {
    const affiliate = await Admin.find();

    res.status(200).json(affiliate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { affiliateSignUp, affiliateSignin, getAffiliate };
