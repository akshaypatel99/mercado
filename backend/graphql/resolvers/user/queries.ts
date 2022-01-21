import { User } from "../../../db/models";

const userQueries = {
  users: async (parent, args, context) => {
    try {
      return await User.find()
    } catch (error) {
      return error
    }
  },
  user: async (parent, args, context) => {
    try {
      const { id } = args;
      return await User.findById(id)
    } catch (error) {
      return error
    }
  },
};

export default userQueries;