import { Order } from "../../../db/models";

const orderQueries = {
  orders: async (parent, args, context) => {
    try {
      const { pageSize, page } = args.params;

      return {
        results: async () => {
          const orders = await Order.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
          
          return orders;
        },
        info: async () => {
          const count = await Order.countDocuments();
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
  order: async (parent, args, context) => {
    try {
      const { id } = args;
      return await Order.findById(id)
    } catch (error) {
      return error
    }
  },
};

export default orderQueries;