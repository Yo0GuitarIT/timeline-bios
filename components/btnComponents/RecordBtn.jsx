import { Button } from "../ui/button";
import { Circle } from "lucide-react";

function RecordButton({ onRecord, isRecording }) {
  return (
    <Button
      className={`${isRecording ? "bg-rose-500" : ""} hover:text-rose-500`}
      variant="outline"
      size="icon"
      id="record-Button"
      onClick={onRecord}
      disabled={isRecording}
    >
      <Circle fill=" rgb(239 68 68)" />
    </Button>
  );
}

export default RecordButton;
