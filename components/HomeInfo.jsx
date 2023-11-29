import boyYell from "@/public/jason-rosewell-ASKeuOZqhYU-unsplash.jpg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function HomeInfo() {
  return (
    <div className="flex-1 ">
      <div className="container relative">
        <div className="relative">
          <Image
            src={boyYell}
            alt="Picture of the background"
            placeholder="blur"
            quality={100}
            className="object-cover"
            style={{ height: "calc(100vh - 56px)" }}
          />

          <div
            className="
            absolute top-1/2 left-1/2 w-4/5 transform -translate-x-1/2 -translate-y-1/2
             text-white drop-shadow-md
             flex flex-col items-center gap-2 "
          >
            <p className="text-5xl font-bold">
              Unleash Your Creativity in Music Editing.
            </p>

            <p className="text-2xl">
              Experience a powerful online Digital Audio Workstation (DAW) at
              TimelineBios.
              <br />
              Elevate your music editing game with user-friendly tools designed
              to inspire creativity.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" asChild>
                <Link href="#first-section">More Info</Link>
              </Button>

              <Button asChild>
                <Link href="/main">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>

        <div
          id="first-section"
          className=" h-screen bg-slate-300 flex items-center justify-center"
        ></div>
      </div>
    </div>
  );
}

export default HomeInfo;
