import { Button } from "../ui/button";
import { Pause, Play, Square, Circle, Rewind, FastForward } from "lucide-react";
import usePlaybackBtnStore from "../../stores/playbackButtonStrore";

function PlayPannel({
  handlePause,
  handlePlay,
  handleStop,
  handleRewind,
  handleFastforward,
  handleRecord,
}) {
  const { isRecording, toggleRecording, toggleStop } = usePlaybackBtnStore();

  const onRecord = () => {
    handleRecord();
    toggleRecording();
  };

  const onStop = () => {
    handleStop();
    toggleStop();
  };

  return (
    <div className="flex gap-2 p-1">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePause}
        disabled={isRecording}
      >
        <Pause strokeWidth={1.5} className="hover:text-violet-400" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handlePlay}
        disabled={isRecording}
      >
        <Play strokeWidth={1.5} className="hover:text-green-500" />
      </Button>

      <Button variant="outline" size="icon" onClick={onStop}>
        <Square strokeWidth={1.5} className="hover:text-yellow-500" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleRewind}
        disabled={isRecording}
      >
        <Rewind strokeWidth={1.5} className="hover:text-cyan-500" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleFastforward}
        disabled={isRecording}
      >
        <FastForward strokeWidth={1.5} className="hover:text-cyan-500" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        id="record-Button"
        onClick={onRecord}
        disabled={isRecording}
      >
        <Circle fill=" rgb(239 68 68)" className="hover:text-rose-500" />
      </Button>
    </div>
  );
}

export default PlayPannel;
