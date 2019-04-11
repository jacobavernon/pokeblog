var express = require('express');
var router = express.Router();
var pokemonController = require("../controllers/pokemonController");


//All Pokemon Page
router.get('/', pokemonController.getAllPokemon) 

//  Get indivual pokemon from API 
router.get('/:id', pokemonController.getIndividualPokemon)

// This is the search feature  
router.get('/search/', pokemonController.getSearchPokemon)
module.exports = router;