import { CreateUser } from '@/interfaces/create-user.interface';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserByName(userName: string): Promise<User> {
    // TODO: ??? next line
    // if (isEmpty(userName)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ name: userName });

    return findUser;
  }

  public async createUser(userData: CreateUser): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ name: userData.name });
    if (findUser) {
      const updatedUser = await this.updateUser(userData.name, userData);

      return updatedUser;
    } else {
      const createUserData: User = await this.users.create({ ...userData });

      return createUserData;
    }
  }

  public async updateUser(userName: string, userData: CreateUser): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const updateUserByName: User = await this.users.findOneAndUpdate({ name: userName }, { ...userData });

    return updateUserByName;
  }

  public async getTopUsers(userAmount = 3): Promise<User[]> {
    const topUsers: User[] = await this.users.find().sort({ points: -1 }).limit(userAmount).select('-_id');

    return topUsers;
  }
}

export default UserService;
