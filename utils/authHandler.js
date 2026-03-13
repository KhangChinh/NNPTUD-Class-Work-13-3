let jwt = require('jsonwebtoken')
let { users } = require('./data')

module.exports = {
    checkLogin: async function (req, res, next) {
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer")) {
            return res.status(403).send("ban chua dang nhap");
        }
        token = token.split(" ")[1];
        try {
            let result = jwt.verify(token, "secret")
            let user = users.find(u => u.id == result.id && !u.isDeleted)
            if (!user) {
                return res.status(403).send("ban chua dang nhap");
            } else {
                req.user = user;
                next()
            }
        } catch (error) {
            return res.status(403).send("ban chua dang nhap");
        }
    }
}
