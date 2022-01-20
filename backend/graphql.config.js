module.exports = {
	projects: {
		app: {
			schema: ['./graphql/typedefs/schema.graphql'],
			documents: ['**/*.{graphql,js,ts,jsx,tsx}'],
		},
	},
};
