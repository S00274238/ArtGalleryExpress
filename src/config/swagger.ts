import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Art API',
            version: '1.0.0',
            description: 'REST API for managing arts'
        },
        servers: [
            {
                url: "/api/v1/",
            },
        ],
    },
    apis: ['./src/controllers/*.ts', './src/models/*.ts']
};


export const swaggerSpec = swaggerJSDoc(options);


