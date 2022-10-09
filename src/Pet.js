import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pet-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link
      to={`/details/${id}`}
      className="relative flex flex-items justify-center"
    >
      <div>
        <img src={hero} alt={name} className="rounded-2xl h-full" />
      </div>
      <div className="mb-2 text-white capitalize text-center font-bold absolute bottom-0 center-0 bg-gradient-to-b from-cyan-900  to-cyan-600 rounded-xl shadow-xl shadow-gray-800 p-5 hover:scale-105 transition duration-300">
        <h1 className="uppercase underline">{name}</h1>
        <h2 className="">
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
