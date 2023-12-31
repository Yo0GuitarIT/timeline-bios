import Link from "next/link";
import { AudioWaveform } from "lucide-react";

function Timelinebios() {
  return (
    <Link className="mr-6 flex items-center space-x-2" href="/">
      <AudioWaveform size={24} />
      <span className="font-bold ">Timelineβios</span>
    </Link>
  );
}

export default Timelinebios;
