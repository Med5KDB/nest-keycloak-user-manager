import { ConfigurableModuleBuilder } from '@nestjs/common';
import { KeycloakUserManagerModuleConfigOptions } from './kc-user-manager.module-config-options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<KeycloakUserManagerModuleConfigOptions>().build();
