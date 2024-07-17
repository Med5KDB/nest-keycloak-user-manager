import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ResetUserPasswordInput,
  User,
  UserCreateInput,
  UserUpdateInput,
  UserWhereUniqueInput,
} from 'src/dto/keycloak-user-manager.dto';
import { KCAdminClientProvider } from 'src/providers/kc-admin-client.provider';

@Injectable()
export class KeycloakUserManagerService {
  constructor(private readonly kcAdminClientProvider: KCAdminClientProvider) {}

  async createUser(data: UserCreateInput): Promise<User> {
    const { firstName, lastName, username, email, password } = data;
    const createdUser = await this.kcAdminClientProvider.users.create({
      firstName,
      lastName,
      username,
      email,
      enabled: true,
      credentials: [{ type: 'password', value: password, temporary: true }],
    });
    const userId = createdUser.id;
    const fullUser = await this.kcAdminClientProvider.users.findOne({
      id: userId,
    });
    if (!fullUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.mapKeycloakUserToUser(createdUser);
  }

  async updateUser(
    where: UserWhereUniqueInput,
    data: UserUpdateInput,
  ): Promise<User> {
    const { firstName, lastName, username, email } = data;
    await this.kcAdminClientProvider.users.update(
      {
        id: where.id,
      },
      {
        firstName,
        lastName,
        username,
        email,
      },
    );
    const userId = where.id;
    const fullUser = await this.kcAdminClientProvider.users.findOne({
      id: userId,
    });
    if (!fullUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.mapKeycloakUserToUser(fullUser);
  }
  async deleteUser(where: UserWhereUniqueInput): Promise<{ id: string }> {
    await this.kcAdminClientProvider.users.del({ id: where.id });
    return { id: where.id };
  }

  async findUserById(where: UserWhereUniqueInput): Promise<User> {
    const userId = where.id;
    const fullUser = await this.kcAdminClientProvider.users.findOne({
      id: userId,
    });
    if (!fullUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.mapKeycloakUserToUser(fullUser);
  }

  async findManyUsers(): Promise<User[]> {
    const users = await this.kcAdminClientProvider.users.find();
    return Promise.all(
      users.map(async (user) => this.mapKeycloakUserToUser(user)),
    );
  }

  async countUsers(): Promise<number> {
    const users = await this.kcAdminClientProvider.users.find();
    return users.length;
  }

  async resetUserPassword(
    resetUserPasswordInput: ResetUserPasswordInput,
  ): Promise<User> {
    const { id, password } = resetUserPasswordInput;
    await this.kcAdminClientProvider.users.resetPassword({
      id,
      credential: {
        type: 'password',
        value: password,
        temporary: false,
      },
    });
    const userId = id;
    const fullUser = await this.kcAdminClientProvider.users.findOne({
      id: userId,
    });
    if (!fullUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.mapKeycloakUserToUser(fullUser);
  }

  private async mapKeycloakUserToUser(
    keycloakUser: UserRepresentation,
  ): Promise<User> {
    if (!keycloakUser.id) {
      throw new InternalServerErrorException('User id is required');
    }
    return {
      id: keycloakUser.id,
      firstName: keycloakUser.firstName,
      lastName: keycloakUser.lastName,
      username: keycloakUser.username,
      email: keycloakUser.email,
    };
  }
}
