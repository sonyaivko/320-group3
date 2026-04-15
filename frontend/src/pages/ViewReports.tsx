import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { UMassBounds } from "../utils/mapBounds";
import "./reports.css";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Report = {
  report_id: number;
  lost_or_found: string;
  description: string;
  latitude: number | string;
  longitude: number | string;
  resolved: boolean;
  categories?: any;
};

const ITEM_TYPES = ["Backpack", "Purse", "Wallet", "Phone", "Keys", "Laptop", "Card", "Other"];
const COLORS     = ["Red", "Orange", "Yellow", "Green", "Blue", "Black", "White", "Other"];
const MATERIALS  = ["Leather", "Plastic", "Metal", "Fabric", "Rubber", "Other"];

export default function ViewReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    lost_or_found: "",
    itemType:  [] as string[],
    color:     [] as string[],
    material:  [] as string[],
  });

  // keep a ref so fetchReports always reads current filters

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

  async function fetchReports() {
    setLoading(true);
    try {
      const f = filters;
      const params = new URLSearchParams();

      if (f.lost_or_found) params.append("lost_or_found", f.lost_or_found);

      const categories = {
      itemType: f.itemType,
      color: f.color,
      material:
      f.material,
      };

      params.append("categories", JSON.stringify(categories));

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/reports?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      let list: Report[] = [];
      if (Array.isArray(data))              list = data;
      else if (Array.isArray(data.reports)) list = data.reports;
      else if (Array.isArray(data.data))    list = data.data;

      setReports(list.filter((r) => !r.resolved));
    } catch (err) {
      console.error(err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchReports(); }, []);

  function ChipGroup({
    label,
    options,
    field,
  }: {
    label: string;
    options: string[];
    field: "itemType" | "color" | "material";
  }) {
    return (
      <div className="filter-section">
        <p className="section-label">{label}</p>
        <div className="chip-grid">
          {options.map((o) => (
            <button
              key={o}
              className={`chip${filters[field].includes(o) ? " active" : ""}`}
              onClick={() => toggle(field, o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="view-layout">
      {/* FILTER PANEL */}
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
            {["", "lost", "found"].map((v) => (
              <button
                key={v || "all"}
                className={`type-tab${filters.lost_or_found === v ? " active" : ""}`}
                onClick={() => setFilters((f) => ({ ...f, lost_or_found: v }))}
              >
                {v === "" ? "All" : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <ChipGroup label="Item type" options={ITEM_TYPES} field="itemType" />
        <ChipGroup label="Color"     options={COLORS}     field="color"    />
        <ChipGroup label="Material"  options={MATERIALS}  field="material" />

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
                <Marker key={r.report_id} position={[lat, lng]}>
                  <Popup>
                    <div className="popup-card">
                      <span className={`popup-badge ${r.lost_or_found}`}>
                        {r.lost_or_found?.toUpperCase()}
                      </span>
                      <p className="popup-desc">{r.description}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}

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
            <span className="legend-count">{reports.length} report{reports.length !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>
    </div>
  );
}