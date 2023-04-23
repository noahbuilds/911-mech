import { IClient } from '../../datasource/interface/client';
import bcrypt from 'bcrypt';
import { EmailService } from '../email.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { injectable } from 'tsyringe';
import { ClientRepository } from '../../datasource/repositories';
import { ContractorService } from '../index';

@injectable()
class ClientService {
    constructor(
        private readonly emailService: EmailService,
        private readonly clientRepo: ClientRepository,
        private readonly contractorService: ContractorService
    ) {}
    public createClient = async (reqBody: IClient) => {
        const { firstName, lastName, email, password, gender, location } =
            reqBody;

        const hashPassword = await bcrypt.hash(password, 10);
        reqBody.password = hashPassword;
        const result = await this.clientRepo.create(reqBody);
        return result;
    };

    public emailExists = async (email: string): Promise<IClient | null> => {
        const result = await this.clientRepo.findEmail(email);

        return result;
    };

    public getClientById = async (
        clientId: string
    ): Promise<IClient | null> => {
        const result = await this.clientRepo.fetchClient(clientId);
        return result;
    };
    public getClients = async (): Promise<IClient[] | null> => {
        const result = await this.clientRepo.fetchClients();
        return result;
    };

    public requestService = async (option: any) => {
        const availableContractors =
            await this.contractorService.getContractors(option);
        return availableContractors;
    };

    public bookService = async (contractorId: string) => {
        const bookStatus = await this.contractorService.bookContractor(
            contractorId
        );
        return bookStatus;
    };
}
export { ClientService };
