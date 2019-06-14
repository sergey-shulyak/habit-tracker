import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'

import { IUser } from '@habit-tracker/shared'
import { MessagePattern } from '@nestjs/microservices'
import { MailService } from './mail.service'

@Controller()
export class MailController {
  public constructor(private readonly mailService: MailService) {}

  @MessagePattern('sendRegistrationConfirmation')
  public async sendRegistrationConfirmation(user: IUser) {
    return this.mailService.sendRegistrationConfirmation(user)
  }
}
