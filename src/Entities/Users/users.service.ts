import { Injectable } from "@nestjs/common";
import { CrudService } from "../../Common/Services/crudService";
import { CreateUserDto } from "./UsersRepo/Dtos/CreateUserDto";
import { UserDocument, UserDto } from "./UsersRepo/Schema/user.schema";
import { UsersRepoService } from "./UsersRepo/usersRepo.service";

@Injectable()
export class UserService extends CrudService<CreateUserDto, UserDto, UserDocument, UsersRepoService>{
    constructor(private usersRepo: UsersRepoService) {
        super(usersRepo);
    }
}