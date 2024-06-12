import { IsNotEmpty } from "class-validator";

export class CollectionsDTO {
    @IsNotEmpty()
    readonly name_arm: string;

    @IsNotEmpty()
    readonly name_eng: string;

    @IsNotEmpty()
    readonly image: string;
}
