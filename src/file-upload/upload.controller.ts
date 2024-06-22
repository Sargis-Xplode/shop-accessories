import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("file")
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post("upload")
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.uploadService.uploadFile(file);
    }
}
