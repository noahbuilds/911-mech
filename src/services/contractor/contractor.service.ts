import { IContractor } from '../../datasource/interface/contractor';
import bcrypt from 'bcrypt';
import { EmailService } from '../email.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { injectable } from 'tsyringe';
import { ContractorRepository } from '../../datasource/repositories';

@injectable()
class ContractorService {
    constructor(
        private readonly emailService: EmailService,
        private readonly contractorRepo: ContractorRepository
    ) {}
    public createContractor = async (reqBody: IContractor) => {
        const { firstName, lastName, email, password, gender, location } =
            reqBody;

        const hashPassword = await bcrypt.hash(password, 10);
        reqBody.password = hashPassword;
        const result = this.contractorRepo.create(reqBody);
        return result;
    };

    public emailExists = async (email: string): Promise<IContractor | null> => {
        const result = await this.contractorRepo.findEmail(email);

        return result;
    };

    public getContractorById = async (
        contractorId: string
    ): Promise<IContractor | null> => {
        const result = await this.contractorRepo.fetchContractor(contractorId);
        return result;
    };
    public getContractors = async (
        option: any
    ): Promise<IContractor[] | null> => {
        const result = await this.contractorRepo.fetchContractors(option);
        return result;
    };

    public bookContractor = async (contractorId: string) => {
        const result = await this.contractorRepo.update(contractorId, {
            isAvailable: false,
        });
        return result;
    };
    public updateAvailablilityStatus = async (
        contractorId: string,
        status: boolean
    ) => {
        const result = await this.contractorRepo.update(contractorId, {
            isAvailable: status,
        });
        return result;
    };

    public updateContractorPhoneNumber = async (
        contractorId: string,
        phoneNumber: string
    ) => {
        const result = await this.contractorRepo.update(contractorId, {
            phoneNumber: phoneNumber,
        });
        return result;
    };
}
export { ContractorService };
