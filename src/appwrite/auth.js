import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setProject(conf.appwriteProjectId);
        this.account = new Account(client);
    }

    async createAccountWithEmail({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount){
                this.loginWithEmail({email, password});
            } else {
                console.log('Something went wrong' + userAccount);
            }

        } catch(e){
            throw e;
        }
    }

    async loginWithEmail({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (e) {
            throw e;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (e) {
            throw e;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current');
        } catch (e) {
            throw e;
        }
    }
}

export default new AuthService();
