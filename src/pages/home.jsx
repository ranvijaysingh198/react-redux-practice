import  { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { items, loading, error } = useSelector((state) => state.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLength, setFilterLength] = useState("all");

  const filteredItems = items.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLength === "all" ||
        (filterLength === "short" && item.body.length < 100) ||
        (filterLength === "long" && item.body.length >= 100))
    );
  });

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red">Error: {error}</p>;

  return (
    <div className="home-container">
      <h1>Posts</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterLength} onChange={(e) => setFilterLength(e.target.value)}>
          <option value="all">All</option>
          <option value="short">Short Content</option>
          <option value="long">Long Content</option>
        </select>
      </div>

      <div className="grid-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="card">
              <h2>{item.title}</h2>
              <p>{item.body.slice(0, 100)}...</p>
              <Link to={`/details/${item.id}`} className="read-more">
                Read More →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No matching results found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
