import { Button } from "../ui/button";
import {FastForward} from "lucide-react"

function FastForwardButton({handleFastforward,isRecording}) {
  return (
    <Button
      className="hover:text-cyan-500"
      variant="outline"
      size="icon"
      onClick={handleFastforward}
      disabled={isRecording}
    >
      <FastForward strokeWidth={1.5} />
    </Button>
  );
}

export default FastForwardButton;
