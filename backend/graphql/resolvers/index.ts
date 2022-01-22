import { userQueries, userMutations, userFields } from "./user";
import { productQueries, productMutations, productFields } from "./product";
import { orderQueries, orderMutations, orderFields } from "./order";

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
  },
  ...userFields,
  ...productFields,
  ...orderFields
};

export default resolvers;