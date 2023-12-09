import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import {
  MousePointer2,
  Brackets,
  MoveHorizontal,
  Spline,
  ScissorsSquare,
} from "lucide-react";

function EditPannel({
  stateCursor,
  stateSelect,
  stateShift,
  stateFadeIn,
  stateFadeOut,
  handleTrim,
}) {
  return (
    <div className="flex gap-2 p-1">
      <Button variant="outline" size="icon" onClick={() => stateCursor()}>
        <MousePointer2 />
      </Button>

      <Button variant="outline" size="icon" onClick={() => stateSelect()}>
        <Brackets />
      </Button>

      <div className="hidden">
        <HoverCard>
          <HoverCardTrigger>
            <Button variant="outline" size="icon" onClick={() => handleTrim()}>
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
      
      <Button variant="outline" size="icon" onClick={() => stateShift()}>
        <MoveHorizontal />
      </Button>

      <Button variant="outline" size="icon" onClick={() => stateFadeIn()}>
        <Spline />
      </Button>

      <Button variant="outline" size="icon" onClick={() => stateFadeOut()}>
        <Spline />
      </Button>
    </div>
  );
}

export default EditPannel;
