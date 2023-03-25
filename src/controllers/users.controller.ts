import usersService from '@/services/users.service';
import { NextFunction, Request, Response } from 'express';

class UserController {
  public userService = new usersService();

  public addPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existedUser = await this.userService.findUserByName(req.body.name);
      if (existedUser) {
        await this.userService.updateUser(req.body.name, {
          points: existedUser.points + 5,
          name: req.body.name,
        });
      } else {
        await this.userService.createUser({ name: req.body.name, points: 5 });
      }

      const topUsers = await this.userService.getTopUsers();

      res.status(200).json({ data: topUsers });
    } catch (error) {
      next(error);
    }
  };

  public getTop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topUsers = await this.userService.getTopUsers();

      res.status(200).json({ data: topUsers });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
