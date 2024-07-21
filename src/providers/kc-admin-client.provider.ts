import { Injectable } from '@nestjs/common';
import { KeycloakUserManagerModuleConfigOptions } from 'src/kc-user-manager.module-config-options';

@Injectable()
export class KCAdminClientProvider {
  private KeycloakAdminClient: any;

  constructor(private configOptions: KeycloakUserManagerModuleConfigOptions) {
    this.initializeClient();
  }

  async initializeClient() {
    this.KeycloakAdminClient = (
      await import('@keycloak/keycloak-admin-client')
    ).default; // Dynamic import
    const keycloakConfig = {
      baseUrl: this.configOptions.baseUrl,
      realmName: this.configOptions.realm,
    };
    this.authenticate(keycloakConfig);
  }

  async authenticate(keycloakConfig: any) {
    const client = new this.KeycloakAdminClient(keycloakConfig);
    await client.auth({
      grantType: 'client_credentials',
      clientId: this.configOptions.clientId,
      clientSecret: this.configOptions.clientSecret,
    });
  }
  getkCAdminClient() {
    return this.KeycloakAdminClient;
  }
}
