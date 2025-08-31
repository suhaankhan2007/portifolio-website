// pages/_app.js
import "../styles/global.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Suhaan Khan — Portfolio</title>
        <meta name="description" content="Suhaan Khan — cybersecurity, machine learning, systems programming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
