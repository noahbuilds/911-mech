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
    public async createContractor(reqBody: IContractor) {
        const { firstName, lastName, email, password, gender, location } =
            reqBody;

        let hashPassword = await bcrypt.hash(password, 10);
        reqBody.password = hashPassword;
        let result = this.contractorRepo.create(reqBody);
        return result;
    }

    public async emailExists(email: string): Promise<IContractor | null> {
        let result = await this.contractorRepo.findEmail(email);

        return result;
    }

    public async getContractorById(
        contractorId: string
    ): Promise<IContractor | null> {
        let result = this.contractorRepo.fetchContractor(contractorId);
        return result;
    }
    public async getContractors(): Promise<IContractor[] | null> {
        let result = this.contractorRepo.fetchContractors();
        return result;
    }
}
export { ContractorService };
