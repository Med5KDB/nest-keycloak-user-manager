import {
  ConnectionConfig,
  KeycloakAdminClient,
} from '@keycloak/keycloak-admin-client/lib/client';
import { Injectable } from '@nestjs/common';
import { KeycloakConfigOptions } from 'src/keycloak-config-options';

@Injectable()
export class KCAdminClientProvider extends KeycloakAdminClient {
  constructor(private configOptions: KeycloakConfigOptions) {
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
