import Link from "next/link";

function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <Link
            href="https://www.facebook.com/memento.mori1927/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >Yu Ling Chen
          </Link>
          . The source code is available on <Link
            href="https://github.com/Yo0GuitarIT/waveform-playlist-test"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
