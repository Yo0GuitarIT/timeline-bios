import Image from "next/image";
import { ArrowBigRightDash } from "lucide-react";
import loadImg from "../public/Pulse-1s-200px.svg";

function InitialLoader({loadProgress,loadInfo}) {
  return (
    <div id="load-data" className="w-screen h-screen absolute">
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-4 z-30">
        <div className="flex items-center">
          <Image src={loadImg} alt="loading" width={20} height={20}></Image>
          Loaded{loadProgress}%
        </div>

        <div className="flex items-center">
          <ArrowBigRightDash strokeWidth={1.5} />
          <p>{`Loading ${loadInfo}`}</p>
        </div>

        <div className="mt-1 rounded border-2 border-collapse">
          <div
            className="bg-yellow-500 h-5 rounded"
            style={{ width: `${loadProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default InitialLoader;
