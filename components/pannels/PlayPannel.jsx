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
  const { isRecording,isPlaying, toggleRecording, toggleStop,togglePlay,togglePause } = usePlaybackBtnStore();

  const onRecord = () => {
    handleRecord();
    toggleRecording();
  };

  const onStop = () => {
    handleStop();
    toggleStop();
  };

  const onPlay = () => {
    handlePlay();
    togglePlay();
  }
  
  const onPause = () => {
    handlePause();
    togglePause();
  }

  return (
    <div className="flex gap-2 p-1">
      <Button
        className="hover:text-violet-400"
        variant="outline"
        size="icon"
        onClick={onPause}
        disabled={isRecording}
      >
        <Pause strokeWidth={1.5} />
      </Button>

      <Button
        className={`hover:text-green-500 ${isPlaying?"bg-red-500 text-white":""}`}
        variant="outline"
        size="icon"
        onClick={onPlay}
        disabled={isRecording}
      >
        <Play strokeWidth={1.5} />
      </Button>

      <Button
        className="hover:text-yellow-500"
        variant="outline"
        size="icon"
        onClick={onStop}
      >
        <Square strokeWidth={1.5} />
      </Button>

      <Button
        className="hover:text-cyan-500"
        variant="outline"
        size="icon"
        onClick={handleRewind}
        disabled={isRecording}
      >
        <Rewind strokeWidth={1.5} />
      </Button>

      <Button
        className="hover:text-cyan-500"
        variant="outline"
        size="icon"
        onClick={handleFastforward}
        disabled={isRecording}
      >
        <FastForward strokeWidth={1.5} />
      </Button>

      <Button
        className= {`${isRecording? "bg-rose-500":""} hover:text-rose-500`}
        variant="outline"
        size="icon"
        id="record-Button"
        onClick={onRecord}
        disabled={isRecording}
      >
        <Circle fill=" rgb(239 68 68)" />
      </Button>
    </div>
  );
}

export default PlayPannel;
