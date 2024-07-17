import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakUserManagerModule } from './keycloak-user-manager/keycloak-user-manager.module';

@Module({
  imports: [KeycloakUserManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
