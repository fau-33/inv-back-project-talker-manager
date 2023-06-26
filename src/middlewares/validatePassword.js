module.exports = (req, res, next) => {
    if (!req.body.password) {
      return res
        .status(400)
        .json({ message: 'O campo "password" é obrigatório' }); 
    }
  
    const { password } = req.body;
  
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  
    next();
  };