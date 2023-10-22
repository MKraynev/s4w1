import { Module } from '@nestjs/common';
import { TestController } from './testing.controller';
import { TestService } from './testing.service';
import { BlogsRepoModule } from '../../../Entities/Repos/BlogsRepo/blogsRepo.module';


@Module({
    imports: [BlogsRepoModule],
  controllers: [TestController],
    providers: [TestService],
})
export class TestModule { }