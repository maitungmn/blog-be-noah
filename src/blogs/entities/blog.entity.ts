import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class Blogs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  imageUrl: string;

  @Column({ type: 'varchar' })
  content: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'varchar', length: 300, default: "default" })
  createBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 300, default: "default" })
  updatedBy: string;
}