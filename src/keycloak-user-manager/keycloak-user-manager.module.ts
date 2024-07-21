import { DynamicModule, Global, Module } from '@nestjs/common';
import { KeycloakUserManagerService } from './keycloak-user-manager.service';
import { KeycloakUserManagerController } from './keycloak-user-manager.controller';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from 'src/kc-user-manager.module-definition';
import { KeycloakUserManagerModuleConfigOptions } from 'src/kc-user-manager.module-config-options';

@Global()
@Module({
  controllers: [KeycloakUserManagerController],
  providers: [KeycloakUserManagerService, KeycloakAdminClient],
  exports: [KeycloakUserManagerService],
})
export class KeycloakUserManagerModule extends ConfigurableModuleClass {
  static register(
    options: KeycloakUserManagerModuleConfigOptions,
  ): DynamicModule {
    return {
      module: KeycloakUserManagerModule,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }
}
