import Link from 'next/link';

export default function Nav() {
	return (
		<nav className='grid grid-cols-4 font-bold text-xl my-2 uppercase'>
			<Link href='/products'>Products</Link>
			<Link href='/sell'>Sell</Link>
			<Link href='/orders'>Orders</Link>
			<Link href='/account'>Account</Link>
		</nav>
	);
}
