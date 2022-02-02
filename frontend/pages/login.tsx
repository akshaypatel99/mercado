import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
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

export default function Login() {
	const [loginDetails, setLoginDetails] = useState({
		email: '',
		password: '',
	});
	const [login, { data, loading, error }] = useMutation(LOGIN);

	async function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const { data } = await login({ variables: loginDetails });
		if (data && data.login.message === 'Authentication successful') {
			console.log(data.login.user);
		}
	}

	return (
		<div className='flex flex-col justify-center items-center h-full w-full'>
			I am the Login Page
			{loading && <p>Submitting...</p>}
			{error && <p>error.message</p>}
			<form className='flex flex-col' onSubmit={handleSubmit}>
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
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}
