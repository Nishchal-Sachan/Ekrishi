import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["organic", "natural"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "natural", // Default type
    region: "",
    minPrice: 0,
    maxPrice: 10000000,
  });

  // Handle changing the search type (organic/natural)
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  // Handle input changes for region, minPrice, maxPrice
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Parse minPrice and maxPrice as numbers to avoid invalid input
    if (name === "minPrice" || name === "maxPrice") {
      setQuery((prev) => ({
        ...prev,
        [name]: value ? parseInt(value) : 0, // Default to 0 if empty
      }));
    } else {
      setQuery((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Prevent form submission when hitting enter
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="region"
          placeholder="Enter your region"
          value={query.region}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          value={query.minPrice || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          value={query.maxPrice || ""}
          onChange={handleChange}
        />

        {/* Redirect to the list page with query parameters */}
        <Link to={`/list?type=${query.type}&region=${query.region}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button type="button">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
