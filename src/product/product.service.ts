import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import SuccessResponse from "types/success.interface";
import { Pagination } from "mongoose-paginate-ts";
import Success from "../../utils/success-response";
import { ProductModel } from "./product.model";
import { ProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductModel.name)
        private readonly productModel: Pagination<ProductModel>
    ) {}

    async getProducts(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const data = await this.productModel.paginate({
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });
            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async getSingleProduct(id: string): Promise<SuccessResponse> {
        try {
            const product = await this.productModel
                .findById(id)
                .populate({ path: "filter_categories.category_id", model: "CategoriesModel" })
                .populate({ path: "filter_categories.subcategories", model: "SubCategoryModel" })
                .populate({ path: "collection_id", model: "Collections" })
                .populate({ path: "filter_styles", model: "FilterStyleModel" })
                .populate({ path: "filter_materials", model: "FilterMaterialModel" })
                .populate({ path: "filter_occasions", model: "FilterOccasionModel" })
                .exec();
            return Success(true, "Successful", product);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }

    async getSeasonalProducts(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const query: any = {
                in_stock: { $gt: 0 },
                seasonal: true,
            };

            const data = await this.productModel.paginate({
                query,
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });
            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async getFeaturedProducts(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const query = {
                collection_id: {
                    $exists: true,
                },
                in_stock: { $gt: 0 },
            };

            const data = await this.productModel.paginate({
                query,
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });
            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async getNewArrivalProducts(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const query = {
                in_stock: { $gt: 0 },
            };

            const data = await this.productModel.paginate({
                query,
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });
            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async getSimilarProducts(
        page: number,
        limit: number,
        id: string,
        collection_id: string,
        category_id: string
    ): Promise<SuccessResponse> {
        let query = {
            $and: [
                { _id: { $ne: id } },
                {
                    $or: [{ collection_id: collection_id }, { category_id: category_id }],
                },
            ],
        };

        try {
            const data = await this.productModel.paginate({
                query,
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });
            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async getBestSellerProducts(page: number, limit: number, active: string): Promise<SuccessResponse> {
        // try {
        //     const query: any = {};
        //     query.seasonal = active === "true";
        //     const data = await this.productModel.paginate({
        //         query,
        //         limit,
        //         page,
        //         sort: {
        //             createdAt: -1,
        //         },
        //     });
        //     return Success(true, "Successful", data);
        // } catch (err) {
        //     return Success(false, "Unsuccessful", null);
        // }
        return Success(false, "This function is not ready yet", null);
    }

    async searchProducts(
        page: number,
        limit: number,
        category_id: string,
        collection_id: string,
        subcategories: string[],
        materials: string[],
        styles: string[],
        occasions: string[],
        sale: boolean,
        min_price: number,
        max_price: number,
        sort_by: string,
        sort_type: string,
        search_term: string,
        in_stock: boolean,
        active: boolean,
        lang: string
    ): Promise<SuccessResponse> {
        const query: any = {};

        if (active) {
            query.seasonal = true;
        }

        if (in_stock) {
            query.in_stock = { $gt: 0 };
        }

        if (category_id) {
            query["filter_categories.category_id"] = category_id;

            if (subcategories.length) {
                query["filter_categories.subcategories"] = { $in: subcategories }; // Doesn't work correctly
            }
        }

        if (collection_id) {
            query["collection_id"] = collection_id;
        }

        if (materials.length) {
            query.filter_materials = { $in: materials }; // Doesn't work correctly
        }

        if (styles.length) {
            query.filter_styles = { $in: styles }; // Doesn't work correctly
        }

        if (occasions.length) {
            query.filter_occasions = { $in: occasions }; // Doesn't work correctly
        }

        if (sale) {
            query.sale = { $gt: 0 };
        }

        if (min_price !== undefined && min_price !== null) {
            query.price = { $gte: min_price };
        }

        if (max_price !== undefined && max_price !== null) {
            if (!query.price) {
                query.price = {};
            }
            query.price.$lte = max_price;
        }

        if (search_term.length) {
            query.$or = [
                { name_eng: { $regex: search_term, $options: "i" } },
                { name_arm: { $regex: search_term, $options: "i" } },
                { description_eng: { $regex: search_term, $options: "i" } },
                { description_arm: { $regex: search_term, $options: "i" } },
            ];
        }

        let sortQuerry: any = {};

        switch (sort_by) {
            case "name":
                if (lang === "hy") {
                    sortQuerry = {
                        name_arm: sort_type === "asc" ? 1 : -1,
                    };
                } else {
                    sortQuerry = {
                        name_eng: sort_type === "asc" ? 1 : -1,
                    };
                }

                break;
            case "price":
                sortQuerry = {
                    price: sort_type === "asc" ? 1 : -1,
                };
                break;

            case "in_stock":
                sortQuerry = {
                    in_stock: sort_type === "asc" ? 1 : -1,
                };
                break;
            case "sale":
                sortQuerry = {
                    sale: sort_type === "asc" ? 1 : -1,
                };
                break;
            case "date":
                sortQuerry = {
                    createdAt: sort_type === "asc" ? 1 : -1,
                };
                break;
            default:
                sortQuerry = {
                    createdAt: sort_type === "asc" ? 1 : -1,
                };
        }

        // const aggregate = [
        //     {
        //         $addFields: {
        //             sortable_name_arm: { $toLower: "$name_arm" },
        //             sortable_name_eng: { $toLower: "$name_eng" },
        //         },
        //     },
        // ];

        try {
            let data = await this.productModel.paginate({
                query,
                limit,
                page,
                sort: sortQuerry,
                // aggregate,
                populate: [
                    { path: "filter_categories.category_id", model: "CategoriesModel" },
                    { path: "filter_categories.subcategories", model: "SubCategoryModel" },
                    { path: "collection_id", model: "Collections" },
                    { path: "filter_styles", model: "FilterStyleModel" },
                    { path: "filter_materials", model: "FilterMaterialModel" },
                    { path: "filter_occasions", model: "FilterOccasionModel" },
                ],
            });

            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async createProduct(body: ProductDTO): Promise<SuccessResponse> {
        const {
            name_arm,
            name_eng,
            description_arm,
            description_eng,
            price,
            sale,
            in_stock,
            collection_id,
            extra_info,
            filter_categories,
            filter_materials,
            filter_styles,
            filter_occasions,
            colors_and_images,
        } = body;

        try {
            const product = await this.productModel.create({
                name_arm,
                name_eng,
                description_arm,
                description_eng,
                price,
                sale,
                in_stock,
                collection_id: collection_id ?? null,
                extra_info,
                filter_categories,
                filter_materials,
                filter_styles,
                filter_occasions,
                colors_and_images,
                seasonal: false,
            });

            return Success(true, "Successfully created", product);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateProduct(id: string, body: ProductDTO): Promise<SuccessResponse> {
        const {
            name_arm,
            name_eng,
            description_arm,
            description_eng,
            price,
            sale,
            in_stock,
            collection_id,
            extra_info,
            filter_categories,
            filter_materials,
            filter_styles,
            filter_occasions,
            colors_and_images,
        } = body;

        const product = await this.productModel.findById(id);
        if (product) {
            product.name_arm = name_arm;
            product.name_eng = name_eng;
            product.description_arm = description_arm;
            product.description_eng = description_eng;
            product.price = price;
            product.sale = sale;
            product.in_stock = in_stock;
            product.collection_id = collection_id;
            product.extra_info = extra_info;
            product.filter_categories = filter_categories;
            product.filter_materials = filter_materials;
            product.filter_styles = filter_styles;
            product.filter_occasions = filter_occasions;
            product.colors_and_images = colors_and_images;

            await product.save();
            return Success(true, "Successfully updated", product);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async toggleProductActive(id: string, active: string): Promise<SuccessResponse> {
        try {
            const product = await this.productModel.findById(id);
            product.seasonal = active === "true";
            await product.save();

            return Success(true, `Successfully ${active === "true" ? "activated" : "deactivated"}`, {
                active: product.seasonal,
            });
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }

    async deleteProduct(id: string): Promise<SuccessResponse> {
        try {
            await this.productModel.findByIdAndDelete(id); // TO DO deletedAt
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
