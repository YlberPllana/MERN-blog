const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// POST login
router.post("/login", userController.getLogin);

// POST signup
router.post("/signup", userController.postSignUp);

// GET logout
router.get("/logout", userController.getLogout);

module.exports = router;
