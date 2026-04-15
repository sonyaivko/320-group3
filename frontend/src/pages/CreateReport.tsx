import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { useNavigate } from "react-router-dom";

import { createReport } from "../api/createReport";
import { UMassBounds } from "../utils/mapBounds";

import "./createReport.css";
import "leaflet/dist/leaflet.css";

/* ---------------- MAP PICKER ---------------- */

function LocationPicker({
  setCoords,
}: {
  setCoords: (coords: LatLng) => void;
}) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      setCoords(e.latlng);
    },
  });
  return null;
}

/* ---------------- OPTIONS ---------------- */

const ITEM_TYPES = ["Backpack", "Purse", "Wallet", "Phone", "Keys", "Laptop", "Card", "Other"];

const COLORS = [
  "Red","Orange","Yellow","Green","Blue","Indigo","Violet",
  "Black","Gray","White","Other",
];

const MATERIALS = [
  "Leather","Plastic","Metal","Stainless Steel","Fabric","Rubber","Other",
];

/* ---------------- TYPES ---------------- */

type Step = "type" | "form";

type FormState = {
  type: "lost" | "found" | null;
  description: string;
  itemType: string[];
  color: string[];
  material: string[];
};

export default function CreateReport() {
  const [step, setStep] = useState<Step>("type");
  const [animateOut, setAnimateOut] = useState(false);
  const [coords, setCoords] = useState<LatLng | null>(null);

  const [formData, setFormData] = useState<FormState>({
    type: null,
    description: "",
    itemType: [],
    color: [],
    material: [],
  });

  const navigate = useNavigate();

  /* ---------------- MULTI SELECT ---------------- */

  const toggle = (key: keyof FormState, value: string) => {
    const list = formData[key] as string[];

    setFormData((prev) => ({
      ...prev,
      [key]: list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value],
    }));
  };

  /* ---------------- STEP TRANSITION ---------------- */

  const goToForm = (type: "lost" | "found") => {
    setAnimateOut(true);

    setTimeout(() => {
      setFormData((prev) => ({ ...prev, type }));
      setStep("form");
      setAnimateOut(false);
    }, 300);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coords || !formData.type) {
      alert("Please complete all required fields");
      return;
    }

    try {
      await createReport({
        lost_or_found: formData.type,
        latitude: coords.lat,
        longitude: coords.lng,
        resolved: false,
        description: formData.description,
        categories: {
          itemType: formData.itemType,
          color: formData.color,
          material: formData.material,
        },
      });

      alert("Report submitted!");
      navigate("/viewreports");
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ---------------- STEP 1 ---------------- */

  if (step === "type") {
    return (
      <div className="create-report-page">
        <div
          className={`create-report-container center ${
            animateOut ? "fade-out" : "fade-in"
          }`}
        >
          <h1 className="title">What happened?</h1>
          <p className="subtitle">Select one option to continue</p>

          <div className="type-buttons">
            <button className="big-btn lost" onClick={() => goToForm("lost")}>
              I Lost Something
            </button>

            <button className="big-btn found" onClick={() => goToForm("found")}>
              I Found Something
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- STEP 2 ---------------- */

  return (
    <div className="create-report-page">
      <div className="create-report-container fade-in">

        {/* HEADER */}
        <div className="create-header">
          <h1>
            {formData.type === "lost"
              ? "Where did you lose the item?"
              : "Where did you find the item?"}
          </h1>
          <p>Click on the map to drop a pin</p>
        </div>

        {/* MAP */}
        <div className="map-box">
          <MapContainer
            center={UMassBounds.center}
            zoom={15}
            minZoom={14}
            maxBounds={UMassBounds.bounds}
            className="map"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker setCoords={setCoords} />
            {coords && <Marker position={[coords.lat, coords.lng]} />}
          </MapContainer>
        </div>

        {/* FORM */}
        <form className="report-form" onSubmit={handleSubmit}>

          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* ITEM TYPE */}
          <div className="multi-group">
            <h3>Item Type</h3>
            <div className="multi-options">
              {ITEM_TYPES.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={formData.itemType.includes(item) ? "selected" : ""}
                  onClick={() => toggle("itemType", item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="multi-group">
            <h3>Color</h3>
            <div className="multi-options">
              {COLORS.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={formData.color.includes(color) ? "selected" : ""}
                  onClick={() => toggle("color", color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* MATERIAL */}
          <div className="multi-group">
            <h3>Material</h3>
            <div className="multi-options">
              {MATERIALS.map((mat) => (
                <button
                  type="button"
                  key={mat}
                  className={formData.material.includes(mat) ? "selected" : ""}
                  onClick={() => toggle("material", mat)}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          <button className="submit-btn" type="submit">
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
}