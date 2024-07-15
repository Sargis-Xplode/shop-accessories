import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

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
    readonly tab_id: Types.ObjectId;
}
