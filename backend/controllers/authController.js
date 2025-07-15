// backend/controllers/authController.js

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials
  const validUser = {
    username: "admin",
    password: "password123",
  };

  if (username === validUser.username && password === validUser.password) {
    req.session.user = { username };
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
