import { MousePointer2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function DefaultButton({cursor,useCursor}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className={`hover:text-yellow-400  ${
            cursor ? "hover:text-red-500" : ""
          }`}
          variant={cursor ? "" : "outline"}
          size="icon"
          onClick={useCursor}
        >
          <MousePointer2 />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Cursor</h4>
          <p className="text-sm">
            Marking the current timeline for precise editing in audio.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default DefaultButton;
