import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';



export class TodoDto {
   

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
   
    readonly description: string;

    @IsNotEmpty()
   
    readonly date: string;

   
}