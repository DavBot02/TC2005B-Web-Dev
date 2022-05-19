const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

const newPlant = {
	"plant3": {
		"name": "rose",
		"color": "red",
		"height_meters": 7,
		"id": 3
	}
}

const updatePlant = {
	"plant3": {
		"name": "rose",
		"color": "red",
		"height_meters": 14,
		"id": 3
	}
}

app.get("/api", (req, res) => {
	res.json({ message: "Hello from the server side" });
})

app.get("/plants", (req, res) => {
	fs.readFile(__dirname + "/" + "plants.json", "utf8", (err, data) => {
		console.log(data);
		res.end(data);
	});
});

app.post("/plants/new", (req, res) => {

	fs.readFile(__dirname + "/" + "plants.json", "utf8", (err, data) => {
		let current_data = JSON.parse(data)
		current_data["plant3"] = newPlant["plant3"]
		// console.log(current_data)
		res.send(current_data)

		fs.writeFile(__dirname + "/" + "plants.json", JSON.stringify(current_data, null, 2), "utf8", (err) => {
			if (err) throw err;
		})
	})
});

app.put("/plants/:id", (req, res) => {
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

})

app.delete("/plants/:id", (req, res) => {
	const { id } = req.params

	fs.readFile(__dirname + "/" + "plants.json", "utf8", (err, data) => {
		let current_data = JSON.parse(data)
		delete current_data["plant" + id]
		// console.log(current_data)
		res.send(current_data)

		fs.writeFile(__dirname + "/" + "plants.json", JSON.stringify(current_data, null, 2), "utf8", (err) => {
			if (err) throw err;
		})
	})

})



app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
});
