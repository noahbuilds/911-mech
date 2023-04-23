import { Request, Response } from 'express';
import { ContractorService } from '../../services/contractor/contractor.service';
import { injectable } from 'tsyringe';

@injectable()
class ContractorController {
    constructor(private readonly contractorService: ContractorService) {}
    public getContractors = async (req: any, res: Response) => {
        // let users = await User.find({});
        // return res.json({
        //   user: users,
        // });

        try {
            const result = await this.contractorService.getContractors({});
            return res.json({ result: result });
        } catch (error: any) {
            return res.json({
                msg: ' Couldnt get users',
                err: error.message,
            });
        }
    };
    public getContractorById = async (req: Request, res: Response) => {
        const contractorId: string = req.params.contractorId;
        try {
            const result = await this.contractorService.getContractorById(
                contractorId
            );
            res.json({
                result,
            });
        } catch (error: any) {
            return res.json({
                msg: ' Couldnt get user',
                err: error.message,
            });
        }
    };

    public updateAvailablilityStatus = async (req: Request, res: Response) => {
        try {
            const result =
                await this.contractorService.updateAvailablilityStatus(
                    req.params.contractorId,
                    req.params.status as unknown as boolean
                );
            return res.json({
                result,
            });
        } catch (error: any) {
            throw new Error(error);
        }
    };
}

export { ContractorController };
