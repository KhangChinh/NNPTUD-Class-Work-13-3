var express = require('express');
var router = express.Router();
let { users, roles } = require('../utils/data');
let { IncrementalId } = require('../utils/IncrementalIdHandler');
let { userCreateValidator, userUpdateValidator, handleResultValidator } = require('../utils/validatorHandler');
let { checkLogin } = require('../utils/authHandler');

// GET all users (not deleted)
router.get('/', checkLogin, function (req, res) {
    let result = users.filter(e => !e.isDeleted).map(u => {
        let role = roles.find(r => r.id == u.role);
        return { ...u, roleObj: role };
    });
    res.send(result);
});

// GET user by ID
router.get('/:id', function (req, res) {
    let user = users.find(e => !e.isDeleted && e.id == req.params.id);
    if (user) {
        let role = roles.find(r => r.id == user.role);
        res.status(200).send({ ...user, roleObj: role });
    } else {
        res.status(404).send({ message: "USER NOT FOUND" });
    }
});

// POST Create User
router.post('/', userCreateValidator, handleResultValidator, function (req, res) {
    const { username, password, email, fullName, avatarUrl, status, roleId } = req.body;

    // 1. Required fields check
    if (!username || !password || !email) {
        return res.status(400).send({ message: "Username, password, and email are required" });
    }

    // 2. Uniqueness check
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
        return res.status(400).send({ message: "Username or email already exists" });
    }

    // 3. Role existence check
    const roleExists = roles.find(r => r.id == roleId);
    if (!roleExists) {
        return res.status(400).send({ message: "Role ID not found" });
    }

    let newObj = {
        id: IncrementalId(users),
        username: username,
        password: password,
        email: email,
        fullName: fullName || "",
        avatarUrl: avatarUrl || "https://i.sstatic.net/l60Hf.png",
        status: status || false,
        role: roleId,
        loginCount: 0,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    users.push(newObj);
    res.status(201).send(newObj);
});

// PUT Update User
router.put('/:id', userUpdateValidator, handleResultValidator, function (req, res) {
    let user = users.find(e => e.id == req.params.id && !e.isDeleted);
    if (user) {
        const { username, email, roleId, loginCount } = req.body;

        // 1. Uniqueness check for username/email if they are being updated
        if (username && username !== user.username) {
            if (users.find(u => u.username === username)) {
                return res.status(400).send({ message: "Username already exists" });
            }
        }
        if (email && email !== user.email) {
            if (users.find(u => u.email === email)) {
                return res.status(400).send({ message: "Email already exists" });
            }
        }

        // 2. Role existence check if roleId is being updated
        if (roleId && roleId !== user.role) {
            if (!roles.find(r => r.id == roleId)) {
                return res.status(400).send({ message: "Role ID not found" });
            }
        }

        // 3. loginCount check
        if (loginCount !== undefined && loginCount < 0) {
            return res.status(400).send({ message: "loginCount cannot be less than 0" });
        }

        let body = req.body;
        let allowedFields = ['username', 'password', 'email', 'fullName', 'avatarUrl', 'status', 'loginCount'];
        allowedFields.forEach(field => {
            if (body[field] !== undefined) user[field] = body[field];
        });

        if (roleId) user.role = roleId;

        user.updatedAt = new Date();
        res.send(user);
    } else {
        res.status(404).send({ message: "USER NOT FOUND" });
    }
});

// DELETE Soft Delete User
router.delete('/:id', function (req, res) {
    let result = users.find(e => e.id == req.params.id && !e.isDeleted);
    if (result) {
        result.isDeleted = true;
        result.updatedAt = new Date();
        res.send({ message: "User deleted successfully", result });
    } else {
        res.status(404).send({ message: "USER NOT FOUND" });
    }
});

// POST Enable User
router.post('/enable', function (req, res) {
    const { email, username } = req.body;
    let user = users.find(u => u.email === email && u.username === username && !u.isDeleted);
    if (user) {
        user.status = true;
        user.updatedAt = new Date();
        res.send({ message: "User enabled successfully", user });
    } else {
        res.status(404).send({ message: "User not found or incorrect info" });
    }
});

// POST Disable User
router.post('/disable', function (req, res) {
    const { email, username } = req.body;
    let user = users.find(u => u.email === email && u.username === username && !u.isDeleted);
    if (user) {
        user.status = false;
        user.updatedAt = new Date();
        res.send({ message: "User disabled successfully", user });
    } else {
        res.status(404).send({ message: "User not found or incorrect info" });
    }
});

module.exports = router;