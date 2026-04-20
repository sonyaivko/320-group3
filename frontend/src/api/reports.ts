import { API_BASE_URL } from "./base";
import { getToken } from "../utils/auth";

export interface BackendReport {
  report_id: number;
  description: string | null;
  lost_or_found: string;
  resolved: boolean;
}

export interface CreateReportPayload {
  lost_or_found: string;
  latitude: number;
  longitude: number;
  resolved: boolean;
  description: string;
  categories: {
    itemType: string[];
    color: string[];
    material: string[];
  };
}

export async function getReports(): Promise<BackendReport[]> {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reports");
  }

  return res.json();
}

export async function createReport(payload: CreateReportPayload) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Protected backend route requires Bearer token
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create report");

  return data;
}

export async function resolveReport(report_id: number) {
  const token = getToken();

  const res = await fetch(
    `${API_BASE_URL}/reports/${report_id}/resolve`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to resolve report");
  }

  return res.json();
}