import { Box, Center, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
	return (
		<header>
			<Center>
				<Heading as='h1' size='3xl' fontFamily='logo' color='brand.white'>
					Mercado
				</Heading>
			</Center>
			<Nav />
			<div>Search</div>
		</header>
	);
};

export default Header;
