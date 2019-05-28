import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ length: 30, unique: true })
  public email: string

  @Column({ length: 40 })
  public name: string

  @Column()
  public password: string

  @Column({ default: false })
  public isEmailConfirmed: boolean

  @CreateDateColumn()
  public createAt: Date

  @UpdateDateColumn()
  public updatedAt: Date
}
