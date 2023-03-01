import { check } from "express-validator";

export const loginValidation = [
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email")
    .bail()
    .isEmail()
    .withMessage("Debes ingresar un email válido"),
  check("password")
    .notEmpty()
    .withMessage("Debes ingresar una contraseña")
];

export const registerValidation = [
  check("firstName").notEmpty().withMessage("Debes ingresar tu nombre"),
  check("lastName").notEmpty().withMessage("Debes ingresar tu apellido"),
  check("email")
    .notEmpty().withMessage("Debes ingresar un email").bail()
    .isEmail().withMessage("Debes ingresar un email válido"),
  check("password")
    .notEmpty().withMessage("Debes ingresar una contraseña").bail()
    .isLength({ min: 8 }).withMessage("Debes ingresar una contraseña con al menos 8 carácteres"),
];