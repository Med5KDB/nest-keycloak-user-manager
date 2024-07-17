import { Module } from '@nestjs/common';
import { KeycloakUserManagerService } from './keycloak-user-manager.service';
import { KeycloakUserManagerController } from './keycloak-user-manager.controller';

@Module({
  controllers: [KeycloakUserManagerController],
  providers: [KeycloakUserManagerService],
})
export class KeycloakUserManagerModule {}
