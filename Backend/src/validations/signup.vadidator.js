const { check } = require("express-validator");

const signupValidator = [
  check("firstName")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("First name must be 3-50 letters long")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage("Enter a valid first name: (letters only)"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Enter a valid last name: (letters only)"),

  check("email").isEmail().withMessage("Enter a valid email"),

  check("password")
    .isLength({ min: 8, max: 60 })
    .withMessage("Password must be 8-60 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast 1 capital letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast 1 small letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain atleast 1 number")
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
    .withMessage("Password must contain at least 1 special character"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password do not match");
    }
    return true;
  }),
];

module.exports = signupValidator;
