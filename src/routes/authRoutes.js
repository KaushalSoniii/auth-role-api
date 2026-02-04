const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

// protected route
router.get("/profile", auth, (req, res) => {
  res.json({ message: "Profile access", user: req.user });
});

// admin-only route
router.delete("/admin", auth, role("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
