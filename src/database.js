/*
	films is an array of object in the following format
	{
		id: string
		title: string
		price: integer
		seat: [] => array of users id (max 10 chair)
	}

	users is an array of object in the following format
	{
		id: string
		name: string
		money: integer
		tickets: [] => array of object {title, filmIndex, seatNumber}
	}
*/

const films = [];
const users = [];

module.exports = { films, users };