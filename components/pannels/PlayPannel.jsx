import { Button } from "../ui/button";
import { Pause, Play, Square, Circle, Rewind, FastForward } from "lucide-react";

function PlayPannel({
  handlePause,
  handlePlay,
  handleStop,
  handleRewind,
  handleFastforward,
  handleRecord,
  isRecording,
}) {
  return (
    <div className="flex gap-2 p-1">
      <Button variant="outline" size="icon" onClick={handlePause}>
        <Pause strokeWidth={1.5} className="hover:text-violet-400" />
      </Button>
      <Button variant="outline" size="icon" onClick={handlePlay}>
        <Play strokeWidth={1.5} className="hover:text-green-500" />
      </Button>
      <Button variant="outline" size="icon" onClick={handleStop}>
        <Square strokeWidth={1.5} className="hover:text-yellow-500" />
      </Button>
      <Button variant="outline" size="icon" onClick={handleRewind}>
        <Rewind strokeWidth={1.5} className="hover:text-cyan-500" />
      </Button>
      <Button variant="outline" size="icon" onClick={handleFastforward}>
        <FastForward strokeWidth={1.5} className="hover:text-cyan-500" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        id="record-Button"
        onClick={handleRecord}
        disabled={isRecording}
      >
        <Circle
          // color="rgb(220 38 38)"
          fill=" rgb(239 68 68)"
          className="hover:text-rose-500"
        />
      </Button>
    </div>
  );
}

export default PlayPannel;
