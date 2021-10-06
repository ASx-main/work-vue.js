import db from './db';

const registration = (req, res, ctx) => {
  const isSuccess = db.createUser(req.body);
  if (isSuccess) {
    return res(ctx.status(200), ctx.json({ data: req.body, success: true }));
  }
  return res(ctx.status(400), ctx.json('Ошибка регистрации'));
};

export default {
  registration,
};
