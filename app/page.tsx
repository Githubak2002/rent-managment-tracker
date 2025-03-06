import Link from "next/link";

export default function Home() {
  return (

    <section className="h-[80vh] mx-auto flexCenter flex-col">

      <h2 className="px-3 text-center text-3xl font-black">Welcome to the website</h2>

      <div className="mt-10 flex flex-col space-y-3 text-blue-500">
        <Link href="/login">Login → </Link>
        <Link href="/rent">Manage Rent → </Link>

        <section>
          
        </section>
      </div>

    </section>
  );
}
