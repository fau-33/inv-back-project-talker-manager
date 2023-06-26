module.exports = (req, res, next) => {
    if (!req.body.talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};