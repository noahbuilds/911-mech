import { IContractor } from '../interface/contractor';
import { Contractor } from '../models';

export class ContractorRepository {
    private readonly contractorDB = Contractor;

    public create = async (
        contractor: IContractor
    ): Promise<IContractor | null> => {
        const result = await this.contractorDB.create(contractor);
        return result;
    };
    public fetchContractors = async (): Promise<IContractor[] | []> => {
        const result = await this.contractorDB.find({});
        return result;
    };

    public fetchContractor = async (
        contractorId: string
    ): Promise<IContractor | null> => {
        const result = await this.contractorDB
            .findById({ contractorId })
            .exec();
        return result;
    };

    public update = async (
        contractorId: string,
        option: any
    ): Promise<IContractor | null> => {
        const result = await this.contractorDB.findByIdAndUpdate(
            { _id: contractorId },
            option
        );
        return result;
    };
    public delete = async (
        contractorId: string
    ): Promise<IContractor | null> => {
        const result = await this.contractorDB.findByIdAndDelete({
            _id: contractorId,
        });
        return result;
    };

    public findEmail = async (email: string): Promise<IContractor | null> => {
        const result = await this.contractorDB.findOne({ email });
        return result;
    };
}
