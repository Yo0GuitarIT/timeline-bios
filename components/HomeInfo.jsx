"use client";

import Sentence from "./Sentence";
import boyYell from "../public/jason-rosewell-ASKeuOZqhYU-unsplash.jpg";
import loadingImg from "../public/Pulse-1s-200px.svg";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function HomeInfo() {
  return (
    <div className="flex-1">
      <div className="relative ">
        <div
          className="relative overflow-hidden flex items-center"
          style={{ height: "calc(100vh - 56px)" }}
        >
          <Image
            src={boyYell}
            alt="Picture of the background"
            placeholder="blur"
            quality={100}
            className="object-cover w-full h-full"
          />

          <div
            className="
            absolute top-1/2 left-1/2 w-4/5 transform -translate-x-1/2 -translate-y-1/2
             text-white drop-shadow-md
             flex flex-col items-center gap-2 "
          >
            <Sentence />
           
            <div className="flex gap-3">
              <Link href="/demo">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      View Demo <ChevronsRight strokeWidth={1} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex">
                        <Image src={loadingImg} alt="loadingImg" height={20} />
                        Project Building...
                      </DialogTitle>
                      <DialogDescription>
                        Relevant discourse about the ongoing construction of the
                        project.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </Link>

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
                        Relevant discourse about the ongoing construction of the
                        project.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </Link>
            </div>
          </div>
        </div>

        {/* <div
          id="first-section"
          className=" h-screen bg-slate-300 flex items-center justify-center"
        ></div> */}
      </div>
    </div>
  );
}

export default HomeInfo;
