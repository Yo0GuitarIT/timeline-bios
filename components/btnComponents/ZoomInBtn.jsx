import { ZoomIn } from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";

function ZoomInButton({handleZoomIn}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className="hover:text-yellow-400"
          variant="ghost"
          size="icon"
          onClick={() => handleZoomIn()}
        >
          <ZoomIn strokeWidth={1.5} size={20} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Zoom In</h4>
          <p className="text-sm">
            Enables the user to zoom in for a closer view or magnification of
            content, enhancing detailed examination.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ZoomInButton;
