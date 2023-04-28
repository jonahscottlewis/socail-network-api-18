const router = require("express").Router();
const thoughtRoutes = require("./api/thoughtRoutes");
const userRoutes = require("./api/userRoutes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;