import jwt from "jsonwebtoken";
import config from "../config";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import { usersCollection } from "../models";

/*import {
  EventDispatcher,
  EventDispatcherInterface,
} from "../decorators/eventDispatcher";*/
//import events from "../subscribers/events";

export default class AuthService {
  constructor() {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);

      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      console.log("Creating user db record");
      const userRecord = await usersCollection.create({
        ...userInputDTO,
        salt: salt.toString("hex"),
        password: hashedPassword,
      });
      console.log("Generating JWT");
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error("User cannot be created");
      }

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async SignIn(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const userRecord = await usersCollection.findOne({ firstName, lastName });
    if (!userRecord) {
      throw new Error("User not registered");
    }
    console.log("Checking password");
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      console.log("Password is valid!");
      console.log("Generating JWT");
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } else {
      throw new Error("Invalid Password");
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    console.log(`Sign JWT for userId: ${user._id}`);
    const res = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
    return res;
  }
}
