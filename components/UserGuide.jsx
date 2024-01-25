import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";

import { GanttChartSquare } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";

function UserGuide() {
  return (
    <Sheet>
      <SheetTrigger>
        <HoverCard>
          <HoverCardTrigger>
            <GanttChartSquare
              strokeWidth={1.5}
              size={20}
              className="hover:text-yellow-400"
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-64 whitespace-normal">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">User Guide</h4>
              <p className="text-sm ">
                {"Here's an introduction and guide to some basic functions"}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            User Guide
            <Separator />
          </SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-3">
              <p>
                <strong>1. Getting Started</strong>
                <br />
                1.1 Upload Music: Drag or click to upload music files.
                <br />
                1.2 Playback Control: Play, pause, stop, rewind, and record.
              </p>

              <p>
                <strong>2. Editing</strong>
                <br />
                2.1 Modes: Switch between Cursor, Select, Shift, Fade In, and
                Fade Out.
                <br />
                2.2 Trim and Zoom: Trim tracks and zoom in/out.
              </p>

              <p>
                <strong>3. Volume Control</strong>
                <br />
                3.1 Master Volume: Adjust overall volume.
              </p>

              <p>
                <strong>4. Exporting</strong>
                <br />
                4.1 Export Music: Export in WAV format.
              </p>

              <p>
                <strong>5. Display Settings</strong>
                <br />
                5.1 Zooming: Enlarge/shrink waveforms.
                <br />
                5.2 Song Title: Set the main title.
              </p>

              <p>
                <strong>6. Additional Features</strong>
                <br />
                6.1 Track Info: View loaded tracks and progress.
                <br />
                6.2 Track Controls: Adjust volume and effects.
                <br />
                6.4 Format Support: Import in multiple formats.
              </p>

              <p>
                For any questions or suggestions, Please reach out to me.<br />
                E-mail ={'>'} yo0.guitar.it@gmail.com <br />
                <Link >GitHub</Link>
                Enjoy using my Online DAW : {`)`}
              </p>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default UserGuide;
