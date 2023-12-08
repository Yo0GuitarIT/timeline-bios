import { Speaker } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";

function MasterVolMonitor() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div id="meterConatiner" className="flex gap-1 items-center">
          <Speaker />
          <canvas
            id="meterCanvas"
            className="w-40 h-4 border-2 border-dashed border-yellow-400"
          ></canvas>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Master Volume Signal Meter</h4>
          <p className="text-sm ">
            Provides a visual representation of the master volume signal
            strength for monitoring audio output levels.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default MasterVolMonitor;
