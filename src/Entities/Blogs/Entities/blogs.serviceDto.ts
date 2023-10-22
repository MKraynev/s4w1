import { Blog } from "../../Repos/BlogsRepo/Schemas/blog.schema";

//TODO какой нейминг для такой сущности
export type ServiceBlogDto = Blog & {id: string};