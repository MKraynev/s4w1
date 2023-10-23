import { Blog } from "../BlogsRepo/Schemas/blog.schema";

//TODO какой нейминг для такой сущности
export type ServiceDto<T> = T & {id: string};