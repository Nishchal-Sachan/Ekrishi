import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./filter.scss";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    region: searchParams.get("region") || "",
    grade: searchParams.get("grade") || "",
    price: {
      gte: parseInt(searchParams.get("minPrice")) || 0,
      lte: parseInt(searchParams.get("maxPrice")) || 10000000
    }
  });

  // Update searchParams whenever the query state changes
  useEffect(() => {
    const params = {
      type: query.type,
      region: query.region,
      grade: query.grade,
      minPrice: query.price.gte,
      maxPrice: query.price.lte
    };
    // Set the searchParams to match the current state values
    setSearchParams(params);
  }, [query, setSearchParams]); // Run effect when query changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice" || name === "maxPrice") {
      // Ensure we set these values as numbers
      setQuery({
        ...query,
        price: {
          ...query.price,
          [name === "minPrice" ? "gte" : "lte"]: parseInt(value) || 0
        }
      });
    } else {
      setQuery({
        ...query,
        [name]: value
      });
    }
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("region")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="region">Location</label>
          <input
            type="text"
            id="region"
            name="region"
            placeholder="Seller Region"
            onChange={handleChange}
            value={query.region}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleChange} value={query.type}>
            <option value="">any</option>
            <option value="organic">Organic</option>
            <option value="natural">Natural Farming</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="grade">Grade</label>
          <select name="grade" id="grade" onChange={handleChange} value={query.grade}>
            <option value="">any</option>
            <option value="premium">Premium</option>
            <option value="fresh-harvest">Fresh Harvest</option>
            <option value="greenhouse-grown">Greenhouse-grown</option>
            <option value="imported">Imported</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.price.gte || ""}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.price.lte || ""}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
