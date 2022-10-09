import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-3">
      {!pets.length ? (
        <h1 className="mx-auto text-red-700 uppercase font-bold">
          No Pets Found
        </h1>
      ) : (
        pets.map((pet) => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
            images={pet.images}
            location={`${pet.city},${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
