import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/user.js";

dotenv.config();

export const singupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY
      );

      response.status(200).json({
        accessToken: accessToken,
        name: user.name,
        username: user.username,
        id: user._id,
      });
    } else {
      response.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    response.status(500).json({ msg: "error while login the user" });
  }
};
