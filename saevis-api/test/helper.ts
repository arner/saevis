import {AuthService} from '../src/auth/auth.service';
import {Test} from '@nestjs/testing';
import {AuthModule} from '../src/auth/auth.module';
import {User} from '../src/users/user.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import * as request from 'supertest';

export class Helper {
  public readonly baseURL = 'http://localhost:3000';


  public async getToken(userId: number = 1): Promise<string> {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule]
    }).overrideProvider(getRepositoryToken(User))
      .useValue({findOne: () => ({id: userId})})
      .compile();

    const app = moduleFixture.createNestApplication();
    const authService = app.get<AuthService>(AuthService);

    return (await authService.createToken()).accessToken;
  }

  public async createTestTopic(token?: string): Promise<number> {
    if (!token) {
      token = await this.getToken();
    }

    return new Promise((resolve, reject) => {
      request(`${this.baseURL}/topics`)
        .post('/')
        .set('Authorization', `Bearer ${token}`)
        .send(this.getTestTopic())
        .expect(201)
        .then(res => {
          resolve(res.body.id);
        });
    });
  }

  private getTestTopic() {
    return {
      title: 'test topic'
    };
  }
}
