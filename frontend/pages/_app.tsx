import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../styles/globals.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
	uri: process.env.REACT_APP_GRAPHQL_URI,
	credentials: 'include',
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: 'include',
	link: from([errorLink, uploadLink]),
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Page>
				<Component {...pageProps} />
			</Page>
		</ApolloProvider>
	);
}
export default MyApp;
