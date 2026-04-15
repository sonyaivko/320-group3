import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { UMassBounds } from "../utils/mapBounds";
import "./reports.css";
import "leaflet/dist/leaflet.css";
import { lostIcon, foundIcon } from "../utils/leafletIcon";
import { resolveReport } from "../api/reports";

/* keep your existing leaflet setup */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------------- TYPES ---------------- */
type Report = {
  report_id: number;
  lost_or_found: string;
  description: string;
  latitude: number | string;
  longitude: number | string;
  resolved: boolean;
  created_at?: string;
  categories?: {
    itemType: string[];
    color: string[];
    material: string[];
  };
};

/* ---------------- OPTIONS ---------------- */
const ITEM_TYPES = ["Backpack", "Purse", "Wallet", "Phone", "Keys", "Laptop", "Card", "Other"];
const COLORS = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Black", "White", "Other"];
const MATERIALS = ["Leather", "Plastic", "Metal", "Fabric", "Rubber", "Glass", "Other"];

export default function ViewReports() {

  /* ✅ FIX 1: state must be inside component */
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    lost_or_found: "",
    itemType: [] as string[],
    color: [] as string[],
    material: [] as string[],
  });

  async function fetchReports() {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.lost_or_found) {
        params.append("lost_or_found", filters.lost_or_found);
      }

      const categories = {
        itemType: filters.itemType,
        color: filters.color,
        material: filters.material,
      };

      params.append("categories", JSON.stringify(categories));

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/reports?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      let list: Report[] = [];
      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data.reports)) list = data.reports;
      else if (Array.isArray(data.data)) list = data.data;

      setReports(list.filter((r) => !r.resolved));
    } catch (err) {
      console.error(err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  const handleResolve = async (id: number) => {
  try {
    await resolveReport(id);

    setSelectedReport(null);

    // ✅ SUCCESS MESSAGE (ADD THIS)
    setSuccessMessage("🎉 You have collected your item!");

    await fetchReports();

    // auto-hide after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

  } catch (err: any) {
    alert(err.message);
  }
};

  useEffect(() => {
    fetchReports();
  }, []);

  function toggle(key: "itemType" | "color" | "material", value: string) {
    setFilters((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  }

  return (
    <div className="view-layout">

      {/* FILTER PANEL (UNCHANGED) */}
      <div className="filter-panel">
        <div className="filter-header">
          <span className="filter-title">Filters</span>
          <button
            className="clear-btn"
            onClick={() =>
              setFilters({ lost_or_found: "", itemType: [], color: [], material: [] })
            }
          >
            Clear all
          </button>
        </div>

        <div className="filter-section">
          <p className="section-label">Report type</p>
          <div className="type-tabs">
            {["", "Lost", "Found"].map((v) => (
              <button
                key={v || "all"}
                className={`type-tab${filters.lost_or_found === v ? " active" : ""}`}
                onClick={() => setFilters((f) => ({ ...f, lost_or_found: v }))}
              >
                {v === "" ? "All" : v}
              </button>
            ))}
          </div>
        </div>

        {/* CHIPS (UNCHANGED) */}
        {[ITEM_TYPES, COLORS, MATERIALS].map((group, i) => {
          const key = i === 0 ? "itemType" : i === 1 ? "color" : "material";
          const label = i === 0 ? "Item type" : i === 1 ? "Color" : "Material";

          return (
            <div key={key} className="filter-section">
              <p className="section-label">{label}</p>
              <div className="chip-grid">
                {group.map((o) => (
                  <button
                    key={o}
                    className={`chip${filters[key as keyof typeof filters].includes(o) ? " active" : ""}`}
                    onClick={() => toggle(key as any, o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <button className="apply-btn" onClick={fetchReports}>
          Apply filters
        </button>
      </div>

      {/* MAP */}
      <div className="map-area">
        {loading ? (
          <div className="loading">
            <div className="spinner" />
            Loading reports…
          </div>
        ) : (
          <MapContainer
            center={UMassBounds.center}
            zoom={15}
            maxBounds={UMassBounds.bounds}
            className="map"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {reports.map((r) => {
              const lat = Number(r.latitude);
              const lng = Number(r.longitude);
              if (isNaN(lat) || isNaN(lng)) return null;

              return (
                <Marker
                  key={r.report_id}
                  position={[lat, lng]}
                  icon={r.lost_or_found === "lost" ? lostIcon : foundIcon}
                >
                  <Popup>
                    <div className="popup-card">

                      <div className="popup-header">
                        <span className={`popup-badge full ${r.lost_or_found}`}>
                          {r.lost_or_found?.toUpperCase()}
                        </span>
                        <div className="popup-title">
                          {r.description}
                        </div>
                      </div>

                      <div className="popup-meta">
                        📅 {r.created_at
                          ? new Date(r.created_at).toLocaleString()
                          : "Unknown date"}
                      </div>

                      {/* TAGS */}
                        <div className="popup-tags popup-tags-centered">
                          {r.categories?.itemType?.map((t: string) => (
                            <span key={t} className="tag item">{t}</span>
                          ))}
                          {r.categories?.color?.map((t: string) => (
                            <span key={t} className="tag color">{t}</span>
                          ))}
                          {r.categories?.material?.map((t: string) => (
                            <span key={t} className="tag material">{t}</span>
                          ))}
                        </div>

                        {/* ACTION */}
                        <div className="popup-actions-centered">
                          {!r.resolved ? (
                            <button
                              className="resolve-btn"
                              onClick={() => setSelectedReport(r)}
                            >
                              🔍 Claim
                            </button>
                          ) : (
                            <span className="resolved-label">✓ Resolved</span>
                          )}
                        </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}

        {/* ================= MODAL (NEW BUT REQUIRED) ================= */}
        {selectedReport && (
          <div className="modal-backdrop">
            <div className="modal-card">

              {/* ICON / HEADER */}
              <div className="modal-header">
                <div className="modal-icon">📍</div>
                <h2>Claim this item?</h2>
              </div>

              {/* DESCRIPTION */}
              <p className="modal-description">
                <strong>{selectedReport.description}</strong>
              </p>

              {/* WARNING */}
              <div className="modal-warning">
                ⚠️ Only confirm if this item belongs to you.  
                <br />
                False claims may be reviewed.
              </div>

              {/* ACTIONS */}
              <div className="modal-actions">
                <button
                  className="modal-btn cancel"
                  onClick={() => setSelectedReport(null)}
                >
                  Cancel
                </button>

                <button
                  className="modal-btn confirm"
                  onClick={() => handleResolve(selectedReport.report_id)}
                >
                  Yes, collect item
                </button>
              </div>

            </div>
          </div>
        )}
        {successMessage && (
          <div className="success-toast">
            {successMessage}
          </div>
        )}
        {/* LEGEND (UNCHANGED) */}
        {!loading && (
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-dot lost" />
              Lost
            </div>
            <div className="legend-item">
              <div className="legend-dot found" />
              Found
            </div>
          </div>
        )}
      </div>
    </div>
      
  );
}