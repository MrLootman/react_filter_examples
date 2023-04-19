import RickAndMortyCard from "../RickAndMortyCard.jsx"
import { useState, useEffect } from "react";

function HomePage() {
  const [data, setData] = useState([]); // Ce state sert à contenir les données en provenance de l'API.
  const [inputValue, setInputValue] = useState(""); // Ce state sera connecté à l'input, pour changer dynamiquement sa valeur.

  function handleChange(e) {
    setInputValue(e.target.value) // La fonction handleChange permet de mettre à jour inputValue à chaque caractère ajouté ou supprimé dans l'input.
  }

  useEffect(() => { // On utilise un useEffect car veut que la variable nommée data soit re-rendue une fois qu'elle sera mise à jour.
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="home-page">
      <h1>Rick and Morty</h1>
      <input
        value={inputValue}
        onChange={(e) => handleChange(e)} 
      />
      <ul>
        {
          data
            .filter((el) => el.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((element) => {
            return (
              <RickAndMortyCard name={element.name} image={element.image} />
            )
          })
        }
      </ul>
    </div>
  )
}

export default HomePage;