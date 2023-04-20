import { ILogin, IClient } from '../../datasource/interface/client';

import { ClientService, tokenService } from '../index';
import bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';
@injectable()
class ClientAuthService {
    constructor(private readonly clientService: ClientService) {}
    public loginUser = async (reqBody: ILogin): Promise<IClient | null> => {
        const { email, password } = reqBody;
        const foundUser = await this.clientService.emailExists(email);

        if (foundUser != null) {
            const passwordMatch = await bcrypt.compare(
                password,
                foundUser?.password
            );
            if (passwordMatch) {
                tokenService.assignToken(foundUser);
                return foundUser;
            }
        }
        return null;
    };

    // public logoutUser = async () => {};
}

export { ClientAuthService };
