"use client";

import { Button } from "../../components/ui/button";
import useButtonStore from "./btnStore";

const ButtonComponent = () => {
  const { isRecording, toggleRecording, toggleStop } = useButtonStore();

  return (
    <div className="flex gap-1 m-2">
      <Button onClick={toggleRecording} disabled={isRecording}></Button>
      <Button onClick={toggleStop}>Stop</Button>
      <Button disabled={isRecording}>Play</Button>
      <Button disabled={isRecording}>Fast Forward</Button>
      <Button disabled={isRecording}>Rewind</Button>
    </div>
  );
};

export default ButtonComponent;
