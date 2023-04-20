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
            const result = await this.contractorService.getContractors();
            return res.json(result);
        } catch (error: any) {
            return res.json({
                msg: ' Couldnt get users',
                err: error.message,
            });
        }
    };
    public getContractorById = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        try {
            const result = await this.contractorService.getContractorById(id);
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
}

export { ContractorController };
