import RickAndMortyCard from "../RickAndMortyCard.jsx";
import options from "../../utils/rickAndMortyData.js";
import { useState, useEffect, useMemo } from "react";

function HomePage() {
  const [data, setData] = useState([]); // Ce state sert à contenir les données en provenance de l'API.
  const [filters, setFilters] = useState({ // Ce state sert à formater sous forme d'objet les filtres qui seront renseignés par la fonction handleSelectedValue.
    gender: "",
    species: "",
    status: "",
  });

  useEffect(() => {
    // On utilise un useEffect car on veut que la variable d'état data soit re-rendue une fois qu'elle sera mise à jour.
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((err) => console.error(err));
  }, []); // Le tableau vide permet l'exécution une fois et une seule du fetch.

  // En utilisant useMemo, on s'assure que le calcul de la fonction de filtre n'est effectué que 
  // lorsqu'il y a un changement dans les dépendances spécifiées, c'est-à-dire data et filters.
  const filteredData = useMemo(() => {
    return data.filter((el) => {
      if (filters.gender && el.gender !== filters.gender) {
        return false;
      }
      if (filters.species && el.species !== filters.species) {
        return false;
      }
      if (filters.status && el.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [data, filters]);


  // La fonction handleSelectedValue est déclenchée lorsque la valeur du sélecteur 
  // est cliquée.
  // Le setFilter va mettre à jour le state filters d'une manière intéressante :
  // le paramètre lastFilters représente le dernier état connu du state filters,
  // qui contient un objet avec trois paires clé - valeur (cf. en haut).
  // Quand à lui, le spread operator, on invoque l'intégralité du contenu de lastFilters,
  // c'est-à-dire toutes les paires clés - valeurs de l'objet filters.
  // Enfin, [e.target.name]: e.target.value vient écraser l'ancienne paire clé - valeur,
  // au profit de la nouvelle.
  // Par exemple, si on clique sur le premier input, et qu'on sélectionne "Male",
  // Cela signifie que le e.target.name sera égale à "gender", et que le e.target.value
  // sera égale à "Male".

  function handleSelectedValue(e) {
    setFilters((lastFilters) => ({ ...lastFilters, [e.target.name]: e.target.value }));
  }

  return (
    <div className="home-page">
      <h1>Rick and Morty</h1>

      <section className="filters">
        {options.map((el) => {
          return (
            <div key={el.title}>
              <label>{el.title}</label>
              <select name={el.title} onChange={(e) => handleSelectedValue(e)}>
                <option value="">---</option>
                <option value={el.firstOption}>{el.firstOption}</option>
                <option value={el.secondOption}>{el.secondOption}</option>
                <option value={el.thirdOption}>{el.thirdOption}</option>
              </select>
            </div>
          );
        })}
      </section>

      <ul>
        {filteredData.map((element) => (
          <RickAndMortyCard key={element.id} name={element.name} image={element.image} />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;




