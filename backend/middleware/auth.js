// Тук по-късно ще добавим реална логика с Firebase Auth + users колекция.
// Засега само пуска всички, но структурата за роли вече я има.

export function checkRole(requiredRole) {
  return (req, res, next) => {
    // Пример за бъдеща логика:
    // const authHeader = req.headers.authorization;
    // 1) validate token with Firebase Auth
    // 2) load user from "users" collection
    // 3) if user.role === requiredRole → next(), иначе 403

    // Временно: allow all
    next();
  };
}
