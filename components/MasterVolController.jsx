import { Slider } from "./ui/slider";
import { Volume2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

function MasterVolController({ masterVolume, handleMasterVolChange }) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <div className="flex gap-2 h-8 items-center px-1 hover:text-yellow-400">
            <Volume2 />
            <Slider
              className="w-32"
              id="masterVolume"
              name="masterVolume"
              defaultValue={masterVolume}
              onValueChange={(newVolume) => handleMasterVolChange(newVolume)}
              max={100}
              step={1}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Master Volume Control</h4>
            <p className="text-sm">
              Adjust the overall volume of the application. Drag the slider to
              increase or decrease the master volume.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default MasterVolController;
