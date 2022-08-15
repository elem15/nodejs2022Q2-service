import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserEntity } from "./entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from 'nestjs-config';
@Module({
    imports: [
                TypeOrmModule.forFeature([UserEntity]),
                AuthModule,   
                PassportModule,
                JwtModule.register({
                    secret: 'secret123123',
                    signOptions: {expiresIn: '1h'},
                    // imports: [ConfigModule],
                    // useFactory: (configService: ConfigService) => ({
                    //     secret: configService.get('JWT_SECRET_KEY'),
                    //     signOptions: { expiresIn: configService.get('TOKEN_EXPIRE_TIME')},
                    // }),
                    // inject: [ConfigService]
                })              
            ],
    providers: [AuthService],
    controllers: [AuthController],    
})
export class AuthModule {}
