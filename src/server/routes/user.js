import express from 'express';

const userRouter = express.Router({
  caseSensitive: true,
});

userRouter.get('/list', (req, res, next) => {
  res.json({ list: [{ name: 'bob' }, { name: 'John' }] }).end();
});

export default userRouter;
