//auth rotasına gidildiğinde kullanıcı yetkili mi sorgulayacak
const express = require("express");
const router = express.Router();
const { getAccessToRoute, isAdmin } = require("../middlewares/authMiddleware");

const {
  login,
  refreshAccessToken,
  verifyToken,
  logout,
  register,
  verifyEmail,
  resendVerificationEmail,
} = require("../controllers/authController"); // token burada oluşturuluyor

// admin tarafından post isteği ile veri tabanına kullanıcı ekleme
router.post("/register", register);
router.post("/login", login);
router.post("/logout", getAccessToRoute, logout);

router.get("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);

// buraya refresh işlemleri atılacak
router.post("/refresh-token", getAccessToRoute, refreshAccessToken);
router.post("/verify-token", verifyToken);

// Admin route'u, önce token doğrulaması yapılır, sonra admin kontrolü
router.get("/admin", getAccessToRoute, isAdmin, (req, res) => {
  res.send("Welcome Admin! You have access.");
});

module.exports = router;
