const jwt = require("jsonwebtoken");
// const config = require("config");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    console.log("token auth = ", token);
    if (!token) return res.status(401).send("Acess denied. No token provided.");

    try {
        console.log("auth try");
        const decoded = jwt.verify(token, "1111");
        req.user = decoded;

        next();
    } catch (error) {
        console.log("Auth catch", error)
        res.status(400).send("Invalid token.");
    }
};