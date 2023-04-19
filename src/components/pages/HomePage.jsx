import RickAndMortyCard from "../RickAndMortyCard.jsx"
import { useState, useEffect } from "react";

function HomePage() {
  const [data, setData] = useState([]); // Ce state sert à contenir les données en provenance de l'API.
  const [inputValue, setInputValue] = useState(""); // Ce state sera connecté à l'input, pour changer dynamiquement sa valeur.

  const [laGueuleDeLapi, setLaGueuleDeLapi] = useState([]);

  useEffect(() => {
    fetch("http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002?appid=1929610")
      .then((res) => res.json())
      .then((data) => {
        setLaGueuleDeLapi(data)
      })
      .then(() => console.log(laGueuleDeLapi))
      .catch((err) => console.error(err))
  })

  function handleChange(e) {
    setInputValue(e.target.value) // La fonction handleChange permet de mettre à jour inputValue à chaque caractère ajouté ou supprimé dans l'input.
  }

  // useEffect est utilisé pour effectuer des effets secondaires contrôlés dans les composants React, 
  // comme les requêtes à l'API. Cela permet de s'assurer que le comportement du composant est 
  // cohérent et prévisible, même lorsqu'il y a des changements dans les variables d'état ou les propriétés.
  useEffect(() => { // On utilise un useEffect car veut que la variable data soit re-rendue une fois qu'elle sera mise à jour.
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
            .filter((el) => el.name.includes(inputValue))
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