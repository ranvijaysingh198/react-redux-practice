import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { items, loading, error } = useSelector((state) => state.data);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red">Error: {error}</p>;

  return (
    <div className="home-container">
      <h1>Posts</h1>
      <div className="grid-container">
        {items.map((item) => (
          <div key={item.id} className="card">
            <h2>{item.title}</h2>
            <p>{item.body.slice(0, 100)}...</p>
            <Link to={`/details/${item.id}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
