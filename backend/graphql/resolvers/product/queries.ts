import { Product } from '../../../db/models'

const productQueries = {
  products: async (parent, args, context) => {
    try {
      return await Product.find()
    } catch (error) {
      return error
    }
  },
  product: async (parent, args, context) => {
    try {
      const { id } = args;
      return await Product.findById(id)
    } catch (error) {
      return error
    }
  },
};

export default productQueries;