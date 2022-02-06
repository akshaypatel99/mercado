import { useRouter } from 'next/router';

export default function ProductPage() {
	const router = useRouter();
	const { id } = router.query;
	return <div>I am the Product Page for {id}</div>;
}
