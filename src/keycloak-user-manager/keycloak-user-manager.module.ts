import { Global, Module } from '@nestjs/common';
import { KeycloakUserManagerService } from './keycloak-user-manager.service';
import { KeycloakUserManagerController } from './keycloak-user-manager.controller';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { ConfigurableModuleClass } from 'src/kc-user-manager.module-definition';

@Global()
@Module({
  controllers: [KeycloakUserManagerController],
  providers: [
    KeycloakUserManagerService,
    KeycloakUserManagerController,
    KeycloakAdminClient,
  ],
  exports: [KeycloakUserManagerService],
})
export class KeycloakUserManagerModule extends ConfigurableModuleClass {}
