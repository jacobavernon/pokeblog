var express = require('express');
var router = express.Router();
const axios = require('axios');


const stuff = {
  marcos: {
    name: 'marcos',
    occupation: 'noob-slayer',
  },
    jacob: {
        name: 'jacob',
        occupation: 'dragon-slayer',
      }
    }

const indigoLeague = {
  1: {
    pokemon: 'Bulbasaur',
    type: 'grass/poison',
    img: 'https://img.pokemondb.net/artwork/large/bulbasaur.jpg'
  },
  2: {
    pokemon: 'ivysaur',
    type: 'grass/poison',
    img: 'https://img.pokemondb.net/artwork/large/ivysaur.jpg'
  },
  3: {
    pokemon: 'venusaur',
    type: 'grass/poison',
    img: 'http://localhost:3000/images/3.jpg'
  },
  4: {
    pokemon: 'charmander',
    type: 'fire',
    img: 'https://img.pokemondb.net/artwork/large/charmander.jpg'
  },
  5: {
    pokemon: 'charmeleon',
    type: 'fire',
    img: 'https://img.pokemondb.net/artwork/large/charmeleon.jpg'
  },
  6: {
    pokemon: 'charizard',
    type: 'fire/flying',
    img: 'https://img.pokemondb.net/artwork/charizard.jpg'
  },
  7: {
    pokemon: 'squirtle',
    type: 'water',
    img: 'https://img.pokemondb.net/artwork/large/squirtle.jpg'
  },
  8: {
    pokemon: 'wartortle',
    type: 'water',
    img: 'https://img.pokemondb.net/artwork/large/wartortle.jpg'
  },
  9: {
    pokemon: 'blastoise',
    type: 'water',
    img: 'https://img.pokemondb.net/artwork/large/blastoise.jpg'
  }
}


router.get('/', (req, res, next) => {
  axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
      const { results } = response.data
      res.render('users', { pokemon: results.slice(0, 151) })      
  })
  
  .catch((err) => {
    console.log(err)
    })
  })

//  GET users listing. 
 router.get('/:id', (req, res, next) => {
   axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
   
     .then((response) => {
       const pokemon = {
        name: response.data.name,
        sprites: response.data.sprites,
        types: response.data.types,
        weight: response.data.weight,
        height: response.data.height,
       }
       res.render('pokemon', { pokemon })
        if(req.query.search) {
          const regex = new RegExp(escapeRegex(req.query.search), 'gi');
          pokemon.name.find({name: regex}, function (err, pokemon) {
        if(err) {
         console.log('This is the error' + err)
        } else {
          res.render('pokemon', {pokemon: pokemon})
        }
          })
      }
    })
     .catch((err) => {
       console.log(err)
     })
  })
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};  

module.exports = router;