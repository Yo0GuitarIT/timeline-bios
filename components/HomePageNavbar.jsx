import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, AudioWaveform } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";


function HomePageNavbar() {
  return (
    <header id="#header" className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="#header">
            <AudioWaveform size={24} />
            <span className="hidden font-bold sm:inline-block">
              Timelineβios
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
              href="https://github.com/Yo0GuitarIT/waveform-playlist-test"
            >
              GitHub
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Yo0GuitarIT">
                <Github size={20} strokeWidth={1} />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/yo036563/">
                <Linkedin size={20} strokeWidth={1} />
              </Link>
            </Button>

            <ModeToggle/>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HomePageNavbar;