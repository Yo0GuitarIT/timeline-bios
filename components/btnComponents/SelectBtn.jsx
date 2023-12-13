import { Brackets } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function SelectButton({ select, useSelect }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className={`hover:text-yellow-400  ${
            select ? "hover:text-red-500" : ""
          }`}
          variant={select ? "" : "outline"}
          size="icon"
          onClick={useSelect}
        >
          <Brackets />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Select</h4>
          <p className="text-sm">
            Cursor selection has occurred from start to end with active Track
            track.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default SelectButton;
