// Извлекает токен из заголовка и:
// 1. Проверяет валидность токена (то есть, что мы его выдали и он не истек).
// 2. Извлекает из токена id, находит пользователя в базе по id и прикрепляет его к запросу (request.user).

// Пошаговая инструкция:
// 1. Извлечь из заголовков запроса содержимое заголовка Аuthorization.
// 2. Разделить его на два слова: Bearer и тoken.
// 3. Проверить равно ли первое слово Bearer.
// 4. Проверить валидность второго слова (тoken).
// 5. Усли токен валиден, извлечь из него id и найти пользователя в базе по id и прикрепить его к запросу (request).

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authToken = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authToken;
