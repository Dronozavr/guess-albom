import { sign, verify, decode } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { TokenData } from '@interfaces/auth.interface';
// import userModel from '@models/users.model';
import { TokenDto } from '@/dtos/token.dto';

class TokenService {
  // public users = userModel;

  public createToken(tokenDto: TokenDto): TokenData {
    const dataStoredInToken: TokenDto = { ...tokenDto };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `X-Assessment=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async verifyToken(token: string) {
    try {
      await verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error('Token in not valid');
    }
  }

  public decodeToken(token: string): TokenDto {
    return decode(token, { json: true }) as TokenDto;
  }

  // TODO: Add decoding mechanim
}

export default TokenService;