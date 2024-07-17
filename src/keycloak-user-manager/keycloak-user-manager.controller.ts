import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { KeycloakUserManagerService } from './keycloak-user-manager.service';
import {
  ResetUserPasswordInput,
  User,
  UserCreateInput,
  UserUpdateInput,
  UserWhereUniqueInput,
} from 'src/dto/keycloak-user-manager.dto';
import { ResultWithCount } from 'src/dto/result-with-count.dto';

@Controller('users')
export class KeycloakUserManagerController {
  constructor(
    private readonly keycloakUserManagerService: KeycloakUserManagerService,
  ) {}
  @Post()
  async createUser(@Body() data: UserCreateInput): Promise<User> {
    return this.keycloakUserManagerService.createUser(data);
  }

  @Put(':id')
  async updateUser(
    @Body() data: UserUpdateInput,
    @Param('id') where: UserWhereUniqueInput,
  ): Promise<User> {
    const updatedUser = this.keycloakUserManagerService.updateUser(where, data);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') where: UserWhereUniqueInput,
  ): Promise<{ id: string }> {
    return this.keycloakUserManagerService.deleteUser(where);
  }

  @Get()
  async getUsers(): Promise<ResultWithCount<User>> {
    const [users, count] = await Promise.all([
      this.keycloakUserManagerService.findManyUsers(),
      this.keycloakUserManagerService.countUsers(),
    ]);
    return { data: users, count };
  }

  @Get(':id')
  async getUser(@Param('id') where: UserWhereUniqueInput): Promise<User> {
    return this.keycloakUserManagerService.findUserById(where);
  }

  @Put('reset-password')
  async resetUserPassword(@Body() data: ResetUserPasswordInput) {
    return this.keycloakUserManagerService.resetUserPassword(data);
  }
}
