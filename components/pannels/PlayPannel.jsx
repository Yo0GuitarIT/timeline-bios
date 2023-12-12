import usePlaybackBtnStore from "../../stores/playbackButtonStrore";
import PauseButton from "../btnComponents/PauseBtn";
import PlayButton from "../btnComponents/PlayBtn";
import StopButton from "../btnComponents/StopBtn";
import RewindButton from "../btnComponents/RewindBtn";
import FastForwardButton from "../btnComponents/FastforwardBtn";
import RecordButton from "../btnComponents/RecordBtn";

function PlayPannel({
  handlePause,
  handlePlay,
  handleStop,
  handleRewind,
  handleFastforward,
  handleRecord,
}) {
  const {
    isRecording,
    isPlaying,
    toggleRecording,
    toggleStop,
    togglePlay,
    togglePause,
  } = usePlaybackBtnStore();

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
  };

  const onPause = () => {
    handlePause();
    togglePause();
  };

  return (
    <div className="flex gap-2 p-1">
      <PauseButton onPause={onPause} isRecording={isRecording} />
      <PlayButton onPlay={onPlay} isPlaying={isPlaying} isRecording={isRecording} />
      <StopButton onStop={onStop} />   
      <RewindButton handleRewind={handleRewind} isRecording={isRecording} />     
      <FastForwardButton handleFastforward={handleFastforward} isRecording={isRecording} />
      <RecordButton onRecord={onRecord} isRecording={isRecording} />
    </div>
  );
}

export default PlayPannel;
