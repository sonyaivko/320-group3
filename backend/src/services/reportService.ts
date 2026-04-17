import { uFoundDataSource } from "../ormconfig";
import { Report } from "../entities/Report";

export async function createReport(data: Partial<Report>): Promise<Report> {
  const reportRepo = uFoundDataSource.getRepository(Report);
  const report = reportRepo.create({
    ...data,
    updated_at: new Date(), 
  });
  return await reportRepo.save(report);
}

export async function markAsFound(
  report_id: number,
  user_id: string,
  updates: { description?: string; latitude?: number; longitude?: number }
): Promise<Report> {
  const reportRepo = uFoundDataSource.getRepository(Report);
  const report = await reportRepo.findOne({ where: { report_id } });

  if (!report) throw new Error("Report not found");
  if (report.user_id !== user_id) throw new Error("Unauthorized");

  report.lost_or_found = "found";
  if (updates.description) report.description = updates.description;
  if (updates.latitude) report.latitude = updates.latitude;
  if (updates.longitude) report.longitude = updates.longitude;
  report.updated_at = new Date();

  return await reportRepo.save(report);
}

export async function resolveReport(report_id: number, user_id: string): Promise<Report> {
  const reportRepo = uFoundDataSource.getRepository(Report);
  const report = await reportRepo.findOne({ where: { report_id } });

  if (!report) throw new Error("Report not found");

  report.resolved = true;
  report.updated_at = new Date();
  return await reportRepo.save(report);
}

export async function deleteReport(report_id: number, user_id: string): Promise<void> {
  const reportRepo = uFoundDataSource.getRepository(Report);
  const report = await reportRepo.findOne({ where: { report_id } });

  if (!report) throw new Error("Report not found");
  if (report.user_id !== user_id) throw new Error("Unauthorized");

  await reportRepo.remove(report);
}