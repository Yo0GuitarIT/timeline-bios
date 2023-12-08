import { Button } from "./ui/button";
import { Download } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";

function ExportButton({ handleExport }) {

  const { toast } = useToast();
  const triggerToast=() => {
     toast({
       title: "Exporting...",
       description: "Please Wait for a few seconds...",
     });
  }

  const AlertAndExport=() => {
    handleExport();
    triggerToast();
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline" size="icon" onClick={AlertAndExport}>
          <Download />
        </Button>

      </HoverCardTrigger>
      <HoverCardContent className="w-60 whitespace-normal">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Export File</h4>
          <p className="text-sm">
            Exports the current data or content to a file.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ExportButton;
