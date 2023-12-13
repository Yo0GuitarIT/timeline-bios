
import { Button } from "../ui/button";
import {Square} from "lucide-react"

function StopButton({onStop}) {
  return (
    <Button
      className="hover:text-yellow-500"
      variant="outline"
      size="icon"
      onClick={onStop}
    >
      <Square strokeWidth={1.5} />
    </Button>
  );
}


export default StopButton;
