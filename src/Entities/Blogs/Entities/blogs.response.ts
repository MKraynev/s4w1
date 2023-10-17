import { Blog } from "src/Entities/Repos/BlogsRepo/Schemas/blog.schema";

//TODO какой нейминг для такой сущности
export class BlogResponse {

    public id: string;
    public name: string;
    public description: string;
    public websiteUrl: string;
    public createdAt: Date;
    public isMembership: boolean;

    constructor(blogData: Blog & { id: string }) {
        this.id = blogData.id;
        this.name = blogData.name;
        this.description = blogData.description;
        this.websiteUrl = blogData.websiteUrl;
        this.createdAt = blogData.createdAt;
        this.isMembership = blogData.isMembership;

    }
}