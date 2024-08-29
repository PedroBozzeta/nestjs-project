import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export default class ProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10)
    precio?: number;
}