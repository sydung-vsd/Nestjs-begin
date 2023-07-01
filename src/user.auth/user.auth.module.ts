import { Module } from '@nestjs/common';
import { UserAuthService } from './user.auth.service';
import { UserAuthController } from './user.auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthEntity } from './entities/user.auth.entity';
import { UserAuthRepository } from './user.auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: "topSecret51", // đây là secret ky, cái này nên define ở trong .env và lấy ra dùng
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UserAuthEntity])
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, UserAuthRepository, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class UserAuthModule {}
