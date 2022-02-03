import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGN_UP = gql`
	mutation SignUp($input: SignupInput) {
		signup(input: $input) {
			message
			user {
				_id
				name
				email
				role
			}
		}
	}
`;

export default function SignUp() {
	const [signUpDetails, setSignUpDetails] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [signup, { data, loading, error }] = useMutation(SIGN_UP);

	async function handleSignUp(e: React.SyntheticEvent) {
		e.preventDefault();
		const { data } = await signup({
			variables: {
				input: {
					name: signUpDetails.name,
					email: signUpDetails.email,
					password: signUpDetails.password,
				},
			},
		});
		if (data && data.signup.user) {
			console.log(data.signup.user);
		}
	}

	return (
		<div className='flex flex-col justify-center items-center h-full w-full'>
			I am the SignIn Page
			{error && <p>{error.message}</p>}
			{data && data.signup.user.name}
			<form className='flex flex-col' onSubmit={handleSignUp}>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='text'
					name='name'
					placeholder='Enter your full name'
					value={signUpDetails.name}
					onChange={(e) =>
						setSignUpDetails({ ...signUpDetails, name: e.target.value })
					}
				/>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='email'
					name='email'
					placeholder='Enter email address'
					value={signUpDetails.email}
					onChange={(e) =>
						setSignUpDetails({ ...signUpDetails, email: e.target.value })
					}
				/>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='password'
					name='password'
					placeholder='Enter password'
					value={signUpDetails.password}
					onChange={(e) =>
						setSignUpDetails({ ...signUpDetails, password: e.target.value })
					}
				/>
				<button type='submit'>Sign up</button>
			</form>
		</div>
	);
}
