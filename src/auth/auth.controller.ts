import { BadGatewayException, Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { setRedis } from 'src/config/redis';

@Controller('/auth')
export class AuthController {
  @Post()
  async generateToken() {
    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'customers',
      client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
      username: 'adrianebobsin@gmail.com',
      password: 'YWRyaWFuZWJvYnNpbkBnbWFpbC5jb20',
      scope: 'openid',
    });

    let token;
    try {
      token = await axios.post(
        'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token',
        data,
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        },
      );
    } catch (e) {
      throw new BadGatewayException('sso indisponível.');
    }

    await setRedis('token', token.data.access_token);
    return JSON.stringify(token.data);
  }
}
