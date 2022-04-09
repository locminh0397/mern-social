import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await Users.findOne({ email });
    if (!checkUser)
      return res.status(404).json({ msg: "Email or password invalid!" });
    const isMatchPassword = await bcryptjs.compare(
      password,
      checkUser.password
    );
    if (!isMatchPassword)
      return res.status(400).json({ msg: "Email or password invalid!" });
    const token = jwt.sign(
      { email: checkUser.email, id: checkUser._id },
      process.env.JWT, {expiresIn: '1h'}
    );
    res.status(200).json({ result: checkUser, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Register = async (req, res) => {
  const { email, password, confirmPassword, lastName, firstName } = req.body;
  try {
    const checkUser = await Users.findOne({ email });
    if (checkUser)
      return res.status(400).json({ msg: "User is already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Password don't match" });
    const hashPassword = await bcryptjs.hash(password, 12);
    const result = await Users.create({email, password: hashPassword, name: `${firstName} ${lastName}`})
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT, {expiresIn: '1h'}
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
