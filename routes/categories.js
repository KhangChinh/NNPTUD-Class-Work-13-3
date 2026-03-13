var express = require('express');
var router = express.Router();
let { RandomToken } = require('../utils/GenToken')
let { categories, data } = require('../utils/data')
let slugify = require('slugify')
let { IncrementalId } = require('../utils/IncrementalIdHandler')

/* GET all categories with name filter */
///api/v1/categories
router.get('/', function (req, res, next) {
    let nameQ = req.query.name ? req.query.name : '';
    let result = categories.filter(function (e) {
        return (!e.isDeleted) &&
            e.name.toLowerCase().includes(nameQ.toLowerCase())
    })
    res.send(result);
});

/* GET category by slug */
router.get('/slug/:slug', function (req, res, next) {
    let slug = req.params.slug;
    let result = categories.find(
        function (e) {
            return (!e.isDeleted) && e.slug == slug;
        }
    )
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(404).send({
            message: "SLUG NOT FOUND"
        })
    }
});

/* GET products by category ID */
///api/v1/categories/9
router.get('/:id', function (req, res, next) {
    let categoryId = parseInt(req.params.id);
    let result = data.filter(
        function (e) {
            return (!e.isDeleted) && e.category.id == categoryId;
        }
    );
    res.status(200).send(result);
});

/* CREATE new category */
router.post('/', function (req, res, next) {
    let newObj = {
        id: IncrementalId(categories),
        name: req.body.name,
        slug: slugify(req.body.name, {
            replacement: '-', lower: true, locale: 'vi',
        }),
        image: req.body.image,
        creationAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        isDeleted: false
    }
    categories.push(newObj);
    res.status(201).send(newObj);
})

/* EDIT category by ID */
router.put('/:id', function (req, res, next) {
    let result = categories.find(
        function (e) {
            return e.id == req.params.id
        }
    );
    if (result) {
        let body = req.body;
        let keys = Object.keys(body);
        for (const key of keys) {
            if (result[key] !== undefined) {
                result[key] = body[key];
            }
        }
        result.updatedAt = new Date(Date.now());
        res.send(result)
    } else {
        res.status(404).send({
            message: "ID NOT FOUND"
        })
    }
})

/* DELETE category by ID */
router.delete('/:id', function (req, res, next) {
    let result = categories.find(
        function (e) {
            return e.id == req.params.id
        }
    );
    if (result) {
        result.isDeleted = true;
        res.send(result)
    } else {
        res.status(404).send({
            message: "ID NOT FOUND"
        })
    }
})

module.exports = router;
