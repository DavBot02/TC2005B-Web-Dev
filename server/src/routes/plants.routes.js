const { Router } = require("express");
const { getConnectionMessage, getAllPlants, uploadPlant, updatePlant, deletePlant } = require("../controllers/plants.controllers")

const router = Router();

router.get('/api', getConnectionMessage)

router.get('/plants', getAllPlants)

router.post('/plants', uploadPlant)

router.put('/plants/:id', updatePlant)

router.delete('/plants/:id', deletePlant)

module.exports = router;