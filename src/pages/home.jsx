import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { items, loading, error } = useSelector((state) => state.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLength, setFilterLength] = useState("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLength === "all" || 
       (filterLength === "short" && item.body.length < 100) || 
       (filterLength === "long" && item.body.length >= 100))
    );
  }, [items, searchTerm, filterLength]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  
  const paginatedItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterLength]);

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
      {paginatedItems.length > 0 ? (
        paginatedItems.map((item) => (
            <div key={item.id} className="card">
              <h2>{item.title.length<30?item.title:item.title.slice(0,30) + '...'}</h2>
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
      <PaginationControls currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

    </div>
  );
};

const PaginationControls = React.memo(({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}>
        Previous
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
});

export default Home;
