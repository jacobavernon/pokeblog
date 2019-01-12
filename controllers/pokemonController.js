const axios = require('axios');

exports.getAllPokemon = function (req, res, next) {
  axios
    .get('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => {
        const { results } = response.data
        res.render('allPokemon', {
          pokemon: results.slice(0, 151)
        })
      })
      .catch((err) => {
        next()
    })
  }

exports.getIndividualPokemon = function (req, res, next) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
      .then((response) => {
        const pokemon = {
          name: response.data.name,
          sprites: response.data.sprites,
          types: response.data.types,
          weight: response.data.weight,
          height: response.data.height,
          abilities: response.data.abilities,
          moves: response.data.moves,
          search: req.query.pokemon
        }
        res.render('individualPokemon', { pokemon })
      })
      .catch((err) => {
        next();
      })
  }

  exports.getSearchPokemon = function(req, res, next) {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${req.query.pokemon}`)
        .then((response) => {
          const pokemon = {
            name: response.data.name,
            sprites: response.data.sprites,
            types: response.data.types,
            weight: response.data.weight,
            height: response.data.height,
            abilities: response.data.abilities,
            moves: response.data.moves,
            search: req.query.pokemon
          }
          res.render('individualPokemon', {
            pokemon: pokemon,

          })
          console.log(req.query.pokemon)
        })
        .catch((err) => {
          next();
        })
    }

exports.getPokemonEvolution = function (req, res, next) {
  axios
    .get(`https://pokeapi.co/api/v2/evolution-chain/${req.query.id}`)
    .then((response) => {
      const evolution = {
        chain: response.data.chain,
        // evoloves_to: response.data.chain.evolves_to.species,
      }
      res.render('individualPokemon', { evolution })
      console.log(evolution)
      console.log(req.query.id)
    })
    .catch((err) => {
      next();
    })
}
