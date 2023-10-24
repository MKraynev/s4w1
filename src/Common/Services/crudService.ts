import { HydratedDocument } from "mongoose";
import { MongooseRepo } from "../../Entities/Repos/MongooseRepo";
import { ServiceExecutionResult } from "./Types/ServiseExecutionResult";
import { ServiceExecutionResultStatus } from "./Types/ServiceExecutionStatus";
import { ServiceDto } from "./Types/ServiceDto";

export class CrudService<
    CreateAndUpdateEntityDto,
    EntityType extends CreateAndUpdateEntityDto,
    EntityDocument extends HydratedDocument<EntityType>,
    Repo extends MongooseRepo<EntityType, CreateAndUpdateEntityDto, EntityDocument>>
{
    constructor(private repo: Repo) { }


    public async Take(searchBy?: keyof (EntityType), searchValue?: string, skip: number = 0, limit: number = 10) {
        let count = await this.repo.Count(searchBy, searchValue);
        skip = count > skip? skip: 0;

        let items = await this.repo.Find(searchBy, searchValue, skip, limit);
        let formatedItems = items.map(item => item.toObject()) as ServiceDto<EntityType>[]; 

        let result = {
            count: count,
            items: formatedItems
        }
        return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, result)
    }

    public async TakeById(id: string): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceDto<EntityType>>> {
        let item = await this.repo.FindById(id);
        if (item)
            return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, item.toObject())

        return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound)
    }

    public async Update(id: string, newEntityData: CreateAndUpdateEntityDto): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceDto<EntityType>>> {
        let blog = await this.repo.FindById(id);

        if (!blog)
            return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound);

        Object.assign(blog, newEntityData);

        let savedBlog = await this.repo.Save(blog);
        return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, savedBlog.toObject())
    }

    public async Delete(id: string): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceDto<EntityType>>> {
        let deleteBlog = await this.repo.DeleteById(id)

        if (deleteBlog)
            return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, deleteBlog.toObject());

        return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound);
    }

    public async Save(entity: CreateAndUpdateEntityDto): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceDto<EntityType>>> {
        let savedEntity = await this.repo.Save(entity);

        return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, savedEntity.toObject())
    }

    // private async Count(key: keyof (EntityType), value: string): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, number>> {
    //     let countRes = await this.repo.Count(key, value);

    //     return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, countRes)
    // }

    // private async Find(property?: keyof (EntityType), propertyValue?: string, skip?: number, limit?: number): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceDto<EntityType>[]>> {
    //     let objects = (await this.repo.Find(property, propertyValue, skip, limit)).map(entityObj => entityObj.toObject()) as ServiceDto<EntityType>[];

    //     return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, objects)
    // }
}