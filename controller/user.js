import { Users } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utility/features.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await Users.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: true,
      message: "User Already Exist",
    });
  }

  const hasedpass = await bcrypt.hash(password, 10);

  user = await Users.create({ name, email, password: hasedpass });

  sendCookies(user, res, "Register Successfully", 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid User Or Password",
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid User Or Password",
    });

  sendCookies(user, res, `Welcome Back ${user.name}`, 200);
};

export const getMyDetails = (req, res) => {
  res.json({
    user: req.user,
    status: true,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV == "Development" ? false : true,
    })
    .json({
      success: true,
      message: "User Logout Succesfully",
    });
};
