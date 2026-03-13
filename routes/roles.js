var express = require('express');
var router = express.Router();
let { roles } = require('../utils/data');
let { IncrementalId } = require('../utils/IncrementalIdHandler');

// GET all roles (not deleted)
router.get('/', function (req, res) {
    let result = roles.filter(e => !e.isDeleted);
    res.send(result);
});

// GET role by ID
router.get('/:id', function (req, res) {
    let result = roles.find(e => !e.isDeleted && e.id == req.params.id);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: "ROLE NOT FOUND" });
    }
});

// POST Create Role
router.post('/', function (req, res) {
    const { name, description } = req.body;

    // 1. Required field check
    if (!name) {
        return res.status(400).send({ message: "Role name is required" });
    }

    // 2. Uniqueness check
    const existingRole = roles.find(r => r.name === name);
    if (existingRole) {
        return res.status(400).send({ message: "Role name already exists" });
    }

    let newObj = {
        id: IncrementalId(roles),
        name: name,
        description: description || "",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    roles.push(newObj);
    res.status(201).send(newObj);
});

// PUT Update Role
router.put('/:id', function (req, res) {
    let role = roles.find(e => e.id == req.params.id && !e.isDeleted);
    if (role) {
        const { name, description } = req.body;

        // 1. Uniqueness check for name if it's being updated
        if (name && name !== role.name) {
            if (roles.find(r => r.name === name)) {
                return res.status(400).send({ message: "Role name already exists" });
            }
        }

        if (name) role.name = name;
        if (description !== undefined) role.description = description;

        role.updatedAt = new Date();
        res.send(role);
    } else {
        res.status(404).send({ message: "ROLE NOT FOUND" });
    }
});

// DELETE Soft Delete Role
router.delete('/:id', function (req, res) {
    let result = roles.find(e => e.id == req.params.id && !e.isDeleted);
    if (result) {
        result.isDeleted = true;
        result.updatedAt = new Date();
        res.send({ message: "Role deleted successfully", result });
    } else {
        res.status(404).send({ message: "ROLE NOT FOUND" });
    }
});

module.exports = router;
