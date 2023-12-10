import Timelinebios from "./TittleTimelinebios";
import MasterVolMonitor from "./MasterVolMonitor";
import ViewPannel from "../components/pannels/ViewPannel";
import UserGuide from "./UserGuide";
import { ModeToggle } from "./ModeToggle";
import { Input } from "../components/ui/input";

function MainHeader({
  handleZoomIn,
  handleZoomOut,
  songName,
  handleSongNameChange,
}) {
  return (
    <div className="w-full h-14 flex items-center sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between gap-px">
        <div className="hidden md:flex">
          <Timelinebios />
        </div>

        <Input
          className="text-center w-96 h-6 dark:bg-zinc-800 bg-transparent "
          type="text"
          placeholder="Write the Song Name"
          value={songName}
          onChange={handleSongNameChange}
        />

        <MasterVolMonitor />

        <ViewPannel handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />

        <UserGuide />
        
        <ModeToggle />
      </div>
    </div>
  );
}

export default MainHeader;
