import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
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
            console.log(`Appwrite Service :: Create Accout :: ${e}`);
            
        }
    }

    async loginWithEmail({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (e) {
            console.log(`Appwrite Service :: Login Error :: ${e}`);
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (e) {
            console.log(`Appwrite Service :: Get Current User Error :: ${e}`);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current');
        } catch (e) {
            console.log(`Appwrite Service :: Logout Error :: ${e}`);
        }
    }
}

export default new AuthService();
