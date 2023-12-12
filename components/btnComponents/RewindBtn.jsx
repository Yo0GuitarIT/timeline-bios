import { Button } from "../ui/button";
import { Rewind } from "lucide-react";

function RewindButton({ isRecording, handleRewind }) {
  return (
    <Button
      className="hover:text-cyan-500"
      variant="outline"
      size="icon"
      onClick={handleRewind}
      disabled={isRecording}
    >
      <Rewind strokeWidth={1.5} />
    </Button>
  );
}

export default RewindButton;
