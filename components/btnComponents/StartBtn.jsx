import Link from "next/link";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import loadingImg from "../../public/vercel.svg";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

function StartButton() {
  return (
    <Link href="/default">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Get Started <ChevronsRight strokeWidth={1} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex">
              <Image src={loadingImg} alt="loadingImg" height={20} />
              Project Building...
            </DialogTitle>
            <DialogDescription>
              Relevant discourse about the ongoing construction of the project.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Link>
  );
}

export default StartButton;
