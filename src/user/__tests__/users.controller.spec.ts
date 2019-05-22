import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../user.entity'
import { UserService } from '../user.service'
import { UserController } from '../user.controller'
import { UserRepository as UserMockRepository } from '../__mocks__/user.repository'

describe('Users Controller', () => {
  let controller: UserController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: new UserMockRepository(),
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
