import { MoveHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function ShiftButton({shift,useShift}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className={`hover:text-yellow-400  ${
            shift ? "hover:text-red-500" : ""
          }`}
          variant={shift ? "" : "outline"}
          size="icon"
          onClick={useShift}
        >
          <MoveHorizontal />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Shift</h4>
          <p className="text-sm">
            Sends deltaTime in seconds change for Track track.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ShiftButton;
