"use client";

import React, { useCallback, useState, useRef } from "react";
import Script from "next/script";
import EventEmitter from "events";
import WaveformPlaylist from "waveform-playlist";
import { saveAs } from "file-saver";

export default function Home() {
  const [ee] = useState(new EventEmitter());
  const [toneCtx, setToneCtx] = useState(null);
  const setUpChain = useRef();

  const container = useCallback(
    (node) => {
      if (node !== null && toneCtx !== null) {
        const playlist = WaveformPlaylist(
          {
            ac: toneCtx.rawContext,
            samplesPerPixel: 1024,
            mono: true,
            waveHeight: 100,
            container: node,
            state: "cursor",
            isAutomaticScroll: true,
            isContinuousPlay: true,
            linkEndpoints: true,
            timescale: true,
            seekStyle: "cursor",
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

        playlist.load([
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
            gain: 0.8,
          },
          {
            src: "Trafficker_MyFatherNeverLovedMe/14_ElecGtr01Mic1.wav",
            name: "Guitar 1",
            gain: 1,
            stereoPan: -0.5,
          },
          {
            src: "Trafficker_MyFatherNeverLovedMe/18_ElecGtr02Mic1.wav",
            name: "Guitar 2",
            gain: 1,
            stereoPan: -1,
          },
          {
            src: "Trafficker_MyFatherNeverLovedMe/23_ElecGtr03Mic1.wav",
            name: "Guitar 3",
            gain: 1,
            stereoPan: 1,
          },
          {
            src: "Trafficker_MyFatherNeverLovedMe/25_ElecGtr04Mic1.wav",
            name: "Guitar 4",
            gain: 1,
            stereoPan: 0,
          },
          {
            src: "Trafficker_MyFatherNeverLovedMe/13_BassAmp.wav",
            name: "Bass",
            gain: 1,
          },
          {
            src: "Trafficker_MyFatherNeverLovedMe/32_LeadVox.wav",
            name: "Vocal",
            gain: 1,
          },
          {
            src: "Trafficker_MyFatherNeverLovedMe/31_Hammond.wav",
            name: "Hamond",
            gain: 1,
          },
        ]);

        //initialize the WAV exporter.
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
      <main>
        <div className={"flex gap-1 p-3"}>
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
              ee.emit("pause");
            }}
          >
            Pause
          </button>

          <button
            className={"border"}
            onClick={() => {
              ee.emit("startaudiorendering", "wav");
            }}
          >
            Download
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

          <div className={"track-drop border"}> Drop file</div>
        </div>
        <div className="p-5" ref={container}></div>
      </main>
    </>
  );
}
