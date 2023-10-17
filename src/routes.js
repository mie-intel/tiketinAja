// import every function defined on handler.js
const {
    mainPage,

    addFilm,
    bookFilm,

    showAllUser,
    showUser,
    createUser,
    topUpUser,
    deleteUser
} = require('./handler')

const routes = [
    // This part contain every route related to the film
    {
        // display all available film
        method: 'GET',
        path: '/',
        handler: mainPage,
    },

    {
        // add new film
        method: 'POST',
        path: '/film/add',
        handler: addFilm,
    },

    {
        // book a film
        method: 'PUT',
        path: '/film/book',
        handler: bookFilm,
    },

    // This part contain every route related to the user
    {
        // display all available user
        method: 'GET',
        path: '/user',
        handler: showAllUser,
    },

    {
        // display detail information of specific user
        method: 'GET',
        path: '/user/{name}',
        handler: showUser
    },

    {
        // create a new user account
        method: 'POST',
        path: '/user/create',
        handler: createUser,
    },

    {
        // top up some amount of money to a specific user account
        method: 'PUT',
        path: '/user/topup',
        handler: topUpUser,
    },

    {
        // delete a user account
        method: 'DELETE',
        path: '/user/delete',
        handler: deleteUser,
    }
]

module.exports = routes;