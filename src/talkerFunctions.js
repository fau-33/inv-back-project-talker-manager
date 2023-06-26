const fs = require('fs').promises;
const { join } = require('path');

const path = join(__dirname, 'talker.json');

const readTalker = async () => {
    const talkers = await fs.readFile(path);
    return JSON.parse(talkers);
};

const findById = async (id) => {
    const talkers = await readTalker();
    const talker = talkers.find((t) => t.id === id);
    return talker;
};

const writeTalker = async (talker) => {
    const talkers = await readTalker();
    const newTalker = { id: talkers.length + 1, ...talker };
    
    talkers.push(newTalker);
    await fs.writeFile(path, JSON.stringify(talkers));
  
    return newTalker;
  };

module.exports = {
    readTalker,
    findById,
    writeTalker,
};