import Head from "next/head";
import PageNotFound from "../components/PageNotFound";
export default function NotFound404() {
  return (
    <>
      <Head>
        <title>😔 Page Not Found 404 | MetaTeds</title>
      </Head>

      {/*Add your 404 page here*/}
      <PageNotFound />
    </>
  );
}