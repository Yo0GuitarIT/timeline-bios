import { Button } from "../ui/button";
import { Pause } from "lucide-react";

function PauseButton({ onPause, isRecording }) {
  

  return (
    <Button
      className="hover:text-violet-400"
      variant="outline"
      size="icon"
      onClick={onPause}
      disabled={isRecording}
    >
      <Pause strokeWidth={1.5} />
    </Button>
  );
}

export default PauseButton;
