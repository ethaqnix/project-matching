import { Router, Request, Response } from 'express';
import usersCollection from '../../models/user';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/', async (req: Request, res: Response) => {
    const userList = await usersCollection.find({});
    res.send(userList);
  });
};