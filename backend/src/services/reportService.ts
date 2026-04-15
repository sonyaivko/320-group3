import { uFoundDataSource } from "../ormconfig";
import { Report } from "../entities/Report";
import { ReportHistory } from "../entities/ReportHistory"; 

// helper — call BEFORE saving changes
async function logHistory(
  report: Report,
  action: string,
  changed_by: string
) {
  const historyRepo = uFoundDataSource.getRepository(ReportHistory);
  await historyRepo.save({
    report_id: report.report_id,
    changed_by,
    action,
    previous_state: { ...report },
  });
}

export async function createReport(data: Partial<Report>): Promise<Report> {
  const reportRepo = uFoundDataSource.getRepository(Report);
<<<<<<< HEAD
  const report = reportRepo.create({ ...data, updated_at: new Date() });
  const saved = await reportRepo.save(report);

  await logHistory(saved, "created", data.user_id!); // log after create
  return saved;
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

  await logHistory(report, "updated", user_id); // log BEFORE changes

  report.lost_or_found = "found";
  if (updates.description) report.description = updates.description;
  if (updates.latitude) report.latitude = updates.latitude;
  if (updates.longitude) report.longitude = updates.longitude;
  report.updated_at = new Date();

  return await reportRepo.save(report);
}

=======
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

>>>>>>> 9a29e83f2935a689a634d091ca8ce52fd9646514
export async function resolveReport(report_id: number, user_id: string): Promise<Report> {
  const reportRepo = uFoundDataSource.getRepository(Report);
  const report = await reportRepo.findOne({ where: { report_id } });

  if (!report) throw new Error("Report not found");
  if (report.user_id !== user_id) throw new Error("Unauthorized");

<<<<<<< HEAD
  await logHistory(report, "resolved", user_id); // log BEFORE changes

=======
>>>>>>> 9a29e83f2935a689a634d091ca8ce52fd9646514
  report.resolved = true;
  report.updated_at = new Date();
  return await reportRepo.save(report);
}

export async function deleteReport(report_id: number, user_id: string): Promise<void> {
  const reportRepo = uFoundDataSource.getRepository(Report);
  const report = await reportRepo.findOne({ where: { report_id } });

  if (!report) throw new Error("Report not found");
  if (report.user_id !== user_id) throw new Error("Unauthorized");

<<<<<<< HEAD
  await logHistory(report, "deleted", user_id); // log BEFORE delete
=======
>>>>>>> 9a29e83f2935a689a634d091ca8ce52fd9646514
  await reportRepo.remove(report);
}