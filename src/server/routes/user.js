import express from "express";

const userRouter = express.Router({
  caseSensitive: true,
});

userRouter.get("/list", (req, res) => {
  res.json({ list: [{ name: "bob" }, { name: "kkk" }] }).end();
});

module.exports = userRouter;
