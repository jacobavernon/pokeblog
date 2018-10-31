var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
      console.log(response.data)
      const { results } = response.data
      res.render('allPokemon', { pokemon: results.slice(0, 151) })      
  })
  .catch((err) => {
    console.log(err)
    next()
  })
})

//  GET users listing. 
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

router.get('/search/', (req, res, next) => {
  console.log('QUERY: ', req.query.pokemon)

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