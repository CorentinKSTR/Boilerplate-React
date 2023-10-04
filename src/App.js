import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1010`);
      const data = await response.json();
      const pokemonList = data.results;

      const results = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        })
      );

      setPokemonData(results);
    }

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="App">
      <header className="App-header">
        <section>
          <h1>PokéAPI</h1>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search Pokémon"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </section>
        <div className="cards">
          {pokemonData
            .filter((pokemon) => pokemon.name.includes(searchTerm))
            .map((pokemon) => (
              <div key={pokemon.id} className="card">
                <h2 id="pokeName">{pokemon.name}</h2>
                <img
                  id="pokeSprite"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
                <p id="pokeId">{pokemon.id}</p>
              </div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;