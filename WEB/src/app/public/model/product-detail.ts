import { UserDetail } from './user-detail';
import { LoginDetail } from './login-detail';

export class Activation {
    public productName: string;
    public productVersion: string;
    public activationDate: Date;
    public productStatus: string; 
    public expiryDate: Date;
    public license: string;
    public user:UserDetail;
    public login:LoginDetail;
}