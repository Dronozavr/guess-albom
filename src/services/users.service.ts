import { CreateUserDto } from '@dtos/users.dto';
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
    if (isEmpty(userName)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ name: userName });

    // TODO: should be deleted
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
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

  public async updateUser(userName: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    // if (userData.name) {
    //   const findUser: User = await this.users.findOne({ name: userData.name });
    //   if (findUser && findUser.name != userName) throw new HttpException(409, `This email ${userData.email} already exists`);
    // }

    // if (userData.password) {
    //   const hashedPassword = await hash(userData.password, 10);
    //   userData = { ...userData, password: hashedPassword };
    // }

    const updateUserByName: User = await this.users.findOneAndUpdate({ name: userName }, { userData });

    return updateUserByName;
  }
}

export default UserService;
