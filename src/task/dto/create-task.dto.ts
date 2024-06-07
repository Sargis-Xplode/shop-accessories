import { IsNotEmpty, MinLength } from "class-validator";

export class CreateTaskDTO {
    @IsNotEmpty()
    @MinLength(2)
    readonly name: string;

    @IsNotEmpty()
    @MinLength(2)
    readonly task: string;

    readonly done: boolean;
}
