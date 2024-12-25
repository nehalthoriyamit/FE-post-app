import Layout from "@/components/Layout";
import Link from "next/link";

const Home = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center py-3">
        <h1 className="text-4xl font-semibold mb-4 ">Welcome to the app!</h1>
        <p className="text-gray-600 mt-2 font-medium">
          Show the feeds and create your own posts.
        </p>
        <p className="text-gray-600 mt-2 font-medium">
          Get started by{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
};
export default Home;
