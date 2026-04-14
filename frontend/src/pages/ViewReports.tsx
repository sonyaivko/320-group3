import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import stu from '../imgs/stu.webp';
import logo from '../imgs/logo.png';
import '../App.css';


//shape of report from backend 
interface Report {
  report_id: number;
  description: string | null;
  lost_or_found: string;
  resolved: boolean;
}

const MOCK_REPORTS: Report[] = [
  { report_id: 1, description: 'Lost blue water bottle near the Rec.', lost_or_found: 'lost', resolved: false },
  { report_id: 2, description: 'Missing UCard — name: Jane Doe', lost_or_found: 'lost', resolved: false },
  { report_id: 3, description: 'Lost AirPods in Hamp.', lost_or_found: 'lost', resolved: true },
  { report_id: 4, description: 'Lost grey hoodie in the student union', lost_or_found: 'lost', resolved: false },
];

// fake data just for screen 
const CATEGORIES = ['all', 'water bottle', 'ucard', 'airpods', 'wallet', 'misc'];
const COLORS = ['all', 'black', 'white', 'gray', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

export default function ViewReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  //tracks selected category
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  //tracks selected color
  const [colorFilter, setColorFilter] = useState<string>('all');

  //re fetch from backend whenever either filter changes 
  useEffect(() => {
    const params = new URLSearchParams({ lost_or_found: 'lost' });

    // only add to query if a filter is selected 
    if (categoryFilter !== 'all') params.set('categories', categoryFilter);

    // overwrites category? need to change> 
    if (colorFilter !== 'all') params.set('categories', colorFilter);
    
    fetch(`http://localhost:4000/reports?${params.toString()}`)
      .then((res) => res.json())
      .then(setReports)
      .catch(() => setReports(MOCK_REPORTS)); //fall back to mock data 
  }, [categoryFilter, colorFilter]);

  return (


    <div className="reports-page" style={{ backgroundImage: `url(${stu})` }}>

    {/*header  */}
    <header className="home-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-text">
            <h1>UFound</h1>
          </div>
          <div className="top-right-buttons">
            <button className="btn" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </header>

      
      <h1 style={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
        Lost Reports
      </h1>

    {/* filter dropdowns side by side */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem' }}>
        
        {/* category filter*/}
        <select
          className="glass-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} style={{ color: 'black' }}>
              {cat === 'all' ? 'All categories' : cat}
            </option>
          ))}
        </select>

        {/* color filter*/}
        <select
          className="glass-select"
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value)}
        >
          {COLORS.map((color) => (
            <option key={color} value={color} style={{ color: 'black' }}>
              {color === 'all' ? 'All colors' : color}
            </option>
          ))}
        </select>
      </div>

      {/* show message if no reports match*/ }
      {reports.length === 0 ? (
        <p style={{ color: 'white' }}>No reports found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {reports.map((r) => (

            //each report is a glass card
            <div key={r.report_id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#ff6b6b' }}>LOST</span>
                <span style={{ fontSize: '13px', color: r.resolved ? '#6bffb8' : 'rgba(255,255,255,0.6)' }}>
                  {r.resolved ? 'Resolved' : 'Open'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                {r.description ?? 'No description provided.'}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                Report #{r.report_id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}