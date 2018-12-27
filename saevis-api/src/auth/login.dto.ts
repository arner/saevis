import {ApiModelProperty} from '@nestjs/swagger';
export class Login {

  @ApiModelProperty({example: 'arne'})
  username: string;

  @ApiModelProperty({example: 'testpass'})
  password: string;
}
