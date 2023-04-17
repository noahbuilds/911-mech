import { IContractor } from '../datasource/interface/contractor';
import bcrypt from 'bcrypt';
import { EmailService } from './email.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { injectable } from 'tsyringe';
import { ContractorRepository } from '../datasource/repositories';

@injectable()
class ContractorService {
    constructor(
        private readonly emailService: EmailService,
        private readonly contractorRepo: ContractorRepository
    ) {}
    public createContractor = async (reqBody: IContractor) => {
        const { firstName, lastName, email, password, gender, location } =
            reqBody;

        let hashPassword = await bcrypt.hash(password, 10);
        reqBody.password = hashPassword;
        let result = this.contractorRepo.create(reqBody);
        return result;
    };

    public emailExists = async (email: string): Promise<IContractor | null> => {
        let result = await this.contractorRepo.findEmail(email);

        return result;
    };

    public getContractorById = async (
        contractorId: string
    ): Promise<IContractor | null> => {
        let result = this.contractorRepo.fetchContractor(contractorId);
        return result;
    };
    public getContractors = async (): Promise<IContractor[] | null> => {
        let result = this.contractorRepo.fetchContractors();
        return result;
    };
}
export { ContractorService };
