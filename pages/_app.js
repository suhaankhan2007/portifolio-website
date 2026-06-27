// pages/_app.js
import "../styles/global.css";
import Head from "next/head";

const SITE_URL = "https://suhaankhan.com";
const TITLE = "Suhaan Khan — AI Engineer, Researcher & Founder";
const DESCRIPTION =
  "Suhaan Khan is an AI engineer, researcher, and founder at the University of Illinois Urbana-Champaign. Co-founder of Framelight, post-quantum cryptography researcher at NCSA, and award-winning hackathon builder working across AI, computer vision, cybersecurity, and astrophysics.";
const OG_IMAGE = `${SITE_URL}/images/og.png`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="author" content="Suhaan Khan" />
        <meta
          name="keywords"
          content="Suhaan Khan, Suhaan Khan UIUC, Suhaan Khan AI, AI engineer, machine learning, Framelight, post-quantum cryptography, NCSA, computer vision, dark matter research, hackathon, University of Illinois Urbana-Champaign"
        />

        {/* crawling / indexing */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Suhaan Khan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Suhaan Khan — AI Engineer, Researcher & Founder" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Suhaan Khan" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
