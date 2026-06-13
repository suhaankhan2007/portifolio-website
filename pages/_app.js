// pages/_app.js
import "../styles/global.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Suhaan Khan — AI Engineer · Researcher · Builder</title>
        <meta
          name="description"
          content="Suhaan Khan — AI engineer, researcher, and builder. Founding engineer at Framelight, post-quantum cryptography research at NCSA, and astrophysics that chases dark matter."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
