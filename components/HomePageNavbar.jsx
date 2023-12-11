import Link from "next/link";

import { ModeToggle } from "../components/ModeToggle";
import Timelinebios from "../components/TittleTimelinebios";

function HomePageNavbar() {
  return (
    <header
      id="#header"
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container h-14 flex items-center">
        <div className="mr-4 hidden md:flex">
          <Timelinebios />
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
              href="https://github.com/Yo0GuitarIT/timeline-bios"
            >
              GitHub
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default HomePageNavbar;
