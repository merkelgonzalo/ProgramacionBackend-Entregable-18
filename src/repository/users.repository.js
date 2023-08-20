import { CreateUserDto, GetUserDto } from "../dao/dto/user.dto.js";

export class UserRepository{
    
    constructor(dao){
        this.dao = dao;
    }

    async getUsers(){
        const users = await this.dao.get()
        return users;
    }

    async createUser(user){
        const userDto = new CreateUserDto(user)
        const userCreated = await this.dao.post(userDto);
        return userCreated;
    }

    async getMailByCart(cid){
        const user = await this.dao.getByCart(cid);
        const email = user.email;
        return email;
    }

    async getById(uid){
        const user = await this.dao.getById(uid);
        return user;
    }

    async update(uid, user){
        const result = await this.dao.put(uid, user);
        return user;
    }
    
}