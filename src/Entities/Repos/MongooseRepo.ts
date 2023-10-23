import mongoose, { Connection, HydratedDocument, Model } from "mongoose";

export class MongooseRepo<ModelType, CreateDTO, EntityDocument extends HydratedDocument<ModelType>>{
  constructor(private model: Model<ModelType>) { }


  async save(createDTO: CreateDTO): Promise<EntityDocument> {
    const createEntity = new this.model(createDTO);
    return (await createEntity.save() as EntityDocument);
  }

  async findById(id: string): Promise<EntityDocument | null> {
    return await this.model.findById(id);
  }

  async find(searchNameTerm?: string, skip: number = 0, limit: number = 10): Promise<EntityDocument[]> {
    let searchPattern = searchNameTerm ? { name: searchNameTerm } : {};
    return await this.model.find(searchPattern).skip(skip).limit(limit) as EntityDocument[];
  }
  async update(document: EntityDocument) {
    return (await document.save());
  }

  async count(key: keyof (ModelType), value?: string) {
    let searchPattern: any = {};
    if (value)
      searchPattern.key = value;

    return await this.model.count(searchPattern);
  }

  async deleteById(id: string): Promise<EntityDocument> | null {
    let deletedDocument = await this.model.findByIdAndDelete(id) as EntityDocument;

    return deletedDocument || null;
  }

  async DeleteAll() {
    let del = await this.model.deleteMany();
    return del.acknowledged;
  }
}