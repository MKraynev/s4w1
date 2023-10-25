import { Module } from "@nestjs/common";
import { LikesRepoModule } from "./LikesRepo/likesRepo.module";
import { LikeService } from "./likes.service";

@Module({
    imports: [LikesRepoModule],
    providers: [LikeService]
})
export class LikesModule{}