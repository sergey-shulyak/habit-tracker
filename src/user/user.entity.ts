import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 30 })
  public email: string

  @Column({ length: 40 })
  public name: string

  @Column({ length: 24 })
  public password: string
}
