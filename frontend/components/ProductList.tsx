import { gql, useQuery } from '@apollo/client';

type Product = {
	_id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
};

export const ALL_PRODUCTS = gql`
	query AllProducts($params: QueryParams) {
		products(params: $params) {
			results {
				_id
				user {
					_id
					name
				}
				name
				description
				image
				category
				price
			}
			info {
				count
			}
		}
	}
`;

export default function ProductList() {
	const { data, loading, error } = useQuery(ALL_PRODUCTS, {
		variables: {
			params: {
				pageSize: 20,
				page: 1,
			},
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<p>Products!</p>
			{data.products.results.map((product: Product) => (
				<div key={product._id}>
					<h3>{product.name}</h3>
					<p>{product.category}</p>
					<p>{product.description}</p>
					<h4>{product.price}</h4>
					<img src={product.image} alt={product.name} />
				</div>
			))}
		</div>
	);
}
