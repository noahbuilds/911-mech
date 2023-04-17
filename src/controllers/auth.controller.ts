import { Request, Response } from "express";
import { IContractor } from "../datasource/interface/contractor";
import { injectable } from "tsyringe";

import {
  AuthService,
  ContractorService,
  tokenService,
  EmailService,
} from "../services";
@injectable()
class AuthController {
  constructor(
    private readonly contractorService: ContractorService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}
  public createUser = async (req: Request, res: Response) => {
    try {
      let alreadyExist = await this.contractorService.emailExists(req.body.email);
      if (alreadyExist) {
        return res.json({
          msg: "Email has already been taken",
        });
      }
      let result = await this.contractorService.createContractor(req.body);
      let token = tokenService.assignToken(result);
      res.set("auth-token", token);
    
      return res.json(result);
    } catch (error: any) {
      return res.json({
        msg: "Couldnt create user",
        err: error.message,
      });
    }
  };
  public loginUser = async (req: Request, res: Response) => {
    try {
      let result = await this.authService.loginUser(req.body);
      if (result) {
        let userToken = tokenService.assignToken(result);
        res.set("auth-token", userToken);
     
        return res.json(result);
      }

      return res.json({
        msg: "username or password is incorrect",
        login: false,
      });
    } catch (error: any) {
      return res.json({
        msg: " Couldnt log  user in",
        err: error.message,
      });
    }
  };
  public logoutUser = async (req: Request, res: Response) => {
    console.log(req.header("auth-token"));

    if (!req.header("auth-token")) {
      res.json({
        msg: "You are not logged in",
      });
    } else {
      res.removeHeader("auth-token");
      res.status(200).json({
        msg: "logout was successfull",
      });
    }
  };
  public loginWithAccessCode = async (req: Request, res: Response) => {
    try {
     
      let generatedAccessCode: number = Math.floor(
        100000 + Math.random() * 900000
      );
      console.log(generatedAccessCode);
      let result = await this.emailService.sendEmail(
        req.body.email,
        "Login To Dog House🐶",
        `Use this code to continue your login ${generatedAccessCode}`,
        "edetnoah@gmail.com"
      );
      res.json({
        msg: result,
      });
    } catch (error: any) {
      console.log(error.message);
      res.json({
        msg: "error sending message",
      });
    }
  };
  public verifyAccessCode = async (req: Request, res: Response) => {
   
  };
}

export { AuthController };
