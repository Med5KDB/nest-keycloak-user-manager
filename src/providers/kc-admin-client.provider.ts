import { ConnectionConfig } from '@keycloak/keycloak-admin-client/lib/client';
import { Injectable } from '@nestjs/common';
import { KeycloakUserManagerModuleConfigOptions } from 'src/kc-user-manager.module-config-options';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

@Injectable()
export class KCAdminClientProvider extends KeycloakAdminClient {
  constructor(private configOptions: KeycloakUserManagerModuleConfigOptions) {
    const keycloakConfig: ConnectionConfig = {
      baseUrl: configOptions.baseUrl,
      realmName: configOptions.realm,
    };
    super(keycloakConfig);
    this.authenticate();
  }

  async authenticate() {
    await this.auth({
      grantType: 'client_credentials',
      clientId: this.configOptions.clientId,
      clientSecret: this.configOptions.clientSecret,
    });
  }
}
