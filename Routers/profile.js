const router = require("express").Router;
const authController = require('../Controller/AuthController');
const errorHander = require('../handler/error');

router.post('/', authController.isAuthenticated, (req, res) => {
    try {
        res.json({
            user: req.user
        })
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

module.exports = router