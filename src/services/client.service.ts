import { IClient } from '../datasource/interface/client';
import bcrypt from 'bcrypt';
import { EmailService } from './email.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { injectable } from 'tsyringe';
import { ClientRepository } from '../datasource/repositories';

@injectable()
class ClientService {
    constructor(
        private readonly emailService: EmailService,
        private readonly clientRepo: ClientRepository
    ) {}
    public createClient = async (reqBody: IClient) => {
        const { firstName, lastName, email, password, gender, location } =
            reqBody;

        let hashPassword = await bcrypt.hash(password, 10);
        reqBody.password = hashPassword;
        let result = this.clientRepo.create(reqBody);
        return result;
    };

    public emailExists = async (email: string): Promise<IClient | null> => {
        let result = await this.clientRepo.findEmail(email);

        return result;
    };

    public getClientById = async (
        clientId: string
    ): Promise<IClient | null> => {
        let result = await this.clientRepo.fetchClient(clientId);
        return result;
    };
    public getClients = async (): Promise<IClient[] | null> => {
        let result = await this.clientRepo.fetchClients();
        return result;
    };

    // public async addUserDog(userId: string, dogId: string) {
    //   let result = this.clientRepo.update(userId, { $push: { dogs: dogId } });
    //   return result;
    // }
}
export { ClientService };
