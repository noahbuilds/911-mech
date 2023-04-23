import { Request, Response } from 'express';
import { ClientService, ContractorService } from '../../services';
import { injectable } from 'tsyringe';
import { IClient } from '../../datasource/interface/client';
import { ApiError } from '../../utilities/apiError';

@injectable()
class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private readonly contractorService: ContractorService
    ) {}

    public registerClient = async (req: Request, res: Response) => {
        try {
            const emailExists = await this.clientService.emailExists(
                req.body.email
            );
            if (emailExists) {
                return res.json({
                    msg: 'Email exists already',
                });
            }

            const result = await this.clientService.createClient(req.body);
            return res.json({ client: result });
        } catch (error: any) {
            throw new Error(error);
        }
    };
    public getClients = async (req: any, res: Response) => {
        // let users = await User.find({});
        // return res.json({
        //   user: users,
        // });

        try {
            const result = await this.clientService.getClients();
            // console.log(result);
            return res.json(result);
        } catch (error: any) {
            // console.log(error)
            return res.json({
                msg: ' Couldnt get clients',
                err: error.message,
            });
        }
    };

    public getClientById = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        try {
            const result = await this.clientService.getClientById(id);
            res.json({
                result,
            });
        } catch (error: any) {
            return res.json({
                msg: ' Couldnt get client',
                err: error.message,
            });
        }
    };

    public requestService = async (req: Request, res: Response) => {
        try {
            const location: string = req.body.location;
            const service: string = req.body.service;
            const option = {
                'service.name': service,
                location: location,
                isAvailable: true,
            };
            const result = await this.clientService.requestService(option);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    };

    public bookContractor = async (req: Request, res: Response) => {
        try {
            const result = await this.clientService.bookService(
                req.params.contractorId
            );
            return res.json(result);
        } catch (error) {}
    };
}

export { ClientController };
