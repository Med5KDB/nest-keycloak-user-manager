import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { KeycloakUserManagerService } from './keycloak-user-manager.service';
import {
  User,
  UserCreateInput,
  UserUpdateInput,
  UserWhereUniqueInput,
} from 'src/dto/keycloak-user-manager.dto';

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
}
