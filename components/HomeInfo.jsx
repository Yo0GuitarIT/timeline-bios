import Image from "next/image";
import Sentence from "./Sentence";
import boyYell from "../public/jason-rosewell-ASKeuOZqhYU-unsplash.jpg";
import DemoButton from "./btnComponents/DemoBtn";
import StartButton from "./btnComponents/StartBtn";

function HomeInfo() {
  return (
    <div className="flex-1">
      <div className="relative ">
        <div
          className="relative overflow-hidden flex items-center"
          style={{ height: "calc(100vh - 56px)" }}
        >
          <Image
            src={boyYell}
            alt="Picture of the background"
            placeholder="blur"
            quality={100}
            className="object-cover w-full h-full"
          />

          <div
            className="
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
             text-white drop-shadow-md
             flex flex-col items-center gap-2 "
          >
            <Sentence />
            <div className="flex gap-3">
              <DemoButton />
              <StartButton />
            </div>
          </div>
        </div>

        {/* <div
          id="first-section"
          className=" h-screen bg-slate-300 flex items-center justify-center"
        ></div> */}
      </div>
    </div>
  );
}

export default HomeInfo;
