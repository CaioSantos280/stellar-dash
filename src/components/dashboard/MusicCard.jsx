import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Card from "../ui/Card";

import song1 from "../../assets/music/space-song.mp3";
import song2 from "../../assets/music/interstellar.mp3";

import cover1 from "../../assets/covers/space_song.png";
import cover2 from "../../assets/covers/interstellar.png";

import { playHoverSound } from "../../utils/sound";

export default function MusicCard() {

  const playlist = [
    {
      title: "Space Song",
      artist: "Beach House",
      file: song1,
      cover: cover1,
    },
    {
      title: "Interstellar",
      artist: "Hans Zimmer",
      file: song2,
      cover: cover2,
    },
  ];

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const audioRef = useRef(null);

  const song = playlist[currentSong];

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      playHoverSound(); // 🔊 SOM SÓ AQUI (play/pause)

      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }

      setIsPlaying(!isPlaying);
    } catch (err) {
      console.log(err);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) =>
      prev === playlist.length - 1 ? 0 : prev + 1
    );
  };

  const prevSong = () => {
    setCurrentSong((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.play();
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration || 1;

      setProgress((current / total) * 100);

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
          .toString()
          .padStart(2, "0");

        return `${minutes}:${seconds}`;
      };

      setCurrentTime(formatTime(current));
      setDuration(formatTime(total));
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <Card className="h-80">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <img
            src={song.cover}
            alt="cover"
            className="w-20 h-20 rounded-2xl object-cover shadow-lg"
          />

          <div>
            <p className="text-white/50 text-sm mb-2">
              Now Playing
            </p>

            <h2 className="text-2xl font-bold">
              {song.title}
            </h2>

            <p className="text-white/60 mt-1">
              {song.artist}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-8">

        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-sm text-white/40">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>

      </div>

      <div className="mt-8 flex items-center justify-center gap-4">

        <button
          onClick={prevSong}
          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
        >
          <SkipBack size={18} />
        </button>

        {/* 🔥 SOM SÓ AQUI */}
        <button
          onClick={toggleMusic}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          {isPlaying ? (
            <Pause size={22} fill="white" />
          ) : (
            <Play size={22} fill="white" />
          )}
        </button>

        <button
          onClick={nextSong}
          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
        >
          <SkipForward size={18} />
        </button>

      </div>

      <audio ref={audioRef} src={song.file} />

    </Card>
  );
}