import Admin from "../models/adminModel.js";
import Employee from "../models/employeeModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

    const affiliate = await newAffiliate.save();

    res.status(200).json(affiliate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { affiliateSignUp };
