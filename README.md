# Keycloak User Manager

The `keycloak-user-manager` package provides an easy way to manage users with Keycloak in a NestJS application. It offers pre-built endpoints for common user management tasks while allowing customization for your own endpoints if needed.

## Features

- Easy integration with Keycloak
- Pre-built user management endpoints
- Configurable module for different Keycloak instances
- Extendable service for custom user management logic

## Description

Module/Boilerplate for simplified user-management w/ [Keycloak](https://www.keycloak.org/) in NestJS applications

## Installation

To install the package, use npm or yarn:

```bash
npm install keycloak-user-manager
# or
yarn add keycloak-user-manager
```

## Configuration

To configure the module, you need to provide the Keycloak connection details in your `app.module.ts` file:

```typescript
# app.module.ts
import { Module } from '@nestjs/common';
import { KeycloakUserManagerModule } from 'keycloak-user-manager';

@Module({
  imports: [
    KeycloakUserManagerModule.forRoot({
      baseUrl: 'http://localhost:8080',
      realm: 'med5-realm',
      clientId: 'med5-clientId',
      clientSecret: 'med5-clientSecret',

    }),
  ],
})
@Global()
export class AppModule {}
```
<p align="center">
Do not forget to provide your own Keycloak options.
</p>

## Usage
### Pre-built Endpoints

Once the module is configured, you can use the following endpoints to manage users:

- `GET /users`: Returns a list of all users in the Keycloak realm.
- `GET /users/:id`: Returns the user with the specified ID.
- `POST /users`: Creates a new user in the Keycloak realm.
- `PUT /users/:id`: Updates the user with the specified ID.
- `DELETE /users/:id`: Deletes the user with the specified ID.
- `PUT /users/reset-password`: Resets the password of a user.

You should respect the following shape of the user object:
```typescript
{
  username: string;
  email: string;
  firstName: string;
  lastName: string;  
}
// for resetting the password, the body should be:
{
  id: string;
  password: string;
}
```
<p>The email is optional, but if provided, it will be used to create the user in Keycloak. (It can be used as a login identifier). </p>
</br>
<p>
The username is required, and it will be used by Keycloak to identify the user so it should be unique.
</p>


### Custom Endpoints

If you need to create your own endpoints, you can use the `KeycloakUserManagerService` provided by the module. Following is an example of how to use it:

```typescript
import { Controller, Post } from '@nestjs/common';
import { KeycloakUserManagerService } from 'keycloak-user-manager';
import { AddUserDto, UpdateUserDto } from 'src/dto/custom-users.dto';

@Controller('custom-users')
export class UserService {
  constructor(private readonly keycloakUserManagerService: KeycloakUserManagerService) {}
  
  @Post()
  async addUser(@Body() addUserDto: AddUserDto){
    return await this.keycloakUserManagerService.createUser(addUserDto);
  }

  @Put(':id')
  async modifyUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
    return await this.keycloakUserManagerService.updateUser(id, updateUserDto);
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string){
    return await this.keycloakUserManagerService.findUserById(id);
  }

  @Get()
  async getAllUsers(){
    return await this.keycloakUserManagerService.findManyUsers();
  }
  @Delete(':id')
  async removeUser(@Param('id') id: string){
    return await this.keycloakUserManagerService.deleteUser(id);
  }

}
```

## Contributing

Contributions are welcome! Feel free to do contribute by opening issues and/or pull requests.

## Stay in touch

- Author - [Mohamed Lamine Badji] (https://flowcv.me/muhammad-al-amine)
- Twitter - [@Med5Lemzi](https://x.com/Med5Lemzi)
