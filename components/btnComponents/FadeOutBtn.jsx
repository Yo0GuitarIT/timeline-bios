import { Spline } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function FadeOutButton({ fadeOut, useFadeOut }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className={`hover:text-yellow-400  ${
            fadeOut ? "hover:text-red-500" : ""
          }`}
          variant={fadeOut ? "" : "outline"}
          size="icon"
          onClick={useFadeOut}
        >
          <Spline />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Fade Out</h4>
          <p className="text-sm">
            Fading out smoothly reduces audio volume or visual visibility to
            silence or transparency.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default FadeOutButton;
