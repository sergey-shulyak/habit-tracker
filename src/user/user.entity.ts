import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ length: 30 })
  public email: string

  @Column({ length: 40 })
  public name: string

  @Column()
  public password: string

  @CreateDateColumn()
  public createAt: Date

  @UpdateDateColumn()
  public updatedAt: Date
}
