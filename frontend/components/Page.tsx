import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';

type PageProps = { children: ReactNode };

const Page = ({ children }: PageProps, { ...props }) => {
	return (
		<Box>
			<Header />
			<Container maxW='container.xl' my='16'>
				{children}
			</Container>
		</Box>
	);
};

export default Page;
