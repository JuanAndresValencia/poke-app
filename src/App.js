import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
import { Stats } from './components/pokeStats'

function App() {

  const [pokeImage, setPokeImage] = useState('')
  const [pokeStats, setPokeStats] = useState([])
  const [pokeName, setPokeName] = useState('')
  const [mode, setMode] = useState('')
  const [loading, setLoading] = useState(false)

  const baseUrl = 'https://pokeapi.co/api/v2'

  const searchPokemon = () => {
    if (pokeName) {
      getPokemon(pokeName)
      setPokeName('')
    }
  }

  const orderStats = () => {
    const prevData = pokeStats.sort((a, b) => {
      if (mode === '' || mode === 'descendent') {
        setMode('ascendent')
        return a.base_stat - b.base_stat
      } else {
        setMode('descendent')
        return b.base_stat - a.base_stat
      }
    })
    setPokeStats([...prevData])
  }

  const getPokemon = (poke) => {
    setLoading(true)
    const pokemon = poke ? poke : 'bulbasaur'
    axios
      .get(`${baseUrl}/pokemon/${pokemon}`)
      .then((result) => {
        const data = result.data
        setPokeImage(data.sprites.front_default)
        setPokeStats(data.stats)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getPokemon()
  }, [])


  return (
    <div className='box'>
      <h1 className='title'>Poke App</h1>
      <div className='search-box'>
        <input
          placeholder='Buscar Ejm charizard, pikachu'
          value={pokeName}
          onChange={({ target }) => setPokeName(target.value)}
        />
        <button onClick={searchPokemon}>Buscar</button>
      </div>
      {loading ? (
        <h2>Buscando Pokemon...</h2>
      ) : (
        <div className='poke-box'>
          <img
            src={pokeImage}
          />
          <Stats
            stats={pokeStats}
            orderStats={orderStats}
          />
        </div>
      )}
    </div >
  );
}

export default App;
