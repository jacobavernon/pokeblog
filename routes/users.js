var express = require('express');
var router = express.Router();


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

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  console.log(indigoLeague[req.params.id].img)
  res.render('users', 
    {
      id: req.params.id,
      pokemon: indigoLeague[req.params.id].pokemon,
      type: indigoLeague[req.params.id].type,
      img: indigoLeague[req.params.id].img
    }
  )
});

router.get('/:id', (req, res) => {
  res.sendfile(indigoLeague[req.params.id].img)
});

module.exports = router;
