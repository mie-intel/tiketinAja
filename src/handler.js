
const { films, users } = require('./database')
const { nanoid } = require('nanoid')

// Film
const mainPage = (request, h) => {
    return h.response({
        status: 'success',
        message: 'daftar films yang ada',
        data: {
            films
        }
    }).code(200)
}

const addFilm = (request, h) => {

    /*
        Getting data from the request object
        The data can be in the form of string / json object
        If the data type is string, then parse it into a json object
    */
    let payload = request.payload;

    if(typeof payload === 'string'){
        payload = JSON.parse(payload);
    }

    let {title, price, amountOfSeat} = payload.data

    /*
        If user client forgot to define the film title, price, or amount of available seat,
        then it will return an error
    */
    if(title === undefined || price === undefined || amountOfSeat === undefined) {
        return h.response({
            status: 'fail',
            message: 'gagal menambah film, pastikan judul film dan harga benar'
        }).code(500);
    }

    /*
        Checking whether the film is already exist or not
        If it is exist already, then do nothing and return fail
    */
    let filmAlreadyExist = films.findIndex((film) => film.title === title);

    if(filmAlreadyExist !== -1) {
        return h.response({
            status: 'fail',
            message: 'film sudah ada sebelumnya'
        }).code(500);        
    }

    /*
        Prepare the price, id, and seat property of the film
    */
    price = Number(price)
    let id = nanoid(16);
    let seat = [];
    for (let i = 1; i <= amountOfSeat; i++) {
        seat.push('unbooked')
    }

    /*
        Push the new film object to the array
    */
    let newFilm = {id, title, price, seat};
    films.push(newFilm);

    console.log('Data films sekarang', films);

    /*
        Film is added successfully
    */
    return h.response({
        status: 'success',
        message: `film dengan judul ${title} berhasil ditambahkan!`
    }).code(200);         
}

const bookFilm = (request, h) => {

    /*
        Getting data from the request object
        The data can be in the form of string / json object
        If the data type is string, then parse it into a json object
    */
    let payload = request.payload;

    if(typeof payload === 'string'){
        payload = JSON.parse(payload);
    }

    let { name, title, seatNumber } = payload.data;

    /*
        If the client forgot to define the film title, ticket price, or the user who book the film
        then it will return an error
    */
    if(name == undefined || title == undefined || seatNumber == undefined) {
        return h.response({
            status: 'fail',
            message: 'gagal memesan film, pastikan semua data telah terisi'
        }).code(500);        
    }

    /*
        Checking whether the film and the user is exist
        If it is not, then do nothing and return fail
    */
    seatNumber = Number(seatNumber);
    let filmIndex = films.findIndex((film) => film.title === title);
    let userIndex = users.findIndex((user) => user.name === name);

    if(filmIndex === -1 || userIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'gagal memesan film, pastikan semua user dan film ada'
        }).code(500);            
    }

    /*
        If the seat is unbooked and the user's money is enough to buy the ticket,
        then decrease the user's money by the ticket price
        and then set the seat condition into 'booked by the user'
        return success
    */
    if(films[filmIndex].seat[seatNumber] === 'unbooked' && users[userIndex].money >= films[filmIndex].price){
        users[userIndex].money -= films[filmIndex].price;
        films[filmIndex].seat[seatNumber] = users[userIndex].id;
        let ticket = {title, filmIndex, seatNumber};
        users[userIndex].tickets.push(ticket);

        console.log(film);

        return h.response({
            status: 'success',
            message: `tiket film ${title} dengan kursi ${seatNumber} telah dipesan oleh ${name}`,
        }).code(200)
    }

    /*
        If the above condition is not fulfill,
        then return fail
    */
    return h.response({
        status: 'fail',
        message: 'gagal memesan karena kursi sudah dipesan atau saldo tidak cukup'
    }).code(500);
}

// User
const showAllUser = (request, h) => {

    /*
        return the users array
    */
    return h.response({
        status: 'success',
        message: 'berikut adalah data user',
        data: {
            users
        }
    }).code(200)
}

