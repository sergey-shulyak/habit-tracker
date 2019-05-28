import { Test } from '@nestjs/testing'
import { UserService } from '../user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../user.entity'
import {
  UserRepository as UserMockRepository,
  UserRepository,
} from '../__mocks__/user.repository'
import * as faker from 'faker'
import { IUser } from '../interfaces/user.interface'

jest.mock('../__mocks__/user.repository')

describe('UserService', () => {
  const TEST_DATA: IUser[] = [
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

  let storage = [...TEST_DATA]

  let service: UserService

  beforeEach(async () => {
    // storage = [...TEST_DATA]

    UserRepository.prototype.find = jest.fn().mockResolvedValue(storage)

    UserRepository.prototype.findOne = jest
      .fn()
      .mockImplementation(id =>
        Promise.resolve(storage.find(user => user.id === id)),
      )

    UserRepository.prototype.create = jest
      .fn()
      .mockImplementation((user: IUser) => Promise.resolve(storage.push(user)))

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
    it('should return all users from repository', async () => {
      const result = await service.findAll()

      expect(result).toEqual(TEST_DATA)
    })
  })

  describe('findById', () => {
    it('should return user from repository by id', async () => {
      TEST_DATA.forEach(async user => {
        expect(await service.findOneById(user.id)).toEqual(user)
      })
    })

    describe('create', () => {
      it.skip('should return user from repository by id', async () => {
        const testUser = {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
        }

        const result = await service.create(testUser)
        console.log(result)

        expect(storage).toContainEqual(testUser)
      })
    })
  })
})
