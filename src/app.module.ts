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
import { FilterMaterialModule } from "./filter-material/filter-material.module";
import { FilterOccasionModule } from "./filter-occasion/filter-occasion.module";
import { FilterStyleModule } from "./filter-style/filter-style.module";
import { ProductModule } from "./product/product.module";
import { FileUploadModule } from "./file-upload/upload.module";
import { OrdersModule } from "./orders/orders.module";
import { FAQTabModule } from "./faq-tab/faq-tab.module";

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
        FAQTabModule,
        CollectionsModule,
        CategoriesModule,
        FilterMaterialModule,
        FilterOccasionModule,
        FilterStyleModule,
        ProductModule,
        FileUploadModule,
        OrdersModule,
    ],
})
export class AppModule {}
