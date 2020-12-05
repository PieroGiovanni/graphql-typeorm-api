import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Product } from "../entity/Product";

@Resolver()
export class ProductResolver {
  @Mutation(() => Boolean)
  async createProduct(
    @Arg("name") name: string,
    @Arg("quantity") quantity: number
  ) {
    await Product.insert({ name, quantity });
    return true;
  }
}
