import React, { useRef, useState } from "react";
import play from '../../../public/tocar.svg'
import styles from './styles.module.css';

const RadioPlayer: React.FC = () => {

    const audioRef: React.RefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const radioUrl: string = "https://one21expreso.onrender.com/radio";

    const toglePlay = (): void => {
        if(audioRef.current){
            if(isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.src = `${radioUrl}?t=${Date.now()}`;
                audioRef.current.load();
                audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((error) => console.log("No se pudo reproducir:", error));
            };
        };
    };
  return (
    <div>
      <audio ref={audioRef}>
        <source src={radioUrl} type="audio/mpeg"/>
        Tu navegador no soporta audio.
      </audio>
      <div>
        <button className={isPlaying ? styles["live-radio-button"] : styles["off-radio-button"]} onClick={toglePlay}>
            { !isPlaying && <img src={play} className='playing'></img>}
            RADIO EN VIVO
            <div className="wave-icon">
                <svg viewBox="0 0 24 8" width="24" height="8">
                    <path
                        d="M0,4 C2,0 4,8 6,4 C8,0 10,8 12,4 C14,0 16,8 18,4 C20,0 22,8 24,4"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        fill="none"
                    />
                </svg>
            </div>
        </button>
      </div>
    </div>
  );
};

export default RadioPlayer;