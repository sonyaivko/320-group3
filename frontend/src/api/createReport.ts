export interface CreateReportPayload {
    lost_or_found: string;
    latitude: number;
    longitude: number;
    resolved: boolean;
    description: string;
    categories: Record<string, string>;
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