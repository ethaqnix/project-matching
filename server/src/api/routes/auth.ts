import { Router, Request, Response, NextFunction } from "express";
import usersCollection from "../../models/user";
import AuthService from "../../services/auth";
import { IUserInputDTO } from "../../interfaces/IUser";
import middlewares from "../middlewares";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      console.debug("Calling Sign-Up endpoint with body: %o", req.body);
      try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.SignUp(
          req.body as IUserInputDTO
        );
        return res.status(201).json({ user, token });
      } catch (e) {
        console.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.post(
    "/signin",
    async (req: Request, res: Response, next: NextFunction) => {
      console.debug("Calling Sign-In endpoint with body: %o", req.body);
      try {
        const { firstName, lastName, password } = req.body;
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.SignIn(
          firstName,
          lastName,
          password
        );
        return res.json({ user, token }).status(200);
      } catch (e) {
        console.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post(
    "/logout",
    middlewares.isAuth,
    (req: Request, res: Response, next: NextFunction) => {
      console.debug("Calling Sign-Out endpoint with body: %o", req.body);
      try {
        //@TODO AuthService.Logout(req.user) do some clever stuff
        return res.status(200).end();
      } catch (e) {
        console.error("🔥 error %o", e);
        return next(e);
      }
    }
  );
};
