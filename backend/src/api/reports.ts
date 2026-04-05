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
    categories: Record<string, string>;
  }
  
  export async function getReports(): Promise<BackendReport[]> {
    const res = await fetch("http://localhost:4000/reports");
  
    if (!res.ok) {
      throw new Error("Failed to fetch reports");
    }
  
    return res.json();
  }
  
  export async function createReport(payload: CreateReportPayload) {
    const token = localStorage.getItem("token");
  
    const res = await fetch("http://localhost:4000/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.error || "Failed to create report");
    }
  
    return data;
  }