const path = require('path');

const config = require(path.join(process.cwd(), 'src/config/config'));

module.exports = async function () {
    await config.initEnvironmentVariables();
};
