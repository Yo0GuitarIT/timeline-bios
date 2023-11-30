import Link from "next/link";
import { AudioWaveform } from "lucide-react";

function Timelinebios() {
  return (
    <Link className="mr-6 flex items-center space-x-2" href="/">
      <AudioWaveform size={24} />
      <span className="hidden font-bold sm:inline-block">Timelineβios</span>
    </Link>
  );
}

export default Timelinebios;
