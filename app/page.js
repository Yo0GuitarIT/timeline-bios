"use client"

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
            samplesPerPixel: 4096,
            mono: false,
            waveHeight: 100,
            container: node,
            state: "shift",
            isAutomaticScroll: true,
            isContinuousPlay: true,
            linkEndpoints: true,
            timescale: true,
            colors: {
              waveOutlineColor: "#E0EFF1",
              timeColor: "grey",
              fadeColor: "black",
            },
            controls: {
              show: true,
              width: 200,
            },
            zoomLevels: [100, 300, 500],

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
            src: "01_Kick.wav",
            name: "Kick",
            gain: 1,
            effects: function (graphEnd, masterGainNode, isOffline) {
              const reverb = new Tone.Reverb(0.1);

              if (isOffline) {
                setUpChain.current.push(reverb.ready);
              }

              Tone.connect(graphEnd, reverb);
              Tone.connect(reverb, masterGainNode);

              return function cleanup() {
                reverb.disconnect();
                reverb.dispose();
              };
            },
          },
          // {
          //   src: "02_Snare.wav",
          //   name: "Snare",
          //   gain: 1,
          // },
          // {
          //   src: "06_Bass.wav",
          //   name: "Bass",
          //   gain: 0.8,
          // },
          // {
          //   src: "09_AcGtr1.wav",
          //   name: "AcG",
          //   gain: 1,
          // },
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
            className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
            onClick={() => {
              ee.emit("play");
            }}
          >
            Play
          </button>

          <button
            className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
            onClick={() => {
              ee.emit("pause");
            }}
          >
            Pause
          </button>

          <button
            className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
            onClick={() => {
              ee.emit("startaudiorendering", "wav");
            }}
          >
            Download
          </button>
        </div>
        <div className="p-5" ref={container}></div>
      </main>
    </>
  );
}
