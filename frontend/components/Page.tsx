import { ReactNode } from 'react';
import Header from './Header';

type PageProps = { children: ReactNode };

const Page = ({ children }: PageProps, { ...props }) => {
	return (
		<div className='font-body w-screen h-screen'>
			<div className='container mx-auto'>
				<Header />
				{children}
			</div>
		</div>
	);
};

export default Page;
