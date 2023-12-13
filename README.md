# [timelineβίος](https://timelinebios.vercel.app/)

Experience a powerful online Digital Audio Workstation (DAW) at timelineβίος.
Elevate your music editing game with user-friendly tools designed to inspire creativity.

### Demo: https://timelinebios.vercel.app/
![Recording 2023-12-13 at 15 48 43](https://github.com/Yo0GuitarIT/timeline-bios/assets/118150842/05590245-eabe-461e-8c5f-67cd5dad65a8)



# Main Feature
### Recording
Real-time recording functionality with the ability to visualize audio waveforms.
![Recording 2023-12-14 at 00 29 50](https://github.com/Yo0GuitarIT/timeline-bios/assets/118150842/88e066a0-64ab-46cd-a0e4-0a3f33ed8299)

### Audio Editing
  - Play selected range.
  - Cut audio segments.
  - Drag and drop in the timeline.
  - Fade in & fade out. 
![Recording 2023-12-14 at 00 13 24](https://github.com/Yo0GuitarIT/timeline-bios/assets/118150842/20b01b5e-4a88-40ad-acdc-b0edc6695d4f)

### Track Playing
  - Support for single and multiple track playback.
  - Each audio track can be muted or soloed, and the volume can be adjusted.
![Recording 2023-12-14 at 00 16 40](https://github.com/Yo0GuitarIT/timeline-bios/assets/118150842/7cbc4929-8ae8-4ee6-8c2b-89b47ef4283b)

### Upload & Download File
  - Support for various audio formats input
  - Compile and export files in WAV format.
![Recording 2023-12-14 at 00 19 01](https://github.com/Yo0GuitarIT/timeline-bios/assets/118150842/93526fc1-3b39-424e-b2fc-517473627910)

# FrontEnd Technique
### React Conponents & props
### React Hooks
### Nextjs 
  - Link
  - Image

# Backend Technique
### Vercel
- Completed online deployment of the backend server.

# Audio
### Web Audio API
- Handling web audio input processing.
### Waveform-playlist
- Integrating DAW conceptual functionalities and structure, utilizing its provided API for website development.
### Tone.js
- Managing audio effects.

# Working process
### event-emitter
- Sending events for the Playlist, handling audio recording, editing, and file uploading.
### File-saver
- Downloading integrated audio to local storage.

# UI/UX
### Shadcn Radix
- Unified web page style theme, supporting both light and dark themes.
### Lucide Icon
- High-quality, beautiful icons.
### zustand
- Managing button states, guiding users to operate functionalities correctly.


# Git
### Version control
### Git flow
### Git-cz

# Other 
### canvas
- Drawing dynamic volume feedback.
### typed.js
- Presenting typewriter animation effect on the homepage.


# Artictecture
### Main Features and Related Technical 
![截圖 2023-12-13 下午11 34 37](https://github.com/Yo0GuitarIT/timeline-bios/assets/118150842/a6ca2b32-c714-423f-ba3d-798164cf763c)


### User Experience
- Zustand State Management
- Hover Card
- Loaing Progress
![截圖 2023-12-13 下午11 40 04](https://github.com/Yo0GuitarIT/timeline-bios/assets/118150842/df912a8a-db06-4114-8cc1-a6d9977ac0c4)

### Folder Structure
```
project-root
├── app
│   ├── default
│   │   └── page.jsx
│   ├── demo
│   │   └── page.jsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.jsx
├── components
│   ├── DisplayContainer.jsx
│   ├── ExportButton.jsx
│   ├── Footer.jsx
│   ├── HomeInfo.jsx
│   ├── HomePageNavbar.jsx
│   ├── ImportArea.jsx
│   ├── InitialLoader.jsx
│   ├── MainHeader.jsx
│   ├── MasterVolController.jsx
│   ├── MasterVolMonitor.jsx
│   ├── ModeToggle.jsx
│   ├── ProjectTittle.jsx
│   ├── Sentence.jsx
│   ├── TittleTimelinebios.jsx
│   ├── UserGuide.jsx
│   ├── btnComponents
│   │   ├── DefaultBtn.jsx
│   │   ├── DemoBtn.jsx
│   │   ├── FadeInBtn.jsx
│   │   ├── FadeOutBtn.jsx
│   │   ├── FastforwardBtn.jsx
│   │   ├── PauseBtn.jsx
│   │   ├── PlayBtn.jsx
│   │   ├── RecordBtn.jsx
│   │   ├── RewindBtn.jsx
│   │   ├── SelectBtn.jsx
│   │   ├── ShiftBtn.jsx
│   │   ├── StartBtn.jsx
│   │   ├── StopBtn.jsx
│   │   ├── TrimBtn.jsx
│   │   ├── ZoomInBtn.jsx
│   │   └── ZoomOutBtn.jsx
│   ├── pannels
│   │   ├── EditPannel.jsx
│   │   ├── PlayPannel.jsx
│   │   └── ViewPannel.jsx
│   ├── theme-provider.tsx
│   └── ui
│       ├── button.jsx
│       ├── dialog.jsx
│       ├── dropdown-menu.jsx
│       ├── hover-card.jsx
│       ├── input.jsx
│       ├── progress.jsx
│       ├── scroll-area.jsx
│       ├── separator.jsx
│       ├── sheet.jsx
│       ├── slider.jsx
│       ├── toast.jsx
│       ├── toaster.jsx
│       ├── toggle-group.jsx
│       ├── toggle.jsx
│       └── use-toast.js
├── lib
│   └── utils.js
├── public
│   ├── Pulse-1s-200px.svg
│   ├── jason-rosewell-ASKeuOZqhYU-unsplash.jpg
│   ├── next.svg
│   └── soundTrack
│       ├── 01.Drum.mp3
│       ├── 02.Bass.mp3
│       ├── 03.EG01(Stereo).mp3
│       ├── 04.EG02(Stereo).mp3
│       ├── 05.EG(Solo).mp3
│       ├── 06.Hammond.mp3
│       └── 07.Vocal.mp3
└── stores
    ├── editButtonStore.js
    └── playbackButtonStrore.js
```

# Audio Demo
Trafficker -My father never loved me

# Contact
- 陳祐霖 Yu Ling Chen
- Email: yo0.guitar.it@gmail.com
