import { sign, verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { TokenData } from '@interfaces/auth.interface';
import { QuestionaryState } from '@interfaces/questionaryState.interface';
import userModel from '@models/users.model';

class AuthService {
  public users = userModel;

  public createToken(questinaryState: QuestionaryState): TokenData {
    const dataStoredInToken: QuestionaryState = { ...questinaryState };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `X-questionary-state=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async verifyToken(token: string) {
    try {
      await verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error('Token in not valid');
    }
  }
}

export default AuthService;
