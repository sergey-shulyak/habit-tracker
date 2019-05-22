import { Test } from '@nestjs/testing'
import { UserService } from '../user.service'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../user.entity'
import { UserRepository as UserMockRepository } from '../__mocks__/user.repository'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: new UserMockRepository(),
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
