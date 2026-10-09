import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import type { LoginInput } from "@consultancy/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(input: LoginInput) {
    if (this.prisma.available === false) {
      throw new ServiceUnavailableException({
        code: "DATABASE_UNAVAILABLE",
        message: "Admin login needs a database, which is not configured.",
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (!user) {
      this.logger.warn(`Authentication failure for ${input.email}`);
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) {
      this.logger.warn(`Authentication failure for ${input.email}`);
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async login(input: LoginInput) {
    const user = await this.validateUser(input);
    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { user, accessToken };
  }
}
