import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import "../styles/globals.css";
import useMediaQuery from "../hooks/use-mediaQuery";

const isDesktop: boolean = true;

export const MediaQueryContext = React.createContext({
  isDesktop,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const isDesktop = useMediaQuery("(min-width: 550px)");

  return (
    <MediaQueryContext.Provider value={{ isDesktop }}>
      <QueryClientProvider client={queryClient}>
        {/* Provide Hydrate state prop for getServerSideProps */}
        {/* Hydrate places everything in cache, gives data that we already fetched */}
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </MediaQueryContext.Provider>
  );
}

export default MyApp;
