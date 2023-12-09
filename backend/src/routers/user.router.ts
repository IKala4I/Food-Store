import {sample_users} from '../data';
import jwt from 'jsonwebtoken';
import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {UserModel} from '../models/user.model';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await UserModel.create(sample_users);
    res.send("Seed Is Done!");
  }
));

router.post("/login", (req, res) => {
  const {email, password} = req.body;
  const user = sample_users.find(user => user.email === email && user.password === password);

  if (user)
    res.send(generateTokenResponse(user));
  else
    res.status(400).send("User email or password is not valid!");

});

const generateTokenResponse = (user: any) => {
  user.token = jwt.sign({
    email: user.email, isAdmin: user.isAdmin
  }, "SomeRandomText", {
    expiresIn: "30d"
  });
  return user;
};

export default router;
