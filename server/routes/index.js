const express = require("express");
const router = express.Router();
const user = require("./user");

// API Routes
router.use("/api/user", user);

module.exports = router;
