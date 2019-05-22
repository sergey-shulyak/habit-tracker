import { User } from '../user.entity'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // private _data: User[]
  // public set data(data: User[]) {
  //   this._data = data
  // }
  // public findAll() {
  //   return this._data
  // }
  // public create(user: User) {
  //   this._data.append(user)
  // }
  // public findById(id: string) {
  //   return this.userRepository.findOne(id)
  // }
  // public update(id: string, userData: IUser) {
  //   this.userRepository.update(id, userData)
  // }
  // public delete(id: string) {
  //   this.userRepository.delete(id)
  // }
}
