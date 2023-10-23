import { ServiceDto } from "./blogs.serviceDto";

export class ControllerBlogDto {
    public id: string;
    public name: string;
    public description: string;
    public websiteUrl: string;
    public createdAt: Date;
    public isMembership: boolean;
    constructor(serviceBLog: ServiceDto) {
        this.id = serviceBLog.id;
        this.name = serviceBLog.name;
        this.description = serviceBLog.description;
        this.websiteUrl = serviceBLog.websiteUrl;
        this.createdAt = serviceBLog.createdAt;
        this.isMembership = serviceBLog.isMembership;
    }
}