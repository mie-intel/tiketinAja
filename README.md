# Tiketin Aja API

## Overview
Welcome to Tiketin Aja's API! You can use this API to manage film's tickets sales. You can add several user account and also add several film into this API. 

## API Feature
There are several feature provided by this API
> - Display every added film
> - Add a new film
> - Book a film 
> - Show all registered user
> - Show all film that has been book by the user
> - Create a new user account
> - Top up some money to a specified user account
> - Delete an user account

## API endpoints structure
Here is the API endpoints structure

```
/              # return all available film information
   film/
      add/     # add new film
      book/    # book a film

   user/       # return all user information
      create/  # create user
      delete/  # delete user
      topup/   # add some money to user account
      {name}/  # return a specific user information

```

## API File Structure
Here is the API server file structure
```
GDSC/
   node_modules/

   src/
      database.js # all about database file
      handler.js  # this file contains all function used by the API
      routes.js   # this file contains every routing of the API
      server.js   # this file is where the main server run

   package-lock.json
   package.json
   README.md
```

## Getting Started

### Prerequisite
There are some dependencies that need to be installed before using this API. Those are
1. @hapi/hapi
   - the main javascript framework to run the server
2. nanoid
   - a module to generate a unique ID for every user account and film that saved on this API

### How to install?
1. Go to the directory of the server
2. Type this following command on your machine to install those package
>```
> npm install @hapi/hapi
> npm install nanoid@3.x.x
>```

### How to run?
1. Go to the directory of the server
2. Type this following command on your machine to run the server
>```
> node ./src/server.js
>``` 

## Usage documentation
This API will save an array of films and users. Each element of the ``films`` array will be in the form of object with the following format
>```
> {
>     id: <uniqueIdOfEachFilm>, // String consist of film's unique id
>     title: <filmTitle>, // String consist of film's title
>     price: <filmPriceEachSeat> // Number consist of film's price each seat
>     seat: [<statusOfEachSeat>] // an array of String with length 10, defining which user account has book the seat
> }
>```

While each element of the ``users`` array will be in the form of object with the following format
>```
> {
>     id: <uniqueIdOfEachUser>, // String consist of user's unique id
>     name: <userName>, // String consist of user's name
>     money: <userMoney> // Number consist of user's amount of money
>     seat: [tickets] // an array of Object that defining the user's tickets 
> }
>```

Each element of the user's tickets will be in the form object with the following format
>```
> {
>     title: <bookedFilmTitle> // String consist of the title of the film that is booked by the user
>     filmIndex: <bookedFilmIndex> // String consist of the index of the film that is booked by the user
>     seatNumber: <bookedSeatNumber> // Number consist of the seat number of the seat that is booked by the user
> }
>```

### Display every added film
This feature will return a json object that contains all film that has been added to the server

This feature has the following arguments
>```
> {
>     method: GET,
>     endpoint: /
> }
>```

Then, the following command is an example on how to use it using ``curl`` command
>```
> curl -X GET https://tiketin-aja.cyclic.app -i 
>```

### Add a new film
This feature will add a new film to the server

This feature has the following arguments
>```
> {
>     method: POST,
>     endpoint: /film/add
>     body: {
>         data: {
>             title : <filmTitle>,
>             price: <filmPrice>
>         }
>     }
> }
>```

Then, the following command is an example on how to use it using ``curl`` command
>```
> curl -X POST -H "Content-Type: application/json" http://https://tiketin-aja.cyclic.app/film/add -d "{\"data\": {\"title\":\"Titanic\", \"price\": \"4000\", \"amountOfSeat\" : \"7\"}}"  -i
>```

This will add a new film titled `Titanic` which ticket's price is `4000` and has `7` seats available

### Book a film
This feature will assign a specified seat number to a user if the user's amount of money is suffice to buy a certain film's ticket and the seat is available to be bought

This feature has the following arguments
>```
> {
>     method: PUT,
>     endpoint: /film/book
>     body: {
>         data: {
>             name : <userName>
>             title : <filmTitle>,
>             seatNumber: <filmSeatNumber>
>         }
>     }
> }
>```

Then, the following command is an example on how to use it using ``curl`` command
>```
> curl -X PUT -H "Content-Type: application/json" http://https://tiketin-aja.cyclic.app/film/book -d "{\"data\": {\"name\":\"mie-intel\", \"title\": \"Titanic\", \"seatNumber\": \"1\"}}"  -i
>```

### Show all registered user
This feature will show all user acount that has been created before

This feature has the following arguments
>```
> {
>     method: GET,
>     endpoint: /user
> }
>```

Then, the following command is an example on how to use it using ``curl`` command
>```
> curl -X GET https://tiketin-aja.cyclic.app/user
>```
This will return a json object that contain all user account detail

### Show all film that has been book by the user
This feature will show all specified user's data

This feature has the following arguments
>```
> {
>     method: GET,
>     endpoint: /user/{name}
> }
>```

Then, the following command is an example on how to use it using ``curl`` command
>```
> curl -X GET https://tiketin-aja.cyclic.app/user/mie-intel
>```
This will return a json object that contain all ``mie-intel``'s account detail

>```
> curl -X GET https://tiketin-aja.cyclic.app/user/mie-dummy
>```
This will return a json object that contain all ``mie-dummy``'s account detail

and so on

### Create a new user account
This feature will create a new user account that has ``0`` amount of money

This feature has the following arguments
>```
> {
>     method: POST,
>     endpoint: /user/create
>     body: {
>         data: {
>             name : <username>
>         }
>     }
> }
>```
Then, the following command is an example on how to use it using ``curl`` command
>```
> curl -X POST https://tiketin-aja.cyclic.app/user/create -H "Content-Type: application/json" -d "{\"data\": {\"name\":\"mie-intel\"}}" -i 
>```

This will create a user with the name ``mie-intel`` that has ``0`` amount of money

### Top up some money to a specified user account
This feature will add some amount of money to a specified user account

This feature has the following arguments
>```
> {
>     method: PUT,
>     endpoint: /user/topup
>     body: {
>         data: {
>             name : <username>,
>             addMoney : <amountOfMoney>
>         }
>     }
> }
>```

Then, the following command is an example on how to use it using ``curl`` command

>```
> curl -X PUT -H "Content-Type: application/json" http://https://tiketin-aja.cyclic.app/user/topup -d "{\"data\": {\"name\":\"mie-intel\", \"addMoney\": \"5000\"}}" -i 
>```

This will add ``5000`` to the ``mie-intel``'s account

### Delete an user account
This feature will delete a specified user account, and also unbooked every seat that is booked by the user 

This feature has the following arguments
>```
> {
>     method: DELETE,
>     endpoint: /user/delete
>     body: {
>         data: {
>             name : <username>
>         }
>     }
> }
>```

Then, the following command is an example on how to use it using ``curl`` command

>```
> curl -X DELETE https://tiketin-aja.cyclic.app/user/delete -H "Content-Type: application/json" -d "{\"data\": {\"name\":\"mie-intel\"}}" -i 
>```

This will delete `mie-intel`'s account and unbooked every seat that is booked by `mie-intel`

## Closing
made with love by Polikarpus Arya Pradhanika
