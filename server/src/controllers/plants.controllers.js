const connection = require("../db");


connection.connect();

const getConnectionMessage = async (req, res, next) => {
	try {
		res.json({ message: "Hello from the server side" });
	} catch (error) {
		next(error);
	}
}

const getAllPlants = async (req, res, next) => {
	try {
		connection.query("SELECT * FROM plant_data", (error, results, fields) => {
			res.json(results);
		});

	} catch (error) {
		next(error);
	}
};

const uploadPlant = async (req, res, next) => {
	try {
		const { name, color, height_meters, id } = req.body;
		connection.query(`INSERT INTO plant_data 
			(name, color, height_meters) values 
			('${name}', 
			'${color}', 
			${height_meters})`,
			(error, results, fields) => {
				if (error) throw error;
				console.log(results)
				res.end('The plant has been added.');
			});
	} catch (error) {
		next(error)
	}
};

const updatePlant = async (req, res, next) => {
	try {
		const { name, color, height_meters } = req.body;
		const { id } = req.params;
		connection.query(`UPDATE plant_data
			SET name = '${name}',
				color = '${color}',
				height_meters = ${height_meters}
			WHERE id = ${id};`,
			(error, results, fields) => {
				if (error) throw error;
				console.log(results)
				res.end('The plant has been added.');
			});
	} catch (error) {
		next(error);
	}
}

const deletePlant = async (req, res, next) => {
	try {
		const { id } = req.params
		connection.query(`DELETE FROM plant_data WHERE id='${id}'`,
			(error, results, fields) => {
				if (error) throw error;
				console.log(results)
				res.end('The plant has been deleted.');
			});
	} catch (error) {
		next(error);
	}
}

module.exports = { getConnectionMessage, getAllPlants, uploadPlant, updatePlant, deletePlant }