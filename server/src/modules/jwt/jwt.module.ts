import { JwtModule as BaseJwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';

export const JwtModule = BaseJwtModule.registerAsync({
  imports: [ConfigurationModule],
  useFactory: async (configurationService: ConfigurationService) => ({
    secret: configurationService.jwtSecret,
  }),
  inject: [ConfigurationService],
});
