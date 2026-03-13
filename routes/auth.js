var express = require('express');
var router = express.Router();
let { users } = require('../utils/data');
let { IncrementalId } = require('../utils/IncrementalIdHandler');
let { RegisterValidator, handleResultValidator } = require('../utils/validatorHandler')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let { checkLogin } = require('../utils/authHandler')

/* REGISTER */
router.post('/register', RegisterValidator, handleResultValidator, async function (req, res, next) {
    const { username, password, email } = req.body;

    // Check uniqueness
    if (users.find(u => u.username === username || u.email === email)) {
        return res.status(400).send({ message: "Username or email already exists" });
    }

    let newUser = {
        id: IncrementalId(users),
        username: username,
        password: bcrypt.hashSync(password, 10),
        email: email,
        fullName: "",
        avatarUrl: "https://i.sstatic.net/l60Hf.png",
        status: true,
        role: 2, // Standard User
        loginCount: 0,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    users.push(newUser);
    res.send({
        message: "dang ki thanh cong"
    })
});

/* LOGIN */
router.post('/login', async function (req, res, next) {
    let { username, password } = req.body;
    let getUser = users.find(u => u.username === username && !u.isDeleted);

    if (!getUser) {
        return res.status(403).send("tai khoan khong ton tai")
    } else {
        // Lock check
        if (getUser.lockTime && new Date(getUser.lockTime) > new Date()) {
            return res.status(403).send("tai khoan dang bi ban");
        }

        if (bcrypt.compareSync(password, getUser.password)) {
            getUser.loginCount = 0;
            let token = jwt.sign({
                id: getUser.id
            }, "secret", {
                expiresIn: '30d'
            })
            res.send(token)
        } else {
            getUser.loginCount = (getUser.loginCount || 0) + 1;
            if (getUser.loginCount >= 3) {
                getUser.loginCount = 0;
                getUser.lockTime = new Date(Date.now() + 60 * 60 * 1000); // Lock for 1 hour
            }
            res.status(403).send("thong tin dang nhap khong dung")
        }
    }
});

/* GET ME */
router.get('/me', checkLogin, function (req, res, next) {
    res.send(req.user)
})

module.exports = router;
