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
    public fetchContractors = async (
        option: any
    ): Promise<IContractor[] | []> => {
        // console.log();

        const result = await this.contractorDB.find(option);
        // console.log(result);
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
