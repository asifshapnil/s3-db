const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `ZUORDER API'S`,
            description: 'API documentation for the ZUORDER APP',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local Server',
            }
        ]
    },
    apis: ['./src/config/lib/swagger/*.yaml']
};

const specs = swaggerJsdoc(options);

var uiOptions = {
    swaggerOptions: {
        docExpansion: 'list'
    }
};

exports.specs = specs;
exports.uiOptions = uiOptions;
