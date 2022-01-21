import { ApolloError } from 'apollo-server-express';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { User } from '../../../db/models';
import { hashPassword, createToken } from '../../../helpers/util';

type UserData = {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userMutations = {
  createUser: async (parent, args, context) => {
    try {
      const { input } = args;
      const { name, email, password } = input;

      const hashedPassword = await hashPassword(password);

      if (hashedPassword instanceof Error) {
        throw new ApolloError('There was a problem creating your account, please try again')
      } else if (typeof hashedPassword === 'string') {

        const userData: UserData = {
          name,
          email,
          password: hashedPassword,
          role: 'USER'
        }

        const existingEmail = await User.findOne({ email: userData.email }).lean();

        if (existingEmail) {
          throw new ApolloError('Email already exists');
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (savedUser) {
          const token = createToken(savedUser);
          const decodedToken = jwtDecode<JwtPayload>(token);
          const expiresAt = decodedToken.exp;

          const { id, name, email, role } = savedUser;

          const userInfo = {
            id, name, email, role
          }

          return {
            message: 'User created!',
            token,
            userInfo,
            expiresAt
          };
        } else {
          throw new ApolloError('There was a problem creating your account')
        }
      }
    } catch (error) {
      return error
    }
  },
  updateUserRole: async (parent, args, context) => {
    try {
      // const { user } = context;
      const { id, role } = args;
      const allowedRoles = ['USER', 'ADMIN'];

      // Add if statement of user.role === 'ADMIN' only

      if (!allowedRoles.includes(role)) {
        throw new ApolloError('Invalid user role')
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: id }, { role }
      );
      return {
        message: 'User role updated. User must log in again for the changes to take effect.',
        user: updatedUser,
      }
    } catch (error) {
      return error;
    }
  },
  deleteUser: async (parent, args, context) => {
    try {
      const { id } = args;

      const deletedUser = await User.findOneAndDelete({ _id: id });

      return {
        message: 'User deleted!',
        user: deletedUser
      }
  
    } catch (error) {
      return error;
    }
  }
}

export default userMutations;