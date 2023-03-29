import { sign, verify, decode } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { TokenData } from '@interfaces/auth.interface';
// import userModel from '@models/users.model';
import { TokenDto } from '@/dtos/token.dto';

class TokenService {
  // public users = userModel;

  public createToken(tokenDto: TokenDto | { id: string }): TokenData {
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(tokenDto, secretKey, { expiresIn }) };
  }

  public createAssessmentCookie(tokenData: TokenData): string {
    return `X-Assessment=${tokenData.token}; Path=/; HttpOnly; SameSite=Secure; Max-Age=${tokenData.expiresIn};`;
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
}

export default TokenService;
