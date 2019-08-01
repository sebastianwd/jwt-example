const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const middleware = require("./middleware")

var unless = function (middleware, ...paths) {
    return function (req, res, next) {
        const pathCheck = paths.some(path => path === req.path);
        pathCheck ? next() : middleware(req, res, next);
    };
};

app.use(unless(middleware.logger, "/api/login"));

app.get("/api", (req, res) => {
    res.json({
        message: "welcome"
    })
})

app.post("/api/posts", (req, res) => {
    res.json({
        message: "post createdd..."
    })
})

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        username: "user666",
        email: "suer@gmail.com"
    }

    jwt.sign({
        user
    }, "secretkey", (err, token) => {
        if (err) res.json({
            err
        });

        res.json({
            token
        })
    });
})


app.listen(5000, () =>
    console.log("server up")
)