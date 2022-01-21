import { Schema, Types, model } from 'mongoose';
import bcrypt from 'bcryptjs';

type UserProduct = {
  product: {
    type: Types.ObjectId
  }
}

interface User {
  name: String;
  email: String;
  password: String;
  role: String;
  userProducts: UserProduct[];
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'USER',
  },
  userProducts: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    }
  ],
},
  {
    timestamps: true,
  }
)

userSchema.methods.passwordMatch = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = model<User>('User', userSchema);

export default UserModel;