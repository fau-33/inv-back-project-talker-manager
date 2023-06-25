module.exports = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email || email.trim() === '') {
        return res
            .status(400)
            .json({ message: 'O campo "email" é obrigatório' });
    }

    if (!emailRegex.test(email)) {
        return res 
            .status(400)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
    next();
};