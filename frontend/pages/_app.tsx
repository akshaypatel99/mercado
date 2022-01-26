import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import client from '../apollo-client';
import Page from '../components/Page';
import '../styles/globals.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
