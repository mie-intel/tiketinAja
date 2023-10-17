// I'm using hapi framework to run the server
const Hapi = require('@hapi/hapi')
const routes = require('./routes')

// this will start to run the server
const init = async () => {
    const server = new Hapi.server({
        port: 5000,
        host: 'localhost',
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
