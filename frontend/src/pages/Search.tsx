import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchItem: React.FC = () => {
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    location: ""
  });

  const [results, setResults] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with filters:", filters);
    // TODO: fetch results from backend API based on filters
    setResults([
      { id: 1, type: "lost", category: "Wallet", location: "Library", description: "Black leather wallet" },
      { id: 2, type: "found", category: "Keys", location: "Campus Center", description: "Set of car keys" }
    ]);
  };

  return (
    <div className="search-page">
      <header className="home-header">
        <h1>Search Lost & Found Items</h1>
        <p>Filter items by type, category, or location.</p>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <label>
          Type:
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">Any</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleChange}
            placeholder="e.g., Electronics, Keys, Wallet"
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g., Library, Campus Center"
          />
        </label>

        <button type="submit" className="btn-accent">Search</button>
      </form>

      <div className="search-results">
        <h2>Results</h2>
        {results.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul>
            {results.map((item) => (
              <li key={item.id}>
                <strong>{item.type.toUpperCase()}</strong> - {item.category} at {item.location}: {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="home-footer">
        <p>© 2026 Lost & Found App</p>
        <Link to="/">Back to Home</Link>
      </footer>
    </div>
  );
};

export default SearchItem;