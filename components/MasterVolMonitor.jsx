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
          <Speaker strokeWidth={1.5} size={20} />
          <canvas
            id="meterCanvas"
            className="w-80 h-5 border-2 rounded border-dashed border-yellow-400"
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
