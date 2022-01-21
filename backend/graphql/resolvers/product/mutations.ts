import { ApolloError } from 'apollo-server-express';
import { Product } from '../../../db/models'

const productMutations = {
  createProduct: async (parent, args, context) => { },
  updateProduct: async (parent, args, context) => { },
  deleteProduct: async (parent, args, context) => { }
}

export default productMutations;