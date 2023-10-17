// I'm using hapi framework to run the server
const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const PORT = process.env.PORT | 5000

// this will start to run the server
const init = async () => {
    const server = new Hapi.server({
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    })

    // this will handle all different routing
    server.route(routes);

    await server.start();
    console.log(`Server running at ${server.info.uri}`)
}

init();
