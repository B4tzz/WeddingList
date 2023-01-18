import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { client } from '../graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {Component: any, pageProps: any}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
