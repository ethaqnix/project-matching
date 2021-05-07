import { usersCollection } from "../../models";

const attachCurrentUser = async (req, res, next) => {
  try {
    const userRecord = await usersCollection.findById(req.token._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, "password");
    Reflect.deleteProperty(currentUser, "salt");
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    return next(e);
  }
};

export default attachCurrentUser;
