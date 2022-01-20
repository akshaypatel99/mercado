import { userQueries, userMutations } from "./user";
import { productQueries, productMutations } from "./product";
import { orderQueries, orderMutations } from "./order";

const resolvers = {
  Query: {
    ...userQueries,
    ...productQueries,
    ...orderQueries
  },
  Mutation: {
    ...userMutations,
    ...productMutations,
    ...orderMutations
  }
}

export default resolvers;