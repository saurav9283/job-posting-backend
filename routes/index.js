const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to Job Portal Service" });
});

router.use("/auth", require("./auth-route"));
router.use("/otp", require("./otp-route"));
router.use("/jobs", require("./job-route"));

module.exports = router;
