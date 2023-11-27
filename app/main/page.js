"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import Image from "next/image";
import EventEmitter from "events";
import WaveformPlaylist from "waveform-playlist";
import * as Tone from "tone";
import { saveAs } from "file-saver";

import {
  Pause, Play, Square, Circle, ZoomIn, ZoomOut, SlidersHorizontal, TriangleRight, Download, Rewind, FastForward, MousePointer2, Brackets, MoveHorizontal,Spline
} from "lucide-react";

function MainPage() {
  const [ee] = useState(new EventEmitter());
  const [toneCtx, setToneCtx] = useState(null);
  const [masterVolume, setMasterVolume] = useState(100);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadInfo, setLoadInfo] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const setUpChain = useRef();

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

      const mappedValue = (clamped - lowerBound) / (upperBound - lowerBound) * 300;
      const Width = Math.max(0, Math.min(300, mappedValue)).toFixed(1);

      console.log(clamped);

      meterCtx.clearRect(0, 0, meterWidth, meterHeight);
      meterCtx.fillStyle = meterGradient;
      meterCtx.fillRect(0, 0, Width, meterHeight);
      requestAnimationFrame(logMasterVolume);

    };
    requestAnimationFrame(logMasterVolume);

  };

  useEffect(() => {
    setToneCtx(Tone.getContext());
  }, []);

  const handleMasterVolChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setMasterVolume(newVolume);
    ee.emit("mastervolumechange", newVolume);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-enter");
    setLoadProgress(0);
    setLoadInfo("Now");

    const loadData = document.getElementById("load-data");
    loadData.classList.remove("opacity-0", "duration-1000", "hidden");
    loadData.classList.add("opacity-70", "duration-500");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-enter");

    const loadData = document.getElementById("load-data");
    loadData.classList.remove("opacity-70");

    loadData.classList.add("opacity-0");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-enter");

    let dropEvent = e.dataTransfer;
    for (let i = 0; i < dropEvent.files.length; i++) {
      ee.emit("newtrack", dropEvent.files[i]);
    }

    const loadData = document.getElementById("load-data");

    setTimeout(() => {
      loadData.classList.remove("opacity-70");

      loadData.classList.add("opacity-0");
      setTimeout(() => {
        loadData.classList.add("hidden");
      }, 500);
    }, 2000);
  };

  const handleRecord = () => {
    setIsRecording(true);
    ee.emit("record");
  };

  const handlePlay = () => {
    console.log("playing");
    ee.emit("play");
    startVolumeMonitoring();
  };

  const handlePause = () => {
    console.log("pause");
    ee.emit("pause");
  };

  const handleStop = () => {
    console.log("stoping");
    setIsRecording(false);
    ee.emit("stop");
  };

  const handleZoomIn = () => ee.emit("zoomin");
  const handleZoomOut = () => ee.emit("zoomout");
  const handleRewind = () => ee.emit("rewind");
  const handleFastforward = () => ee.emit("fastforward");
  const stateCursor = () => ee.emit("statechange", "cursor");
  const stateSelect = () => ee.emit("statechange", "select");
  const stateFadeIn = () => ee.emit("statechange","fadein")
  const stateFadeOut = () => ee.emit("statechange", "fadeout")
  const stateShift = () => ee.emit("statechange", "shift")

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
            {
              src: "Trafficker_MyFatherNeverLovedMe/01.Drum.wav",
              name: "Drum",
              gain: 0.5,
              waveOutlineColor: "#44AF69",
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/02.Bass.wav",
              name: "Bass",
              gain: 1,
              waveOutlineColor: "#F8333C",
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/03.EG01(Stereo).wav",
              name: "GT Rhythm (Strero)",
              gain: 0.3,
              waveOutlineColor: "#FCAB10",
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/04.EG01(Mono).wav",
              name: "GT Rhythm (Mono)",
              gain: 0.3,
              // waveOutlineColor: "#FCAB10",
              stereoPan: 0.7
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/05.EG02.wav",
              name: "GT 2",
              gain: 0.5,
              // waveOutlineColor: "#FCAB10",
              stereoPan: -0.8,
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/06.EG03.wav",
              name: "GT 3",
              gain: 0.4,
              // waveOutlineColor: "#FCAB10",
              stereoPan: -0.7,
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/07.EG solo.wav",
              name: "Guitar Solo",
              gain: 0.3,
              waveOutlineColor: "#F5CAC3",
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/08.Hammond.wav",
              name: "Hammond",
              gain: 1,
              waveOutlineColor: "#2B9EB3",
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/09.Vocal.wav",
              name: "Vocal",
              gain: 0.5,
              waveOutlineColor: "#DBD5B5",

            },
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
            <Image
              src={"Pulse-1s-200px.svg"}
              alt="loading"
              width={30}
              height={30}
            ></Image>
            Loaded{loadProgress}%
          </div>
          <p>{`=> Loading ${loadInfo}`}</p>
          <div className="border-2 border-dashed rounded border-blue-900">
            <div
              className="bg-yellow-500 h-5 rounded"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <main id="main-play" className={"hidden absolute opacity-0"}>
        <div
          id="navbar"
          className={
            "bg-white bg-opacity-50 backdrop-blur-md w-screen h-14 flex justify-center items-center gap-7 box-border border-b sticky top-0 z-20 "
          }
        >

          <div className="flex gap-2">
            <button onClick={handlePause} >
              <Pause />
            </button>
            <button onClick={handlePlay}>
              <Play />
            </button>
            <button onClick={handleStop} >
              <Square />
            </button>
            <button onClick={handleRewind}>
              <Rewind />
            </button>
            <button onClick={handleFastforward}>
              <FastForward />
            </button>
            <button
              id="record-button"
              onClick={handleRecord}
              disabled={isRecording}
            >
              <Circle color="red" fill="red" />
            </button>
            <button onClick={handleZoomIn}>
              < ZoomIn />
            </button>
            <button onClick={handleZoomOut}>
              <ZoomOut />
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={stateCursor} > 
              <MousePointer2 />
              <p>Cursor</p>
            </button>

            <button onClick={stateSelect}>
              <Brackets />
              <p>Select</p>
            </button>

            <button onClick={stateShift}>
              <MoveHorizontal />
              <p>Shift</p>
            </button>

            <button onClick={stateFadeIn}>
              <Spline />
              <p>Fade-In</p>
            </button>
            
            <button onClick={stateFadeOut}>
              <Spline /> 
              <p>Fade-Out</p>
            </button>

          </div>

          <div className="flex gap-1 h-8 items-center px-1">
            <SlidersHorizontal />
            <input
              type="range"
              id="masterVolume"
              name="masterVolume"
              min="0"
              max="100"
              value={masterVolume}
              onChange={handleMasterVolChange}
            />
          </div>

          <div id="meterConatiner" className=" flex gap-1 items-center">
            <TriangleRight />
            <canvas id="meterCanvas" className="w-40 h-4 border-2 border-dashed"></canvas>
          </div>

          <button
            onClick={() => {
              ee.emit("startaudiorendering", "wav");
            }}
          >
            <Download />
          </button>

        </div>

        <div
          className={"w-screen box-border relative -top-7 px-4"}
          ref={container}
        ></div>

        <div
          className={
            "track-drop w-72 h-20 box-border border-2 border-dashed border-yellow-500 text-center relative left-1/2 -translate-x-1/2 mb-8"
          }
          onDragEnter={(e) => handleDragEnter(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDrop={(e) => handleDrop(e)}
        >
          Drag Audio here
        </div>
      </main>
    </>
  );
}

export default MainPage;
