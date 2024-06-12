import SuccessResponse from "types/success";

export const Success = (success: boolean, message: string, data: any): SuccessResponse => {
    return {
        success,
        message,
        data,
    };
};
