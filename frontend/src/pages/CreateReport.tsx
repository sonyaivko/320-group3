import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createReport } from "../api/createReport";


const CreateReport: React.FC = () => {
  const [formData, setFormData] = useState({
    type: "lost",
    category: "",
    description: "",
    date: "",
    location: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const payload = {
        lost_or_found: formData.type,
        latitude: 0,
        longitude: 0,
        resolved: false,
        description: formData.description,
        categories: {
          category: formData.category,
          location: formData.location,
          date: formData.date,
        },
      };
  
      const data = await createReport(payload);
      console.log("Report submitted:", data);
      alert("Your report has been submitted!");
      navigate("/viewreports");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to submit report");
    }
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