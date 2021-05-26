import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "https://graphqlzero.almansi.me/api",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
