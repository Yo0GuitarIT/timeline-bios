import Timelinebios from "./TittleTimelinebios";
import MasterVolMonitor from "./MasterVolMonitor";
import { ModeToggle } from "./ModeToggle";

function MainHeader() {
  return (
    <div className="w-full h-14 flex items-center sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between gap-px">
        <div className="hidden md:flex">
          <Timelinebios />
        </div>
        <MasterVolMonitor />
        <ModeToggle />
      </div>
    </div>
  );
}

export default MainHeader;
