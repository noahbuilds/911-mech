import { ILogin, IContractor } from "../datasource/interface/contractor";

import { ContractorService, tokenService } from "./index";
import bcrypt from "bcrypt";
import { injectable } from "tsyringe";
@injectable()
class AuthService {
  constructor(private readonly contractorService: ContractorService) {}
  public loginUser = async (reqBody: ILogin): Promise<IContractor | null> => {
    const { email, password } = reqBody;
    let foundUser = await this.contractorService.emailExists(email);

    if (foundUser != null) {
      let passwordMatch = await bcrypt.compare(password, foundUser?.password);
      if (passwordMatch) {
        tokenService.assignToken(foundUser);
        return foundUser;
      }
    }
    return null;
  };

  public logoutUser = async () => {};
}

export { AuthService };
