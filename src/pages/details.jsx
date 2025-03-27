import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const item = useSelector((state) =>
    state.data.items.find((item) => item.id === Number(id))
  );

  if (!item) return <p className="text-center">Item not found</p>;

  return (
    <div className="details-container">
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
};

export default Details;
