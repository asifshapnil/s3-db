const _ = require('lodash');
const path = require('path');
const glob = require('glob');

const getGlobbedPaths = function (globPatterns, excludes) {
    let urlRegex = new RegExp("^(?:[a-z]+:)?\/\/", "i");

    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            let files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (let i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], "");
                            }
                        }
                    } else {
                        file = file.replace(excludes, "");
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

async function initEnvironmentVariables() {
    require('dotenv').config();

    const nodecache = require(path.join(process.cwd(), 'src/config/lib/nodecache'));
    const secretsManager = require(path.join(process.cwd(), 'src/config/lib/secrets-manager'));

    const secrets = await secretsManager.getSecrets();

    for (const key in secrets) {
        if(secrets.hasOwnProperty(key)) {
            nodecache.setValue(key, secrets[key]);
        }
    }
}

function getRoutePaths() {
    const routes = [
        'src/modules/**/*.routes.js'
    ];

    return getGlobbedPaths(routes);
}

exports.getRoutePaths = getRoutePaths;
exports.initEnvironmentVariables = initEnvironmentVariables;
