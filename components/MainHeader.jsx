import Timelinebios from "./TittleTimelinebios";
import MasterVolMonitor from "./MasterVolMonitor";
import { ModeToggle } from "./ModeToggle";
import { Input } from "../components/ui/input";
import { useState } from "react";

function MainHeader() {
  const [songName, setSongName] = useState("My Father Never Loves me");

  const handleSongNameChange = (e) => {
    setSongName(e.target.value);
  };

  return (
    <div className="w-full h-14 flex items-center sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between gap-px">
        <div className="hidden md:flex">
          <Timelinebios />
        </div>

        {/* <div className="audio-pos" aria-label="Audio positition"></div> */}

        <Input
          className="text-center text-lg w-96"
          type="text"
          placeholder="Write the Song Name"
          value={songName}
          onChange={handleSongNameChange}
        />

        <MasterVolMonitor />
        <ModeToggle />
      </div>
    </div>
  );
}

export default MainHeader;
