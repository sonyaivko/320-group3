import { uFoundDataSource } from "../ormconfig";
import { Report } from "../entities/Report";

export async function getReports(filters: {
  lost_or_found?: string;
  categories?: {
    itemType: string[];
    color: string[];
    material: string[];
  } | null;
  created_after?: string;
  created_before?: string;
  latitude?: number;
  longitude?: number;
  radius_km?: number;
}): Promise<Report[]> {
  const repo = uFoundDataSource.getRepository(Report);
  const query = repo.createQueryBuilder("report");

  if (filters.lost_or_found) {
    query.andWhere("report.lost_or_found = :lost_or_found", { lost_or_found: filters.lost_or_found });
  }

  if (filters.categories) {
  const items = [
    ...(filters.categories.itemType || []),
    ...(filters.categories.color || []),
    ...(filters.categories.material || []),
  ];

    if (items.length > 0) {
      query.andWhere(
        `
        report.categories->'itemType' ?| array[:...items]
        OR report.categories->'color' ?| array[:...items]
        OR report.categories->'material' ?| array[:...items]
        `,
        { items }
      );
    }
  }

  if (filters.created_after) {
    query.andWhere("report.created_at >= :created_after", { created_after: new Date(filters.created_after) });
  }

  if (filters.created_before) {
    query.andWhere("report.created_at <= :created_before", { created_before: new Date(filters.created_before) });
  }

  if (
  filters.latitude !== undefined &&
  filters.longitude !== undefined &&
  filters.radius_km !== undefined) {
    query.andWhere(
      `earth_distance(ll_to_earth(report.latitude, report.longitude), ll_to_earth(:lat, :lng)) <= :radius_m`,
      { lat: filters.latitude, lng: filters.longitude, radius_m: filters.radius_km * 1000 }
    );
  }

  return await query.getMany();
}