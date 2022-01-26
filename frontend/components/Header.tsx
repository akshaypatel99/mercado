import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
	return (
		<header className='mb-8'>
			<div className='flex flex-col grow border-b-4 border-teal-500 '>
				<div className='flex justify-center items-center grow'>
					<Link href='/'>
						<a className='font-display text-6xl my-4 px-8 py-2 relative z-10 text-white bg-teal-500 -skew-x-6'>
							Mercado
						</a>
					</Link>
				</div>
				<Nav />
			</div>
			<div className='flex grow my-2 py-4 border-b-4 border-teal-500 text-xl font-semibold'>
				Search
			</div>
		</header>
	);
};

export default Header;
