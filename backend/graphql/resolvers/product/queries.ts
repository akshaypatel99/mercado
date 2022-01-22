import { Product } from '../../../db/models'

const productQueries = {
  products: async (parent, args, context) => {
    try {
      const { pageSize, page } = args.params;

      return {
        results: async () => {
          const products = await Product.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
          
          return products;
        },
        info: async () => {
          const count = await Product.countDocuments();
          const pages = Math.ceil(count / pageSize);
          const prev = page > 1 ? page - 1 : null;
          const next = page < pages ? page + 1 : null;

          return {
            count,
            pages,
            prev,
            next
          }
        }
      }
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