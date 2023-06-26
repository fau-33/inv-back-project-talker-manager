module.exports = (req, res, next) => {
    if (!req.body.talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
      }
      
      const { talk } = req.body;
    
      if (!talk.rate && talk.rate !== 0) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
      }
      if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
      }
    
      next();
};