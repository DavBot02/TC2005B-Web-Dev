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
		const { name, color, height, id } = req.body;
		connection.query(`INSERT INTO plant_data 
			(name, color, height_meters, id) values 
			('${name}', 
			'${color}', 
			'${height}', 
			'${id}')`,
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
		const { id } = req.params

		fs.readFile(__dirname + "/" + "plants.json", "utf8", (err, data) => {
			let current_data = JSON.parse(data)
			current_data["plant" + id] = updatePlant["plant3"]
			// console.log(current_data)
			res.send(current_data)

			fs.writeFile(__dirname + "/" + "plants.json", JSON.stringify(current_data, null, 2), "utf8", (err) => {
				if (err) throw err;
			})
		})
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