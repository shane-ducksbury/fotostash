import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET'
        })
    }
    
    async validate(payload: any){
        // Note: Could include some user service stuff to return more data in here for a user object.
        return {
            id: payload.sub,
            name: payload.name
        }
    }
}