import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    title : string

    @IsNotEmpty()
    @IsString()
    description : string

    @IsString()
    @IsNotEmpty()
    body : string

    @IsArray()
    @IsString({each : true})
    tagList? : string[]

}
