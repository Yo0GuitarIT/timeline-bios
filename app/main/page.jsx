"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import Image from "next/image";
import EventEmitter from "events";
import WaveformPlaylist from "waveform-playlist";
import * as Tone from "tone";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";

import { ArrowBigRightDash, Terminal } from "lucide-react";
import loadImg from "@/public/Pulse-1s-200px.svg";
import MasterVolController from "@/components/MasterVolController";
import MasterVolMonitor from "@/components/MasterVolMonitor";
import ExportButton from "@/components/ExportButton";
import PlayPannel from "@/components/pannels/PlayPannel";
import ViewPannel from "@/components/pannels/ViewPannel";
import EditPannel from "@/components/pannels/EditPannel";
import ImportArea from "@/components/ImportArea";
import Timelinebios from "@/components/TittleTimelinebios";
import { ModeToggle } from "@/components/ModeToggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function MainPage() {
  const [ee] = useState(new EventEmitter());
  const [toneCtx, setToneCtx] = useState(null);
  const [masterVolume, setMasterVolume] = useState([80]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadInfo, setLoadInfo] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(
    "Click or Drag Audio File Here"
  );
  const [isVisible, setIsVisible] = useState(false);

  const setUpChain = useRef();

  useEffect(() => {
    setToneCtx(Tone.getContext());
    startVolumeMonitoring();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clamp = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
  };

  const startVolumeMonitoring = () => {
    const meterCanvas = document.getElementById("meterCanvas");
    const meterCtx = meterCanvas.getContext("2d");

    const meterWidth = meterCanvas.width;
    const meterHeight = meterCanvas.height;

    const meterGradient = meterCtx.createLinearGradient(0, 0, meterWidth, 0);
    meterGradient.addColorStop(0, "#a6a6a6");
    meterGradient.addColorStop(1, "#5a5a5a");

    const meter = new Tone.Meter();
    Tone.getDestination().connect(meter);

    const logMasterVolume = () => {
      const lowerBound = -30;
      const upperBound = 3;
      const dBFS = meter.getValue();
      const dBu = dBFS + 18;
      const clamped = clamp(dBu, lowerBound, upperBound).toFixed(1);

      const mappedValue =
        ((clamped - lowerBound) / (upperBound - lowerBound)) * 300;
      const Width = Math.max(0, Math.min(300, mappedValue)).toFixed(1);

      meterCtx.clearRect(0, 0, meterWidth, meterHeight);
      meterCtx.fillStyle = meterGradient;
      meterCtx.fillRect(0, 0, Width, meterHeight);
      requestAnimationFrame(logMasterVolume);
    };
    requestAnimationFrame(logMasterVolume);
  };

  const handleMasterVolChange = (newVolume) => {
    setMasterVolume(newVolume);
    ee.emit("mastervolumechange", newVolume);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-enter");
    setLoadProgress(0);
    setLoadInfo("Now");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-enter");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-enter");
    let dropEvent = e.dataTransfer;
    for (let i = 0; i < dropEvent.files.length; i++) {
      ee.emit("newtrack", dropEvent.files[i]);
    }
    setUploadMessage("Click or Drag Audio File Here");
    setIsUpload(false);
    toggleVisibility();
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
      ee.emit("newtrack", files[i]);
    }
    setUploadMessage("Click or Drag Audio File Here");
    setIsUpload(false);
    toggleVisibility();
  };

  const handleFileInputChange = () => {
    setUploadMessage("Click Right =>");
    setIsUpload(true);
  };

  const toggleVisibility = () => {
    setTimeout(() => {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }, 2000);
  };

  const handleRecord = () => {
    setIsRecording(true);
    ee.emit("record");
  };

  const handlePlay = () => ee.emit("play");
  const handlePause = () => ee.emit("pause");

  const handleStop = () => {
    setIsRecording(false);
    ee.emit("stop");
  };

  const handleTrim = () => ee.emit("trim");
  const handleZoomIn = () => ee.emit("zoomin");
  const handleZoomOut = () => ee.emit("zoomout");
  const handleRewind = () => ee.emit("rewind");
  const handleFastforward = () => ee.emit("fastforward");
  const stateCursor = () => ee.emit("statechange", "cursor");
  const stateSelect = () => ee.emit("statechange", "select");
  const stateFadeIn = () => ee.emit("statechange", "fadein");
  const stateFadeOut = () => ee.emit("statechange", "fadeout");
  const stateShift = () => ee.emit("statechange", "shift");
  const handleExport = () => ee.emit("startaudiorendering", "wav");

  const container = useCallback(
    (node) => {
      if (node !== null && toneCtx !== null) {
        const gotStream = (stream) => {
          userMediaStream = stream;
          playlist.initRecorder(userMediaStream);
        };

        const logError = (err) => {
          console.error(err);
        };

        let userMediaStream;
        let constraints = { audio: true };

        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

        if (navigator.mediaDevices) {
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(gotStream)
            .catch(logError);
        } else if (navigator.getUserMedia && "MediaRecorder" in window) {
          navigator.getUserMedia(constraints, gotStream, logError);
        }

        const playlist = WaveformPlaylist(
          {
            ac: toneCtx.rawContext,
            samplesPerPixel: 2048,
            mono: true,
            waveHeight: 100,
            container: node,
            isAutomaticScroll: true,
            isContinuousPlay: true,
            linkEndpoints: true,
            timescale: true,
            exclSolo: true,
            state: "cursor",
            seekStyle: "fill",
            colors: {
              waveOutlineColor: "#c5baaf",
              timeColor: "gray",
              fadeColor: "black",
            },
            controls: {
              show: true,
              width: 200,
            },
            zoomLevels: [256, 512, 1024, 2048, 4096, 8192],

            effects: function (graphEnd, masterGainNode, isOffline) {
              const volume = new Tone.Volume(0).toDestination();

              if (isOffline) {
                setUpChain.current.push(volume.ready);
              }

              Tone.connect(graphEnd, volume);
              Tone.connect(volume, masterGainNode);

              return function cleanup() {
                volume.disconnect();
                volume.dispose();
              };
            },
          },
          ee
        );

        ee.on("loadprogress", function (percent, src) {
          const progress = percent.toFixed(2);
          setLoadProgress(progress);
          setLoadInfo(src);
        });

        ee.on("audiorenderingstarting", function (offlineCtx, a) {
          // Set Tone offline to render effects properly.
          const offlineContext = new Tone.OfflineContext(offlineCtx);
          Tone.setContext(offlineContext);
          setUpChain.current = a;
        });

        ee.on("audiorenderingfinished", function (type, data) {
          //restore original ctx for further use.
          Tone.setContext(toneCtx);
          if (type === "wav") {
            saveAs(data, "test.wav");
          }
        });

        playlist
          .load([
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/01.Drum.wav",
            //   name: "Drum",
            //   gain: 0.5,
            //   waveOutlineColor: "#44AF69",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/02.Bass.wav",
            //   name: "Bass",
            //   gain: 1,
            //   waveOutlineColor: "#F8333C",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/03.EG01(Stereo).wav",
            //   name: "GT Rhythm (Strero)",
            //   gain: 0.3,
            //   waveOutlineColor: "#FCAB10",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/04.EG01(Mono).wav",
            //   name: "GT Rhythm (Mono)",
            //   gain: 0.3,
            //   // waveOutlineColor: "#FCAB10",
            //   stereoPan: 0.7,
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/05.EG02.wav",
            //   name: "GT 2",
            //   gain: 0.5,
            //   // waveOutlineColor: "#FCAB10",
            //   stereoPan: -0.8,
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/06.EG03.wav",
            //   name: "GT 3",
            //   gain: 0.4,
            //   // waveOutlineColor: "#FCAB10",
            //   stereoPan: -0.7,
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/07.EG solo.wav",
            //   name: "Guitar Solo",
            //   gain: 0.3,
            //   waveOutlineColor: "#F5CAC3",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/08.Hammond.wav",
            //   name: "Hammond",
            //   gain: 1,
            //   waveOutlineColor: "#2B9EB3",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/09.Vocal.wav",
            //   name: "Vocal",
            //   gain: 0.5,
            //   waveOutlineColor: "#DBD5B5",
            // },
          ])
          .then(function () {
            ee.emit("loadprogress", 100, "all tracks ; )");
            const loadData = document.getElementById("load-data");
            const mainPlay = document.getElementById("main-play");

            loadData.classList.add(
              "opacity-0",
              "transition-opacity",
              "ease-in",
              "duration-1000"
            );

            mainPlay.classList.remove("hidden");

            setTimeout(() => {
              mainPlay.classList.add(
                "opacity-100",
                "transition-opacity",
                "ease-in",
                "duration-1000"
              );
              loadData.classList.add("hidden");
            }, 1000);
          });
        playlist.initExporter();
      }
    },
    [ee, toneCtx]
  );

  return (
    <>
      <div id="load-data" className="w-screen h-screen absolute">
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-4 z-30">
          <div className="flex items-center">
            <Image src={loadImg} alt="loading" width={20} height={20}></Image>
            Loaded{loadProgress}%
          </div>

          <div className="flex items-center">
            <ArrowBigRightDash strokeWidth={1.5} />
            <p>{`Loading ${loadInfo}`}</p>
          </div>

          <div className="mt-1 rounded border-2 border-collapse">
            <div
              className="bg-yellow-500 h-5 rounded"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <main
        id="main-play"
        className={"opacity-0 flex flex-col relative min-h-screen items-center"}
      >
        <div className="w-full h-14 flex items-center sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex items-center justify-between gap-px">
            <div className="hidden md:flex">
              <Timelinebios />
            </div>

            {/* <div className="w-60">
              <Input
                placeholder="Project Name"
                defaultValue="My father Never Loves Me"
                className="text-center text-md"
              />
            </div> */}

            <MasterVolMonitor />
            <ModeToggle />
          </div>
        </div>

        <div className="absolute z-0 w-full h-full box-border py-8 overflow-y-auto">
          <div className={"w-full box-border"} ref={container}></div>
        </div>

        <div className="w-full h-16 border-t flex justify-around items-center absolute bottom-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <MasterVolController
            masterVolume={masterVolume}
            handleMasterVolChange={handleMasterVolChange}
          />

          <PlayPannel
            handlePause={handlePause}
            handlePlay={handlePlay}
            handleStop={handleStop}
            handleRewind={handleRewind}
            handleFastforward={handleFastforward}
            handleRecord={handleRecord}
            isRecording={isRecording}
          />

          <ViewPannel
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
          />

          <EditPannel
            stateCursor={stateCursor}
            stateSelect={stateSelect}
            stateShift={stateShift}
            stateFadeIn={stateFadeIn}
            stateFadeOut={stateFadeOut}
            handleTrim={handleTrim}
          />

          <ImportArea
            handleUploadFile={(e) => handleUploadFile(e)}
            handleDragEnter={handleDragEnter}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            loadProgress={loadProgress}
            handleFileInputChange={handleFileInputChange}
            uploadMessage={uploadMessage}
            isUpload={isUpload}
          />

          <ExportButton handleExport={handleExport} />
        </div>

        <AnimatePresence>
          {isVisible && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5  }}
            >
              <Alert className="absolute right-0 z-50 w-72 m-4 bg-yellow-400">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Done</AlertTitle>
                <AlertDescription>
                  The data has been uploaded successfully.
                </AlertDescription>
              </Alert>
            </motion.h1>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default MainPage;
