import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { In } from "typeorm";
import { Product } from "../entity/Product";

@InputType()
class ProductInput {
  @Field()
  name!: string;

  @Field()
  quantity!: number;
}

@InputType()
class ProductUpdateInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  async createProduct(
    @Arg("options", () => ProductInput) options: ProductInput
  ) {
    const newProduct = Product.create(options);
    console.log(newProduct);
    return await newProduct.save();
  }

  @Query(() => [Product])
  async getProducts() {
    return await Product.find();
  }

  @Query(() => Product)
  async getProduct(@Arg("id", () => Int) id: number) {
    return await Product.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id", () => Int) id: number) {
    await Product.delete(id);
    return true;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id", () => Int)
    id: number,

    @Arg("fields", () => ProductUpdateInput)
    fields: ProductUpdateInput
  ) {
    await Product.update({ id }, fields);

    return await Product.findOne(id);
  }
}
