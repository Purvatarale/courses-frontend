import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Courses | IIT Bombay</title>
        <meta name="description" content="View Courses @ IIT Bombay" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
