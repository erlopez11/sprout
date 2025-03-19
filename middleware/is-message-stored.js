const isMessageStored = (req, res, next) => {
    if (req.session.message) {
        res.locals.message = req.session.message;
        req.session.message = null;
    }
    next();
};

module.exports = isMessageStored;