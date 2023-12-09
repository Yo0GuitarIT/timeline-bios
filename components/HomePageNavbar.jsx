import Link from "next/link";
import { Github, Linkedin, AudioWaveform, MenuSquare } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";
import Timelinebios from "../components/TittleTimelinebios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { Button } from "./ui/button";

function HomePageNavbar() {
  return (
    <header
      id="#header"
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container h-14 flex items-center">
        <div className="mr-4 hidden md:flex">
          <Timelinebios />
          {/* <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
              href="https://github.com/Yo0GuitarIT/waveform-playlist-test"
            >
              GitHub
            </Link>
          </nav> */}
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuSquare strokeWidth={1} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Welcome</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  className="flex justify-around items-center "
                  href="https://github.com/Yo0GuitarIT"
                >
                  <Github className="mr-2 h-4 w-4" />
                  <span>Github</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  className="flex justify-around items-center "
                  href="https://www.linkedin.com/in/yo036563/"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  <span>Linkedin</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default HomePageNavbar;
