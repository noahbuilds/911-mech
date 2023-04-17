import { IClient } from '../interface/client';
import { Client } from '../models';

export class ClientRepository {
    private readonly clientDB = Client;

    public create = async (client: IClient): Promise<IClient | null> => {
        let result = await this.clientDB.create(client);
        return result;
    };
    public fetchClients = async (): Promise<IClient[] | []> => {
        let result = await this.clientDB.find({});
        // console.log(result)
        return result;
    };

    public fetchClient = async (clientId: string): Promise<IClient | null> => {
        let result = await this.clientDB.findById({ clientId }).exec();
        return result;
    };

    public update = async (
        userId: string,
        option: any
    ): Promise<IClient | null> => {
        let result = await this.clientDB.findByIdAndUpdate(
            { _id: userId },
            option
        );
        return result;
    };
    public delete = async (clientId: string): Promise<IClient | null> => {
        let result = await this.clientDB.findByIdAndDelete({ _id: clientId });
        return result;
    };

    public findEmail = async (email: string): Promise<IClient | null> => {
        let result = await this.clientDB.findOne({ email });
        return result;
    };
}
