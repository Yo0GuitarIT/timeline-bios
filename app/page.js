import Link from "next/link";

function HomePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="box-border text-center">
        <h1 className="text-5xl m-10">Timelineβios</h1>
        <Link href="/main" className="text-xl px-2 border-2 border-dashed border-yellow-400 cursor-pointer">
          Go
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
