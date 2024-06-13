import SuccessResponse from "types/success.interface";

export const Success = (success: boolean, message: string, data: any): SuccessResponse => {
    return {
        success,
        message,
        data,
    };
};
