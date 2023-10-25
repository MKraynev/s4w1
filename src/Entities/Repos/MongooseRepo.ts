import { HydratedDocument, Model } from "mongoose";

export class MongooseRepo<ModelType, CreateDTO, EntityDocument extends HydratedDocument<ModelType>>{
  constructor(private model: Model<ModelType>) { }


  async Save(createDTO: CreateDTO | ModelType): Promise<EntityDocument> {
    const createEntity = await this.model.create(createDTO);
    return (await createEntity.save() as EntityDocument);
  }

  async FindById(id: string): Promise<EntityDocument | null> {
    return await this.model.findById(id);
  }

  async Find(sortBy: keyof (ModelType), sortDirection: "asc" | "desc", property?: keyof (ModelType), propertyValue?: string, skip: number = 0, limit: number = 10): Promise<EntityDocument[]> {
    let searchPattern = this.GetPattern(property, propertyValue);
    let sortPattern = this.GetPattern(sortBy, sortDirection);

    return await this.model.find(searchPattern).sort(sortPattern).skip(skip).limit(limit).exec() as EntityDocument[];
  }

  async Count(key?: keyof (ModelType), value?: string) {
    let searchPattern = this.GetPattern(key, value);

    return await this.model.count(searchPattern);
  }

  async Update(document: EntityDocument) {
    return (await document.save());
  }

  async DeleteById(id: string): Promise<EntityDocument> | null {
    let deletedDocument = await this.model.findByIdAndDelete(id) as EntityDocument;

    return deletedDocument || null;
  }

  async DeleteAll() {
    let del = await this.model.deleteMany();
    return del.acknowledged;
  }

  private GetPattern(key?: keyof (ModelType), value?: string) {
    let searchPattern: any = {};
    if (key && value)
      searchPattern[key] = value;

    return searchPattern;
  }
}