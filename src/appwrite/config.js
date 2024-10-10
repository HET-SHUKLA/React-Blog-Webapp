import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from '../conf/conf';

class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //Post related services
    
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    status,
                    userId,
                }
            )
        }catch(e){
            console.log(`Appwrie Service :: Create Post :: ${e}`);
        }
    }

    async updatePost(slug, {content, status, featuredImage}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    content,
                    status,
                    featuredImage,
                }
            )
        }catch(e){
            console.log(`AppWrie Service :: Update Post :: ${e}`);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true;
        }catch(e){
            console.log(`Appwrite Service :: Delete Post :: ${e}`);

            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(e){
            console.log(`Appwrite Service :: Search Post :: ${e}`);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (e) {
            console.log(`Appwrite Service :: Get All Posts :: ${e}`);
            return false;
        }
    }

    //File related services

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }catch(e){
            console.log(`Appwrite Service :: Upload File :: ${e}`);
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )

            return true;
        }catch(e){
            console.log(`Appwrite Service :: Delete File :: ${e}`);
            return false;
        }   
    }

    getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        }catch(e){
            console.log(`Appwrite Service :: Preview File :: ${e}`);
        }   
    }
}

export default new Service();