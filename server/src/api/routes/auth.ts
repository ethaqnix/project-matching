import { Router, Request, Response, NextFunction } from 'express';
import usersCollection from '../../models/user';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signin',
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.params);
      
      console.log('Calling Sign-In endpoint with body: %o', req.body);
      console.log("signin not implemented")
    },
  );
};