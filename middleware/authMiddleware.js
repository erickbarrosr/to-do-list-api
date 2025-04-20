const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //  Agora o token vem do cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;

    try {
      // Verifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pega o usuário, sem a senha
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      res.status(401);
      throw new Error("Não autorizado, token inválido");
    }
  } else {
    res.status(401);
    throw new Error("Não autorizado, token não encontrado");
  }
});

module.exports = { protect };
