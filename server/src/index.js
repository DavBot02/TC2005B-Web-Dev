const express = require("express");
const cors = require("cors")
const plantRoutes = require('./routes/plants.routes')

const PORT = process.env.PORT || 3001;
const app = express();


app.use(cors())
app.use(express.json());
app.use(plantRoutes);

app.use((err, req, res, next) => {
	return res.json({
		message: err.message
	});
});


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
});
