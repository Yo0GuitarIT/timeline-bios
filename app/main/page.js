"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import Image from "next/image";
import EventEmitter from "events";
import WaveformPlaylist from "waveform-playlist";
import * as Tone from "tone";
import { saveAs } from "file-saver";

function Home() {
  const [ee] = useState(new EventEmitter());
  const [toneCtx, setToneCtx] = useState(null);
  const setUpChain = useRef();
  const [masterVolume, setMasterVolume] = useState(95);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadInfo, setLoadInfo] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [meterRender, setMeterRender] = useState(0);




  const clamp = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
  };

  const startVolumeMonitoring = () => {
    const meter = new Tone.Meter();
    Tone.getDestination().connect(meter);

    const logMasterVolume = () => {
      const lowerBound = -20;
      const upperBound = 3;
      const dBFS = meter.getValue();
      const dBu = dBFS + 18;
      const clamped = clamp(dBu, lowerBound, upperBound);

      const proportion = (clamped - lowerBound) / (upperBound - lowerBound);
      const graphWidth = (proportion * 100).toFixed(0);
      console.log(graphWidth);
      setMeterRender(graphWidth);

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
            state: "select",
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

        const sentsignal = Tone.getDestination();

        playlist
          .load([
            {
              src: "Trafficker_MyFatherNeverLovedMe/01.Drum.wav",
              name: "Drum",
              gain: 1,
              waveOutlineColor: "#44AF69",
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/02.Bass.wav",
              name: "Bass",
              gain: 1,
              waveOutlineColor: "#F8333C",
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/03.EG01(Stereo).wav",
              name: "Guitar 1",
              gain: 0.5,
              waveOutlineColor: "#FCAB10",
              stereoPan: 0.5,
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
            },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/04.EG01(Mono).wav",
            //   name: "Guitar 2",
            //   gain: 0.5,
            //   waveOutlineColor: "#FCAB10",
            //   stereoPan: 1,
            //   effects: function (graphEnd, masterGainNode, isOffline) {
            //     const gain = new Tone.Gain(1).toDestination();

            //     if (isOffline) {
            //       setUpChain.current.push(gain.ready);
            //     }

            //     Tone.connect(graphEnd, gain);
            //     Tone.connect(gain, masterGainNode);

            //     return function cleanup() {
            //       gain.disconnect();
            //       gain.dispose();
            //     };
            //   },
            // },
            {
              src: "Trafficker_MyFatherNeverLovedMe/05.EG02.wav",
              name: "Guitar 2",
              gain: 0.5,
              // waveOutlineColor: "#FCAB10",
              stereoPan: -0.5,
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/06.EG03.wav",
              name: "Guitar 4",
              gain: 0.5,
              // waveOutlineColor: "#FCAB10",
              stereoPan: -1,
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/07.EG solo.wav",
              name: "Guitar Solo",
              gain: 0.6,
              stereoPan: 0,
              waveOutlineColor: "#F5CAC3",
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/08.Hammond.wav",
              name: "Hammond",
              gain: 1,
              waveOutlineColor: "#2B9EB3",
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/09.Vocal.wav",
              name: "Vocal",
              gain: 1,
              waveOutlineColor: "#DBD5B5",
              effects: function (graphEnd, masterGainNode, isOffline) {
                const gain = new Tone.Gain(1).toDestination();

                if (isOffline) {
                  setUpChain.current.push(gain.ready);
                }

                Tone.connect(graphEnd, gain);
                Tone.connect(gain, masterGainNode);

                return function cleanup() {
                  gain.disconnect();
                  gain.dispose();
                };
              },
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
          <button
            className={"border border-black w-8 h-8"}
            onClick={handlePause}
          >
            <i className="fa-solid fa-pause "></i>
          </button>
          <button
            className={"border border-black w-8 h-8"}
            onClick={handlePlay}
          >
            <i className={"fa-solid fa-play "}></i>
          </button>
          <button
            className={"border border-black w-8 h-8"}
            onClick={handleStop}
          >
            <i className="fa-solid fa-stop "></i>
          </button>
          <button
            className={"border border-black w-8 h-8"}
            onClick={() => {
              ee.emit("rewind");
            }}
          >
            <i className="fa-solid fa-backward "></i>
          </button>
          <button
            className={"border border-black w-8 h-8"}
            onClick={() => {
              ee.emit("fastforward");
            }}
          >
            <i className="fa-solid fa-forward "></i>
          </button>
          <button
            className={"border btn-record border-black w-8 h-8"}
            onClick={handleRecord}
            disabled={isRecording}
          >
            <i className="fa-solid fa-microphone "></i>
          </button>
          <button
            className={"border border-black w-8 h-8"}
            onClick={() => {
              ee.emit("zoomin");
            }}
          >
            <i className="fa-solid fa-magnifying-glass-plus "></i>
          </button>
          <button
            className={"border border-black w-8 h-8"}
            onClick={() => {
              ee.emit("zoomout");
            }}
          >
            <i className="fa-solid fa-magnifying-glass-minus "></i>
          </button>

          <div className="flex border border-black gap-1 h-8 items-center px-1">
            <i className="fa-solid fa-sliders fa-lg"></i>
            <input
              type="range"
              id="masterVolume"
              name="masterVolume"
              min="-100"
              max="100"
              value={masterVolume}
              onChange={handleMasterVolChange}
            />
          </div>

          <div className="w-40 h-4 border border-black">
            <div id="meter" className="h-full bg-slate-400" style={{ width: `${meterRender}%` }}></div>
          </div>

          <button
            className={"border border-black w-8 h-8"}
            onClick={() => {
              ee.emit("startaudiorendering", "wav");
            }}
          >
            <i className="fa-solid fa-cloud-arrow-down "></i>
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

export default Home;
