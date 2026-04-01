import { uFoundDataSource } from "../ormconfig";
import { Report } from "../entities/Report";

export async function createReport(data: Partial<Report>): Promise<Report> {
  const reportRepo = uFoundDataSource.getRepository(Report);
  const report = reportRepo.create({
    ...data,
    updated_at: new Date(),  // ← add this
  });
  return await reportRepo.save(report);
}