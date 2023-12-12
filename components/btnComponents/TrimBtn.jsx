import { ScissorsSquare } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function TrimButton({ select, handleTrim }) {
  return (
    <div className={select ? "uploadButtonVisible" : "uploadButtonHidden"}>
      <HoverCard>
        <HoverCardTrigger>
          <Button variant={"outline"} size="icon" onClick={() => handleTrim()}>
            <ScissorsSquare strokeWidth={1.5} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60 whitespace-normal">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Trim</h4>
            <p className="text-sm">
              Trims currently active track to the cursor selection.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export default TrimButton;
