import { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
import Header from './Header';

type PageProps = { children: ReactNode };

const Page = ({ children }: PageProps, { ...props }) => {
	return (
		<Container maxW='container.xl'>
			<Header />
			{children}
		</Container>
	);
};

export default Page;
