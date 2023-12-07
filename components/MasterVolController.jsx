import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";

function MasterVolController({ masterVolume, handleMasterVolChange }) {
  return (
    <div className="flex gap-2 h-8 items-center px-1">
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
  );
}

export default MasterVolController;
