import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Register error" });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password required",
      });
    }

    const user = await User.findOne({ email });
       
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) {
      return res.status(400).json({
        message: "wrong password",
      });
    }

    // token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
 

    res.json({
      message: "login success",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("login error")
    res.status(500).json({
      message: "server error",
    });
  }
};