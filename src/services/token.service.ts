import jwt from 'jsonwebtoken';
import configuration from '../configs/configs';

const tokenService = {
    assignToken: (user: any): string => {
        // try {

        // } catch (error) {

        // }
        let token: string;
        return (token = jwt.sign(
            { userId: user.id, email: user.email },
            configuration.JWT_SECRET as string,
            {
                expiresIn: '1h',
            }
        ));
    },

    // verifyToken : ()=>{
    //     jwt.verify()
    // }
};

export { tokenService };
