import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
	mutation Login($input: LoginInput) {
		login(input: $input) {
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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, { data, loading, error }] = useMutation(LOGIN);
	const [logout, { data: logoutData }] = useMutation(gql`
		mutation Logout {
			logout
		}
	`);

	async function handleLogin(e: React.SyntheticEvent) {
		e.preventDefault();
		const { data } = await login({
			variables: {
				input: {
					email,
					password,
				},
			},
		});
		if (data && data.login.user) {
			console.log(data.login.user);
		}
	}

	async function handleLogout(e: React.SyntheticEvent) {
		e.preventDefault();
		await logout();
	}

	return (
		<div className='flex flex-col justify-center items-center h-full w-full'>
			I am the Login Page
			{error && <p>{error.message}</p>}
			{data && data.login.user.name}
			<form className='flex flex-col' onSubmit={handleLogin}>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='email'
					name='email'
					placeholder='Enter email address'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className='w-72 m-1 py-2 px-4 border-2 border-gray-400'
					type='password'
					name='password'
					placeholder='Enter password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Login</button>
			</form>
			<button type='submit' onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	return {
		props: {},
	};
};
