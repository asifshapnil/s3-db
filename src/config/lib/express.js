const path = require('path');
const helmet = require('helmet');
const express = require('express');
const morganBody = require('morgan-body');
const config = require('../config');
const swagger = require('./swagger/swagger');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

module.exports = async function () {
    let app = express();

    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    if(process.env.NODE_ENV === 'production') {
        morganBody(app, {
            noColors: true,
            prettify: false,
            filterParameters: ['password'],
            stream: {
                write: message => {
                }
            }
        });
    }
    app.use(express.urlencoded({ extended: true }));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger.specs, swagger.uiOptions));

    app.set('port', process.env.PORT);

    const routePaths = config.getRoutePaths();

    routePaths.forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    return app;
};
