import { IsNotEmpty } from "class-validator";

export class FAQDTO {
    @IsNotEmpty()
    readonly question_arm: string;

    @IsNotEmpty()
    readonly question_eng: string;

    @IsNotEmpty()
    readonly answer_arm: string;

    @IsNotEmpty()
    readonly answer_eng: string;

    @IsNotEmpty()
    readonly category: string;
}
