const fs = require('fs').promises;
const { join } = require('path');

const path = join(__dirname, 'talker.json');

const readTalker = async () => {
    const talkers = await fs.readFile(path);
    return JSON.parse(talkers);
};

module.exports = {
    readTalker,
};