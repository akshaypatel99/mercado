import Link from 'next/link';

export default function Nav() {
	return (
		<nav className=''>
			<Link href='/products'>
				<a className=''>Products</a>
			</Link>
			<Link href='/sell'>
				<a className=''>Sell</a>
			</Link>
			<Link href='/orders'>
				<a className=''>Orders</a>
			</Link>
			<Link href='/account'>
				<a className=''>Account</a>
			</Link>
			<Link href='/signup'>
				<a className=''>Sign Up</a>
			</Link>
			<Link href='/login'>
				<a className=''>Login</a>
			</Link>
		</nav>
	);
}
