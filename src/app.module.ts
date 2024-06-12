import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { AboutModule } from "./about/about.module";
import { TermsModule } from "./terms/terms.module";
import { PrivacyModule } from "./privacy/privacy.module";
import { ContactUsInfoModule } from "./contact-us-info/contact-us-info.module";
import { FAQModule } from "./faq/faq.module";
import { CollectionsModule } from "./collections/collections.module";
import { CategoriesModule } from "./categories/categories.module";

require("dotenv").config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI),
        AuthModule,
        AboutModule,
        TermsModule,
        PrivacyModule,
        ContactUsInfoModule,
        FAQModule,
        CollectionsModule,
        CategoriesModule,
    ],
})
export class AppModule {}
