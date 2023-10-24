import { HydratedDocument, Model } from "mongoose";

export class MongooseRepo<ModelType, CreateDTO, EntityDocument extends HydratedDocument<ModelType>>{
  constructor(private model: Model<ModelType>) { }


  async Save(createDTO: CreateDTO | ModelType): Promise<EntityDocument> {
    const createEntity = new this.model(createDTO);
    return (await createEntity.save() as EntityDocument);
  }

  async FindById(id: string): Promise<EntityDocument | null> {
    return await this.model.findById(id);
  }

  async Find(property?: keyof (ModelType), propertyValue?: string, skip: number = 0, limit: number = 10): Promise<EntityDocument[]> {
    let searchPattern: any = {};
    if (property && propertyValue)
      searchPattern.property = propertyValue;

    return await this.model.find(searchPattern).skip(skip).limit(limit) as EntityDocument[];
  }
  async Update(document: EntityDocument) {
    return (await document.save());
  }

  async Count(key: keyof (ModelType), value?: string) {
    let searchPattern: any = {};
    if (value)
      searchPattern.key = value;

    return await this.model.count(searchPattern);
  }

  async DeleteById(id: string): Promise<EntityDocument> | null {
    let deletedDocument = await this.model.findByIdAndDelete(id) as EntityDocument;

    return deletedDocument || null;
  }

  async DeleteAll() {
    let del = await this.model.deleteMany();
    return del.acknowledged;
  }
}