import Link from 'next/link';

export default function Nav() {
	return (
		<nav className='grid grid-cols-6 font-bold text-xl my-2 uppercase text-center'>
			<Link href='/products'>
				<a className='hover:text-teal-500'>Products</a>
			</Link>
			<Link href='/sell'>
				<a className='hover:text-teal-500'>Sell</a>
			</Link>
			<Link href='/orders'>
				<a className='hover:text-teal-500'>Orders</a>
			</Link>
			<Link href='/account'>
				<a className='hover:text-teal-500'>Account</a>
			</Link>
			<Link href='/signup'>
				<a className='hover:text-teal-500'>Sign Up</a>
			</Link>
			<Link href='/login'>
				<a className='hover:text-teal-500'>Login</a>
			</Link>
		</nav>
	);
}
