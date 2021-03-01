import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  userID: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  phone: string;

  @Column({ type: 'varchar', length: 300 })
  dob: string;

  @Column({ type: 'varchar', length: 300, default: "default", nullable: true })
  role: string;
}