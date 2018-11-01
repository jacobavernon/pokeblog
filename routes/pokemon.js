var express = require('express');
var router = express.Router();
const axios = require('axios');

//All Pokemon Page
router.get('/', (req, res, next) => {
  axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
      const { results } = response.data
      res.render('allPokemon', { pokemon: results.slice(0, 151) })      
  })
  .catch((err) => {
    console.log(err)
    next()
  })
})

//  Get indivual pokemon from API 
 router.get('/:id', (req, res, next) => {
   axios
     .get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
     .then((response) => {
       const pokemon = {
        name: response.data.name,
        sprites: response.data.sprites,
        types: response.data.types,
        weight: response.data.weight,
        height: response.data.height,
       }

       res.render('individualPokemon', { pokemon })
    })
    .catch((err) => {
      console.log(err)
      next();
    })
  })

// This is the search feature  
router.get('/search/', (req, res, next) => {

  axios
      .get(`https://pokeapi.co/api/v2/pokemon/${req.query.pokemon}`)
      .then((response) => {
        const pokemon = {
          name: response.data.name,
          sprites: response.data.sprites,
          types: response.data.types,
          weight: response.data.weight,
          height: response.data.height,
       }

       res.render('individualPokemon', { pokemon })
    })
    .catch((err) => {
      console.log(err)
      next();
    })
})
module.exports = router;