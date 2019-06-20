import { Injectable, Logger } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'
import { OAuth2Client } from 'googleapis-common'
import { google } from 'googleapis'
import { validate as isEmailValid } from 'email-validator'
import { IUser, InvalidEmailProvidedError } from '@habit-tracker/shared'

const OAuth2 = google.auth.OAuth2

@Injectable()
export class MailService {
  private oauth2Client: OAuth2Client

  public constructor() {
    this.oauth2Client = new OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URL,
    )

    this.oauth2Client.setCredentials({
      // eslint-disable-next-line @typescript-eslint/camelcase
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    })
  }

  private async createTransporter() {
    // FIXME: Deprecated method usage
    const tokens = await this.oauth2Client.refreshAccessToken()

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
    } = tokens.credentials

    return createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        type: 'OAuth2',
        user: process.env.MAILER_USER,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    })
  }

  public async sendRegistrationConfirmation(user: IUser) {
    if (!user.email || !isEmailValid(user.email)) {
      throw new InvalidEmailProvidedError()
    }

    // TODO: Make a fancy email
    const mailOptions = {
      from: 'sender@email.com',
      to: user.email,
      subject: 'Confirm your email',
      html: `<a href="http://localhost:3000/users/confirm/${user.id}">Confirm email</a>`,
    }

    const transporter = await this.createTransporter()
    await transporter.sendMail(mailOptions)

    Logger.log(`Sent email confirmation`)
  }
}
