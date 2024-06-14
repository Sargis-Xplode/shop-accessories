import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ContactModel } from "./contact.model";
import { ContactDTO } from "./dto/contact.dto";
import { Pagination, PaginationModel } from "mongoose-paginate-ts";
import SuccessResponse from "types/success.interface";
import Success from "utils/success-response";
import { contactUSEmail } from "src/emails/aws-ses";

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(ContactModel.name)
        private readonly contactModel: Pagination<ContactModel>
    ) {}

    // async create(contactData: ContactDTO): Promise<SuccessResponse> {
    //     const createdContact = new this.contactModel(contactData);

    //     await createdContact.save();

    //     let data = await contactUSEmail(contactData);

    //     return Success();
    // }

    // async findAll(page: number, term: string, orderBy: string, orderType: string): Promise<PaginationModel<Contact>> {
    //     let query = {};

    //     if (term !== "") {
    //         query = {
    //             $or: [
    //                 {
    //                     first_name: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //                 {
    //                     last_name: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //                 {
    //                     email: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //                 {
    //                     phone_number: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //                 {
    //                     subject: {
    //                         $regex: term,
    //                         $options: "i",
    //                     },
    //                 },
    //             ],
    //         };
    //     }

    //     let sort = {};

    //     if (orderBy === "createdAt") {
    //         sort[orderBy] = orderType === "desc" ? -1 : 1;
    //     }

    //     return await this.contactModel.paginate({
    //         limit: 10,
    //         page,
    //         query,
    //         sort,
    //     });
    // }

    async delete(id: string): Promise<SuccessResponse> {
        await this.contactModel.findByIdAndDelete(id).exec();
        return Success(true, "Successfully deleted", null);
    }
}
