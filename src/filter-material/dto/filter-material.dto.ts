import { IsNotEmpty } from "class-validator";

export class FilterMaterialDTO {
    @IsNotEmpty()
    readonly name_arm: string;

    @IsNotEmpty()
    readonly name_eng: string;
}
