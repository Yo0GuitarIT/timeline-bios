"use client";

import React, { useCallback, useState, useRef } from "react";
import Script from "next/script";
import EventEmitter from "events";
import WaveformPlaylist from "waveform-playlist";
import { saveAs } from "file-saver";

function Home() {
  const [ee] = useState(new EventEmitter());
  const [toneCtx, setToneCtx] = useState(null);
  const setUpChain = useRef();
  const [masterVolume, setMasterVolume] = useState(90);

  const handleMasterVolChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setMasterVolume(newVolume);
    ee.emit("mastervolumechange", newVolume);
  };

  const container = useCallback(
    (node) => {
      if (node !== null && toneCtx !== null) {
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
            state: "cursor",
            seekStyle: "fill",
            colors: {
              waveOutlineColor: "#E0EFF1",
              timeColor: "grey",
              fadeColor: "black",
            },
            controls: {
              show: true,
              width: 200,
            },
            zoomLevels: [128, 256, 512, 1024, 2048, 4096],
          },
          ee
        );

        ee.on("loadprogress", function (percent, src) {
          const loadInfo = document.createElement("p");
          loadInfo.textContent = `Loading ${src}: ${percent}% loaded`;
          document.getElementById("load-data").appendChild(loadInfo);
          window.scrollTo(0, document.body.scrollHeight);
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
              src: "Trafficker_MyFatherNeverLovedMe/01_Kick.wav",
              name: "Kick",
              gain: 1,
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/03_Snare.wav",
              name: "Snare",
              gain: 1,
              // effects: function (graphEnd, masterGainNode, isOffline) {
              //   const reverb = new Tone.Reverb(1);

              //   if (isOffline) {
              //     setUpChain.current.push(reverb.ready);
              //   }

              //   Tone.connect(graphEnd, reverb);
              //   Tone.connect(reverb, masterGainNode);

              //   return function cleanup() {
              //     reverb.disconnect();
              //     reverb.dispose();
              //   };
              // },
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/08_Overheads.wav",
              name: "Overheads",
              gain: 0.5,
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/14_ElecGtr01Mic1.wav",
              name: "Guitar",
              gain: 0.5,
              stereoPan: 0.5,
            },
            {
              src: "Trafficker_MyFatherNeverLovedMe/13_BassAmp.wav",
              name: "Bass",
              gain: 0.4,
              stereoPan: -0.5,
            },
          ])
          .then(function () {
            ee.emit("loadprogress", 100, "all songs");
            setTimeout(() => {
              const loadData = document.getElementById("load-data");
              const mainPlay = document.getElementById("main-play");
              loadData.style.display = "none";
              // mainPlay.style.display = "block";
            },1000)
          });

        playlist.initExporter();
      }
    },
    [ee, toneCtx]
  );

  function handleLoad() {
    setToneCtx(Tone.getContext());
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.37/Tone.js"
        onLoad={handleLoad}
      />
      <div id="load-data"></div>
      <main id="main-play" className={"hidden"}>
        <div className={"flex flex-wrap justify-center gap-7 mt-2"}>
          <button
            className={"border"}
            onClick={() => {
              ee.emit("pause");
            }}
          >
            Pause
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("play");
            }}
          >
            Play
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("stop");
            }}
          >
            Stop
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("rewind");
            }}
          >
            Backward
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("fastforward");
            }}
          >
            Forward
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("record");
            }}
          >
            Record
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("zoomin");
            }}
          >
            Zoom In
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("zoomout");
            }}
          >
            Zoom Out
          </button>
        </div>

        <div className="px-1 border" ref={container}></div>

        <div className="flex justify-center gap-1">
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

          <button
            className={"border"}
            onClick={() => {
              ee.emit("startaudiorendering", "wav");
            }}
          >
            Download
          </button>
        </div>

        <div id="load-data"></div>
      </main>
    </>
  );
}

export default Home;
