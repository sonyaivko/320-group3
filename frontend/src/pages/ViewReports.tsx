import { useEffect, useState } from "react";
import { getReports, BackendReport } from "../api/reports";

export default function App() {
  const [reports, setReports] = useState<BackendReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError("Failed to load reports");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>View Reports</h1>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.report_id}>
              {report.lost_or_found} - {report.description || "No description"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}