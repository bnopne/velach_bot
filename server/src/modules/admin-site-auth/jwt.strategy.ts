import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PgPoolService } from 'src/modules/pg-pool/pg-pool.service';
import { ConfigurationService } from 'src/modules/configuration/configuration.service';
import { AdminSiteAccessService } from 'src/modules/entities/admin-site-access/admin-site-access.service';
import { JwtPayload } from 'src/modules/admin-site-auth/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly adminSiteAccessService: AdminSiteAccessService;
  private readonly pgPoolService: PgPoolService;

  constructor(
    configurationService: ConfigurationService,
    adminSiteAccessService: AdminSiteAccessService,
    pgPoolService: PgPoolService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configurationService.jwtSecret,
    });

    this.adminSiteAccessService = adminSiteAccessService;
    this.pgPoolService = pgPoolService;
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const client = await this.pgPoolService.getConnection();

    const access = await this.adminSiteAccessService.findByUserId(
      client,
      payload.userId,
    );

    if (!access) {
      throw new UnauthorizedException();
    }

    return { userId: payload.userId };
  }
}
