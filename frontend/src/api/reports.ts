export interface BackendReport {
    report_id: number;
    description: string | null;
    lost_or_found: string;
    resolved: boolean;
  }
  
  export async function getReports(): Promise<BackendReport[]> {
    const res = await fetch("http://localhost:4000/reports");
  
    if (!res.ok) {
      throw new Error("Failed to fetch reports");
    }
  
    return res.json();
  }