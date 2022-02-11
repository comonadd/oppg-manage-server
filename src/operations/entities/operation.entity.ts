import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const enum Status {
  InProgress = 0,
  Done = 1,
  Failed = 2,
}

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  status: Status;
}
