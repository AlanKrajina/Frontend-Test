import React, { useState } from "react";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    /* Provide queryClient to whole App */
    <QueryClientProvider client={queryClient}>
      {/* Provide Hydrate state prop for getServerSideProps */}
      {/* Hydrate places everything in cache, gives data that we already fetched */}
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
