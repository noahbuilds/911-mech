import { Request, Response } from 'express';
import { ClientService } from '../services';
import { injectable } from 'tsyringe';

@injectable()
class ClientController {
    constructor(private readonly clientService: ClientService) {}
    public async getClients(req: any, res: Response) {
        // let users = await User.find({});
        // return res.json({
        //   user: users,
        // });

        try {
            let result = await this.clientService.getClients();
            return res.json(result);
        } catch (error: any) {
            return res.json({
                msg: ' Couldnt get clients',
                err: error.message,
            });
        }
    }
    public async getClientById(req: Request, res: Response) {
        let id: string = req.params.id;
        try {
            let result = await this.clientService.getClientById(id);
            res.json({
                result,
            });
        } catch (error: any) {
            return res.json({
                msg: ' Couldnt get client',
                err: error.message,
            });
        }
    }
}

export { ClientController };
