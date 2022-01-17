const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.postSignUp = [
  // validate sign up form
  body("username", "Username cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (username) => {
      try {
        const userExists = await User.findOne({ username });
        if (userExists) {
          throw new Error("Username already in use");
        }
      } catch (err) {
        throw new Error(err);
      }
    }),
  body("password", "Password must be at least 5 characters long.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body(
    "confirmPassword",
    "Password must be at least 5 characters long."
  ).custom((value, { req }) => {
    if (value !== req.body.password) {
      return next("Passwords must match!");
    }
    return true;
  }),

  // handle signup
  async (req, res, next) => {
    const { username } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ username, errors: errors.array() });
    }
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      User.create({ username, password: hashedPassword }, (err, user) => {
        if (err) return next(err);
        jwt.sign(
          { _id: user._id, username: user.username },
          process.env.SECRET,
          { expiresIn: "30m" },
          (err, token) => {
            if (err) return next(err);
            return res.json({
              token,
              user: { _id: user._id, username: user.username },
              message: "Signed up successfully.",
            });
          }
        );
      });
    });
  },
];

exports.getLogin = async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          return next(new Error("An error has occurred."));
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }
          const body = { _id: user._id, username: user.username };
          const token = jwt.sign({ user: body }, process.env.SECRET, {
            expiresIn: "30m",
          });
          return res.json({ user, token });
        });
      } catch (err) {
        return next(err);
      }
    }
  )(req, res, next);
};
