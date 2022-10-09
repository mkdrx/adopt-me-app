import { useState, useEffect, useContext } from "react";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const requestPets = async () => {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await response.json();

    setPets(json.pets);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    requestPets();
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center bg-cyan-800 p-10  mx-20 mb-5 rounded-lg shadow-lg shadow-black"
      >
        <label
          htmlFor="location"
          className="text-white font-bold uppercase text-center"
        >
          Location
          <input
            id="location"
            type="text"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            className="w-60 mb-5 text-cyan-700 block rounded-lg"
          />
        </label>
        <label
          htmlFor="animal"
          className="text-white font-bold uppercase text-center"
        >
          Animal
          <select
            className="w-60 mb-5 block text-cyan-700 rounded-lg"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="breed"
          className="text-white font-bold uppercase text-center"
        >
          Breed
          <select
            disabled={!breeds.length}
            className="w-60 mb-5 text-cyan-700 block disabled:opacity-50 rounded-lg"
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="theme"
          className="text-white font-bold uppercase text-center"
        >
          Theme
          <select
            className="w-60 mb-5 block text-cyan-700 rounded-lg"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Darkblue</option>
            <option value="cyan">Cyan</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button
          className="rounded px-6 py-2 text-white hover:opacity-50 border-none font-bold uppercase"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
