import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { AboutModule } from "./about/about.module";
import { TermsModule } from "./terms/terms.module";
import { PrivacyModule } from "./privacy/privacy.module";

require("dotenv").config();

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule, AboutModule, TermsModule, PrivacyModule],
})
export class AppModule {}
