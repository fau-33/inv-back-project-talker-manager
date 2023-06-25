module.exports = (req, res, next) => {
    const regexEmail = /\S+@\S+\.\S+/;

    if (!regexEmail) {
        return res
            .status(400)
            .json({ message: 'O campo "email" é obrigatório' });
    }

    const { email } = req.body;

    if (!regexEmail.test(email)) {
        return res 
            .status(400)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
    next();
};