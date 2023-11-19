"use client";

import React, { useCallback, useState, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import EventEmitter from "events";
import WaveformPlaylist from "waveform-playlist";
import { saveAs } from "file-saver";

function Home() {
  const [ee] = useState(new EventEmitter());
  const [toneCtx, setToneCtx] = useState(null);
  const setUpChain = useRef();
  const [masterVolume, setMasterVolume] = useState(95);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadInfo, setLoadInfo] = useState("");
  const [isRecording, setIsRecording] = useState(false);

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
    loadData.classList.remove(
      "opacity-0",
      "duration-1000",
      "hidden"
    );
    loadData.classList.add(
      "opacity-70",
      "duration-500"
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-enter");

    const loadData = document.getElementById("load-data");
    loadData.classList.remove(
      "opacity-70",
    );

    loadData.classList.add(
      "opacity-0",
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-enter");

    let dropEvent = e.dataTransfer;
    for (let i = 0; i < dropEvent.files.length; i++) {
      ee.emit("newtrack", dropEvent.files[i]);
    };

    const loadData = document.getElementById("load-data");

    setTimeout(() => {
      loadData.classList.remove(
        "opacity-70",
      );

      loadData.classList.add(
        "opacity-0",
      );
      setTimeout(() => {
        loadData.classList.add("hidden");
      }, 500);
    }, 2000)
  };

  const handleRecord = () => {
    setIsRecording(true);
    ee.emit("record");
  }

  const handleStop = () => {
    setIsRecording(false);
    ee.emit("stop");
  }

  const handleLoad = () => {
    setToneCtx(Tone.getContext());
  }

  const container = useCallback(
    (node) => {
      if (node !== null && toneCtx !== null) {

        const gotStream = (stream) => {
          userMediaStream = stream;
          playlist.initRecorder(userMediaStream);
        }

        const logError = (err) => {
          console.error(err);
        }

        let userMediaStream;
        let constraints = { audio: true };

        navigator.getUserMedia = (navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);

        if (navigator.mediaDevices) {
          navigator.mediaDevices.getUserMedia(constraints)
            .then(gotStream)
            .catch(logError);
        } else if (navigator.getUserMedia && 'MediaRecorder' in window) {
          navigator.getUserMedia(
            constraints,
            gotStream,
            logError
          );
        }

        const playlist = WaveformPlaylist(
          {
            ac: toneCtx.rawContext,
            samplesPerPixel: 4096,
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
              waveOutlineColor: "#E0EFF1",
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

        playlist
          .load([
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/01.Drum.wav",
            //   name: "Drum",
            //   gain: 1,
            //   waveOutlineColor: "#F28482",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/02.Bass.wav",
            //   name: "Bass",
            //   gain: 1,
            //   waveOutlineColor: "#F7EDE2",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/03.EG01(Stereo).wav",
            //   name: "Guitar 1",
            //   gain: 0.5,
            //   waveOutlineColor: "#F5CAC3",
            //   stereoPan: 0.5,
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/04.EG01(Mono).wav",
            //   name: "Guitar 1",
            //   gain: 0.5,
            //   waveOutlineColor: "#F5CAC3",
            //   stereoPan: 1,
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/05.EG02.wav",
            //   name: "Guitar 2",
            //   gain: 0.5,
            //   waveOutlineColor: "#F5CAC3",
            //   stereoPan: -0.5,
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/06.EG03.wav",
            //   name: "Guitar 3",
            //   gain: 0.5,
            //   waveOutlineColor: "#F5CAC3",
            //   stereoPan: -1,
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/07.EG solo.wav",
            //   name: "Guitar Solo",
            //   gain: 1,
            //   waveOutlineColor: "#F5CAC3",
            //   effects: function (graphEnd, masterGainNode, isOffline) {
            //     const gain = new Tone.Gain(1.5);
                
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
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/08.Hammond.wav",
            //   name: "Hammond",
            //   gain: 1,
            //   waveOutlineColor: "#84A59D",
            // },
            // {
            //   src: "Trafficker_MyFatherNeverLovedMe/09.Vocal.wav",
            //   name: "Vocal",
            //   gain: 1,
            //   waveOutlineColor: "#F28482",
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
              loadData.classList.add(
                "hidden",
              )
            }, 1000);
          });

        playlist.initExporter();
      }
    },
    [ee, toneCtx]
  );

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.37/Tone.js"
        onLoad={handleLoad}
      />
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
            "bg-gray-300 w-screen h-12 flex justify-center items-center gap-7 box-border sticky top-0 z-20"
          }
        >
          <button className={"border"} onClick={() => { ee.emit("pause"); }}>Pause</button>
          <button className={"border"} onClick={() => { ee.emit("play"); }}>Play</button>
          <button className={"border"} onClick={handleStop}>Stop</button>
          <button className={"border"} onClick={() => { ee.emit("rewind"); }}>Backward</button>
          <button className={"border"} onClick={() => { ee.emit("fastforward"); }}>Forward</button>
          <button className={"border btn-record"} onClick={handleRecord} disabled={isRecording}>Record</button>
          <button className={"border"} onClick={() => { ee.emit("zoomin"); }}>Zoom In</button>
          <button className={"border"} onClick={() => { ee.emit("zoomout"); }}>Zoom Out</button>

          <div className="flex border ">
            <label className="w-40" htmlFor="masterVolume">
              Master Volume: {masterVolume}{" "}
            </label>
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

          <button className={"border"} onClick={() => { ee.emit("startaudiorendering", "wav"); }}>
            Download
          </button>
        </div>

        <div
          className={"border w-screen box-border relative -top-7 px-4"}
          ref={container}
        ></div>

        <div
          className={
            "track-drop w-72 h-20 box-border border-2 border-dashed border-yellow-500 text-center relative left-1/2 -translate-x-1/2 mb-8"}
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