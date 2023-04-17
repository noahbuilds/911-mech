// import jwt from "jsonwebtoken";
// import configuration from "../configs/configs";

// const authToken = {
//   assignToken: (user: any): string => {
//     // try {

//     // } catch (error) {

//     // }
//     let token: string;
//     return token = jwt.sign(
//       { userId: user.id, email: user.email },
//       configuration.JWT_SECRET as string,
//       {
//         expiresIn: "1h",
//       }
//     );

//   },

//   // verifyToken : ()=>{
//   //     jwt.verify()
//   // }
// };

// export { authToken };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import configuration from "../configs/configs";

const auth = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, configuration.JWT_SECRET as string);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (error: any) {
    // console.log(error)
    res.json({
      err: error,
      msg: error.message,
    });
  }
};

// const setVerifiedUser = (user:any)=>{
//     return user
// }

export { auth };
