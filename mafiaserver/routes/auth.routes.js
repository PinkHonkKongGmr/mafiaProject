const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const config = require("config");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const express = require("express");
const router = Router();

router.post(
  "/register",
  [
    check("email", "некорректный email").isEmail(),
    check("password", "Мин длина параоля 6 символов").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "некорректные данные при регистрации",
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, hashedPassword });
      await user.save();
      res.status(201).json("Пользователь создан");
    } catch (e) {
      res.status(500).json({ message: "Ошибка. Попробуйте заново" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "некорректные данные при входе в систему",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Ошибка. Попробуйте заново" });
    }
  }
);

module.exports = router;
