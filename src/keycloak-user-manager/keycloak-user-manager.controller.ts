import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
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
import { Logger } from '@nestjs/common';

@Controller('users')
export class KeycloakUserManagerController {
  private readonly logger = new Logger(KeycloakUserManagerController.name);
  constructor(
    private readonly keycloakUserManagerService: KeycloakUserManagerService,
  ) {}
  @Post()
  async createUser(@Body() data: UserCreateInput): Promise<User> {
    try {
      return this.keycloakUserManagerService.createUser(data);
    } catch (err) {
      if (err instanceof ConflictException) {
        throw new ConflictException(
          `User with username or email already exists`,
        );
      }
      this.logger.error(err);
      throw new InternalServerErrorException(
        `User creation failed due to ${err}`,
      );
    }
  }

  @Put(':id')
  async updateUser(
    @Body() data: UserUpdateInput,
    @Param('id') where: UserWhereUniqueInput,
  ): Promise<User> {
    try {
      const updatedUser = this.keycloakUserManagerService.updateUser(
        where,
        data,
      );
      return updatedUser;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        `Failed to update user due to ${err}`,
      );
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') where: UserWhereUniqueInput,
  ): Promise<{ id: string }> {
    try {
      return this.keycloakUserManagerService.deleteUser(where);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        `Failed to delete user due to ${err}`,
      );
    }
  }

  @Get()
  async getUsers(): Promise<ResultWithCount<User>> {
    try {
      const [users, count] = await Promise.all([
        this.keycloakUserManagerService.findManyUsers(),
        this.keycloakUserManagerService.countUsers(),
      ]);
      return { data: users, count };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        `Failed to get users due to ${err}`,
      );
    }
  }

  @Get(':id')
  async getUser(@Param('id') where: UserWhereUniqueInput): Promise<User> {
    try {
      return this.keycloakUserManagerService.findUserById(where);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        `Failed to get user due to ${err}`,
      );
    }
  }

  @Put('reset-password')
  async resetUserPassword(@Body() data: ResetUserPasswordInput) {
    try {
      return this.keycloakUserManagerService.resetUserPassword(data);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        `Failed to reset user password due to ${err}`,
      );
    }
  }
}
