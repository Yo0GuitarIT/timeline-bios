import { Spline } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function FadeInButton({ fadeIn, useFadeIn }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className={`hover:text-yellow-400  ${
            fadeIn ? "hover:text-red-500" : ""
          }`}
          variant={fadeIn ? "" : "outline"}
          size="icon"
          onClick={useFadeIn}
        >
          <Spline />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Fade In</h4>
          <p className="text-sm">
            Fading in smoothly increases audio volume or visual visibility from
            silence or transparency to a desired level.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default FadeInButton;
