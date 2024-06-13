import SuccessResponse from "types/success.interface";

const Success = (success: boolean, message: string, data: any): SuccessResponse => {
    return {
        success,
        message,
        data,
    };
};

export default Success;
