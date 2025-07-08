import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateArticleDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({message : 'Tiêu đề không thể là chuỗi rỗng!'})
    title : string 

    @IsOptional()
    @IsString()
    description : string

    @IsOptional()
    @IsString()
    body: string

}
