import * as express from 'express';

const userRouter = express.Router({
  caseSensitive: true,
});

userRouter.get('/list', (req, res) => {
  const mock = { list: [{ name: 'bob' }, { name: 'kkk' }] };
  res.json(mock).end();
});

module.exports = userRouter;