const showUser = (request, h) => {

    /*
        Getting data from the request object
    */
    let { name } = request.params;

    if(name === undefined) {
        return h.response({
            status: 'fail',
            message: 'gagal menemukan user'
        }).code(500);       
    }

    /*
        Checking whether the user is exist
        If it is not, then do nothing and return fail
    */
    let userIndex = users.findIndex((user) => user.name === name);

    if(userIndex === -1){
        return h.response({
            status: 'fail',
            message: 'gagal menemukan user'
        }).code(500);
    }

    /*
        Successfully get the user's data
    */
    return h.response({
        status: 'success',
        message: `berikut adalah data dari ${name}`,
        data: {
            users,
        }
    }).code(200)
}

const createUser = (request, h) => {

    /*
        Getting data from the request object
        The data can be in the form of string / json object
        If the data type is string, then parse it into a json object
    */
    let payload = request.payload;

    if(typeof payload === 'string'){
        payload = JSON.parse(payload);
    }

    const { name } = payload.data;
    
    /*
        If the client forgot to define the user's name,
        then it will return an error
    */

    if (name === undefined) {
        return h.response({
            status: 'fail',
            message: 'gagal membuat user'
        }).code(500);
    }

    /*
        Check whether the user is already exist
        if the user is already exist, then it will return an error
    */
    let userAlreadyExist = users.findIndex((user) => user.name === name);
    
    if(userAlreadyExist !== -1) {
        return h.response({
            status: 'fail',
            message: 'akun user sudah ada sebelumnya'
        }).code(500);        
    }

    /*
        Assigning the first value into user's data
    */
    let id = nanoid(16);
    let money = 0;
    let tickets = [];

    /*
        Push the newUser data into the users array
    */
    let newUser = {name, id, money, tickets};
    users.push(newUser)

    console.log('Data users sekarang', users);

    /*
        Successfully add new user
    */
    return h.response({
        status: 'success',
        message: `akun dengan nama ${name} berhasil dibuat!`
    }).code(200);     
}

const topUpUser = (request, h) => {

    /*
        Getting data from the request object
        The data can be in the form of string / json object
        If the data type is string, then parse it into a json object
    */
    let payload = request.payload;

    if(typeof payload === 'string'){
        payload = JSON.parse(payload);
    }

    let { name, addMoney } = payload.data;

    /*
        If the client forgot to define the user's name or the amount of money,
        then it will return an error
    */
    if(name === undefined || addMoney === undefined) {
        return h.response({
            status: 'fail',
            message: 'gagal melakukan top up'
        }).code(500);        
    }

    /*
        Check whether the user is already exist
        if the user is not exist, then it will return an error
    */
    let userIndex = users.findIndex((user) => user.name === name);

    if(userIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'user tidak ditemukan'
        }).code(500);             
    }

    /*
        Increase the amount of user's money
    */
    addMoney = Number(addMoney);
    users[userIndex].money += addMoney;

    console.log(users);

    /*
        Successfully top up some money
    */
    return h.response({
        status: 'success',
        message: `berhasil melakukan top up kepada user ${name} sejumlah ${addMoney}!`
    }).code(200);   
}

const deleteUser = (request, h) => {

    /*
        Getting data from the request object
        The data can be in the form of string / json object
        If the data type is string, then parse it into a json object
    */    
    let payload = request.payload;

    if(typeof payload === 'string'){
        payload = JSON.parse(payload);
    }

    let { name } = payload.data;

    /*
        If the client forgot to define the user's name,
        then it will return an error
    */
    if(name === undefined) {
        return h.response({
            status: 'fail',
            message: 'pastikan memasukkan nama user dengan benar'
        }).code(500);        
    }

    /*
        Check whether the user is already exist
        if the user is not exist, then it will return an error
    */
    let userIndex = users.findIndex((user) => user.name === name);

    if(userIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'user memang tidak ada dari semula'
        }).code(500);             
    }

    /*
        Unbook every user's seat
    */
    for (item of users[userIndex].tickets) {
        films[item.filmIndex].seat[item.seatNumber] = 'unbooked';
    }

    console.log(films);

    /*
        Delete user account
    */
    users.splice(userIndex, 1);

    console.log("Data users sekarang", users);

    /*
        Successfully delete user's account
    */
    return h.response({
        status: 'success',
        message: `berhasil menghapus ${name}!`
    }).code(200);   
}

/*
    Exporting all function
*/
module.exports = {
    mainPage,

    addFilm,
    bookFilm,

    showAllUser,
    showUser,
    createUser,
    topUpUser,
    deleteUser,
}