import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGN_UP = gql`
	mutation SignUp($name: String!, $email: String!, $password: String!) {
		signup(name: $name, email: $email, password: $password) {
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
	const [loginDetails, setLoginDetails] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

	async function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const { data } = await signUp({ variables: loginDetails });
		if (data && data.signup.message === 'User created!') {
			console.log(data.signup.user);
		}
	}

	return (
		<div className='flex flex-col justify-center items-center h-full w-full'>
			I am the SignIn Page
			{loading && <p>Submitting...</p>}
			{error && <p>error.message</p>}
			<form className='flex flex-col' onSubmit={handleSubmit}>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='text'
					name='name'
					placeholder='Enter your full name'
					value={loginDetails.name}
					onChange={(e) =>
						setLoginDetails({ ...loginDetails, name: e.target.value })
					}
				/>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='email'
					name='email'
					placeholder='Enter email address'
					value={loginDetails.email}
					onChange={(e) =>
						setLoginDetails({ ...loginDetails, email: e.target.value })
					}
				/>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='password'
					name='password'
					placeholder='Enter password'
					value={loginDetails.password}
					onChange={(e) =>
						setLoginDetails({ ...loginDetails, password: e.target.value })
					}
				/>
				<button type='submit'>Sign up</button>
			</form>
		</div>
	);
}
