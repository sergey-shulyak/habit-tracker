import { Test, TestingModule } from '@nestjs/testing'

import { AuthService } from '../auth.service'
import { CryptoService } from '../crypto.service'
import { JwtService } from '../jwt.service'
import { MailModule } from '../../mail/mail.module'
import { PassportModule } from '@nestjs/passport'
import { User } from '../../user/user.entity'
import { UserRepository as UserMockRepository } from '../../user/__mocks__/user.repository'
import { UserModule } from '../../user/user.module'
import { getRepositoryToken } from '@nestjs/typeorm'

describe.skip('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ session: false }),
        UserModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: new UserMockRepository(),
        },
        AuthService,
        JwtService,
        CryptoService,
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
