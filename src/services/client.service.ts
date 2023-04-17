import { IClient } from "../datasource/interface/client";
import bcrypt from "bcrypt";
import { EmailService } from "./email.service";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { injectable } from "tsyringe";
import { ClientRepository } from "../datasource/repositories";

@injectable()
class ClientService {
  constructor(
    private readonly emailService: EmailService,
    private readonly clientRepo: ClientRepository
  ) {}
  public async createClient(reqBody: IClient) {
    const { firstName, lastName, email, password, gender, location } = reqBody;

    let hashPassword = await bcrypt.hash(password, 10);
    reqBody.password = hashPassword;
    let result = this.clientRepo.create(reqBody);
    return result;
  }

  public async emailExists(email: string): Promise<IClient | null> {
    let result = await this.clientRepo.findEmail(email);

    return result;
  }

  public async getClientById(clientId: string): Promise<IClient | null> {
    let result = this.clientRepo.fetchClient(clientId);
    return result;
  }
  public async getClients(): Promise<IClient[] | null> {
    let result = this.clientRepo.fetchClients();
    return result;
  }

  // public async addUserDog(userId: string, dogId: string) {
  //   let result = this.clientRepo.update(userId, { $push: { dogs: dogId } });
  //   return result;
  // }
 
}
export { ClientService };
