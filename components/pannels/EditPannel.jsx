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

import useEditBtnStore from "../../stores/editButtonStore";

function EditPannel({
  stateCursor,
  stateSelect,
  stateShift,
  stateFadeIn,
  stateFadeOut,
  handleTrim,
}) {

 const {
   cursor,
   select,
   shift,
   fadeIn,
   fadeOut,
   setCursor,
   setSelect,
   setShift,
   setFadeIn,
   setFadeOut,
 } = useEditBtnStore();

  
  const useCursor = () => {
    setCursor();
    stateCursor();
  }

  const useSelect = () => {
    setSelect();
    stateSelect();
  }

  const useShift = () => {
    setShift();
    stateShift();
  };

  const useFadeIn = () => {
    setFadeIn();
    stateFadeIn();
  };

  const useFadeOut = () => {
    setFadeOut();
    stateFadeOut();
  };

  return (
    <div className="flex gap-2 p-1">
      <Button
        className="hover:text-yellow-400"
        variant={cursor ? "" : "outline"}
        size="icon"
        onClick={useCursor}
      >
        <MousePointer2 />
      </Button>

      <Button
        className="hover:text-yellow-400"
        variant={select ? "" : "outline"}
        size="icon"
        onClick={useSelect}
      >
        <Brackets />
      </Button>

      <div className="hidden">
        <HoverCard>
          <HoverCardTrigger>
            <Button variant={select ? "" : "outline"} size="icon" onClick={() => handleTrim()}>
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

      <Button
        className="hover:text-yellow-400"
        variant={shift ? "" : "outline"}
        size="icon"
        onClick={useShift}
      >
        <MoveHorizontal />
      </Button>

      <Button
        className="hover:text-yellow-400"
        variant={fadeIn ? "" : "outline"}
        size="icon"
        onClick={useFadeIn}
      >
        <Spline />
      </Button>

      <Button
        className="hover:text-yellow-400"
        variant={fadeOut ? "" : "outline"}
        size="icon"
        onClick={useFadeOut}
      >
        <Spline />
      </Button>
    </div>
  );
}

export default EditPannel;
