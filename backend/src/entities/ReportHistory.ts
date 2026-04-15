import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Report } from "./Report";

@Entity("report_history")
export class ReportHistory {
  @PrimaryGeneratedColumn({ name: "history_id", type: "bigint" })
  history_id!: number;

  @CreateDateColumn({ name: "changed_at", type: "timestamptz" })
  changed_at!: Date;

  @Column({ type: "bigint", name: "report_id" })
  report_id!: number;

  @Column({ type: "uuid", nullable: true })
  changed_by!: string;

  @Column({ type: "varchar" })
  action!: string; // "created" | "updated" | "resolved" | "deleted"

  @Column({ type: "jsonb", nullable: true })
  previous_state!: Partial<Report> | null;

  @ManyToOne(() => Report, { onDelete: "CASCADE" })
  @JoinColumn({ name: "report_id" })
  report!: Report;
}