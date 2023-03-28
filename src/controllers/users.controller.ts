import assessmentService from '@/services/assessment.service';
import fileService from '@/services/file.service';
import tokenService from '@/services/token.service';
import usersService from '@/services/users.service';
import { NextFunction, Request, Response } from 'express';

class UserController {
  public userService = new usersService();
  public assessmentService = new assessmentService();
  public tokenService = new tokenService();
  public fileService = new fileService();

  public addPoints = async (req: Request, res: Response, next: NextFunction) => {
    const tokenData = this.tokenService.decodeToken(req.cookies['X-Assessment']);
    try {
      const existedUser = await this.userService.findUserByName(req.body.userName);
      if (existedUser) {
        await this.userService.updateUser(req.body.userName, {
          points: existedUser.points + 5,
          name: req.body.userName,
        });
      } else {
        await this.userService.createUser({ name: req.body.userName, points: 5 });
      }

      await this.assessmentService.removeById(tokenData.testId);

      const topUsers = await this.userService.getTopUsers();

      if (topUsers.some(usr => usr.name === req.body.userName)) {
        await this.fileService.recordTopList(topUsers);
      }
      res.clearCookie('X-Assessment');

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
