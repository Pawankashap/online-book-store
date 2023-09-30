import { Link } from "react-router-dom";

function BirdCard({ bird }) {
  const { id, name, image } = bird;

  return (
    <li className="card">
      <Link to={`/${id}`}>
      <img src={image} alt={name} />
      </Link>
      <h4>{name}</h4>
    </li>
  );
}

export default BirdCard;
