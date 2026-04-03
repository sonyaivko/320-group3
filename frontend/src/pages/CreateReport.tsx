import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateReport: React.FC = () => {
  const [formData, setFormData] = useState({
    type: "lost",
    category: "",
    description: "",
    date: "",
    location: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report submitted:", formData);
    alert("Your report has been submitted!");
    // TODO: connect to backend API to save report
  };

  return (
    <div className="report-page">
      <header className="home-header">
        <h1>Report Lost or Found Item</h1>
        <p>Provide details of the item you lost or found.</p>
      </header>

      <form className="report-form" onSubmit={handleSubmit}>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Electronics, Keys, Wallet"
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the item..."
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Approximate Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Library, Campus Center"
            required
          />
        </label>

        <button type="submit" className="btn-accent">Submit Report</button>
      </form>

      <footer className="home-footer">
        <p>© 2026 Lost & Found App</p>
        <Link to="/">Back to Home</Link>
      </footer>
    </div>
  );
};

export default CreateReport;