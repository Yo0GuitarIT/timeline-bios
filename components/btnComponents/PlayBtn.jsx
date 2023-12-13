import { Button } from "../ui/button";
import {Play} from "lucide-react"


function PlayButton({onPlay,isPlaying,isRecording}) {
  return (
    <Button
      className={`hover:text-green-500 ${
        isPlaying ? "bg-red-500 text-white" : ""
      }`}
      variant="outline"
      size="icon"
      onClick={onPlay}
      disabled={isRecording}
    >
      <Play strokeWidth={1.5} />
    </Button>
  );
}

export default PlayButton;
