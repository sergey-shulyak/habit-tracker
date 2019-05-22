import { Test } from '@nestjs/testing'
import { UserService } from '../user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../user.entity'
import { UserRepository as UserMockRepository } from '../__mocks__/user.repository'

jest.mock('../__mocks__/user.repository')

describe('UserService', () => {
  const TEST_DATA = [
    {
      id: '63ec5909-91db-416d-8858-10d36b8c5631',
      email: 'feppemaffyhi-1473@yopmail.com',
      name: 'Szczepan Rothenberg',
      password: 'PT9RQD5r',
    },
    {
      id: '229b5e95-0a90-4030-a108-d86c320a4092',
      email: 'ipehina-7622@yopmail.com',
      name: 'Thyrza MacIver',
      password: 'BGEH45mp',
    },
    {
      id: '63ec5909-91db-416d-8858-10d36b8c5631',
      email: 'ejonuxo-3053@yopmail.com',
      name: 'Katharine Jönsson',
      password: 'GS54UjUX',
    },
  ]

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

  describe('findAll', () => {
    it('should return all users from repository', async () => {})
  })
})
