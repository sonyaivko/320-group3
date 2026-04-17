import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn({ name: "report_id", type: "bigint" })
  report_id!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })  // ← change this
  updated_at!: Date;

  @Column({ name: "lost_or_found", type: "text", default: "" })
  lost_or_found!: string;

  @Column({ type: "numeric" })
  latitude!: number;

  @Column({ type: "numeric" })
  longitude!: number;

  @Column({ type: "boolean" })
  resolved!: boolean;

  @Column({ type: "varchar", nullable: true })
  description!: string;

  @Column({ type: "jsonb", nullable: true })
  categories!: {
    itemType: string[];
    color: string[];
    material: string[];
  } | null;

  @Column({ type: "uuid", nullable: true })
  user_id!: string;
}