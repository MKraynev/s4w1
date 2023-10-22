import { Injectable } from "@nestjs/common";
import { MongooseRepo } from "../../../Entities/Repos/MongooseRepo";
import { BlogsRepoService } from "../../../Entities/Repos/BlogsRepo/blogsRepo.service";

@Injectable()
export class TestService{
    constructor(
        private blogsRepo: BlogsRepoService,
        ) {
        
    }
    public async DeleteAll(){
        let del = await this.blogsRepo.DeleteAll();
        return del;
    }
}