import { ApolloError } from 'apollo-server-express';
import { Product, User } from '../../../db/models'

const productMutations = {
  createProduct: async (parent, args, context) => {
    try {
      const { input } = args;
      const { user } = context;

      const productData = Object.assign({}, input, { user: user.id });
      const newProduct = new Product(productData);
      const productResult = await newProduct.save();

      const productCreator = await User.findById({ _id: user.id })
      productCreator.userProducts.unshift({ product: productResult._id });
      await productCreator.save();

      return {
        message: 'Product created!',
        product: productResult
      }
    } catch (error) {
      return error
    }
  },
  updateProduct: async (parent, args, context) => { 
    try {
      const { id, input } = args;
      const { user } = context;
      const { name, description, category, image, price } = input;

      const product = await Product.findById({ _id: id });

      if (product) {
        if (product.user === user.id || user.role === 'ADMIN') {
          product.name = name;
          product.description = description;
          product.category = category;
          product.image = image;
          product.price = price;

          const updatedProduct = await product.save();

          return {
            message: 'Product updated!',
            product: updatedProduct
          }
        } else {
          throw new ApolloError('Unauthorized update action')
        }
      } else {
        throw new ApolloError('Product not found')
      }
    } catch (error) {
      return error
    }
  },
  deleteProduct: async (parent, args, context) => {
    try {
      const { id } = args;
      const { user } = context;

      const product = await Product.findById({ _id: id });

      if (product) {
        if (product.user === user.id || user.role === 'ADMIN') {
          const deletedProduct = await Product.findOneAndDelete({ _id: id, user: user.id });

          return {
            message: 'Product deleted!',
            user: deletedProduct
          }
        } else {
          throw new ApolloError('Unauthorized delete action')
        }
      } else {
        throw new ApolloError('Product not found')
      }
    } catch (error) {
      return error;
    }
  }
}

export default productMutations;