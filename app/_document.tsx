import Head from "next/head";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
