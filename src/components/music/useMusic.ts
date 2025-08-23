import { useState, useEffect, useRef } from 'react';

export const useMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.6);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isVisible, setIsVisible] = useState(false); // Inicia cerrado
    
    const audioRef = useRef<HTMLAudioElement>(null);

    // Inicializar audio al montar el componente
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.loop = true; // Reproducción automática al finalizar
        }
    }, []);

    // Reproducir automáticamente al montar
    useEffect(() => {
        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    // Intentar reproducir inmediatamente
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (error) {
                console.log('Autoplay blocked, trying with user interaction');
                
                // Si falla, intentar reproducir cuando el usuario interactúe
                const handleUserInteraction = async () => {
                    try {
                        if (audioRef.current && !isPlaying) {
                            await audioRef.current.play();
                            setIsPlaying(true);
                        }
                        // Remover listeners después de reproducir
                        document.removeEventListener('click', handleUserInteraction);
                        document.removeEventListener('keydown', handleUserInteraction);
                        document.removeEventListener('touchstart', handleUserInteraction);
                    } catch (error) {
                        console.log('Play failed even with user interaction');
                    }
                };

                // Agregar listeners para detectar interacción del usuario
                document.addEventListener('click', handleUserInteraction, { once: true });
                document.addEventListener('keydown', handleUserInteraction, { once: true });
                document.addEventListener('touchstart', handleUserInteraction, { once: true });
            }
        };
        
        // Pequeño delay para asegurar que el audio esté listo
        const timer = setTimeout(playAudio, 100);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // Actualizar tiempo actual
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateTime);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateTime);
        };
    }, []);

    // Controlar volumen
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.log('Play failed');
            }
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };

    const handleSeek = (newTime: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return {
        isPlaying,
        volume,
        currentTime,
        duration,
        isVisible,
        togglePlay,
        handleVolumeChange,
        handleSeek,
        toggleVisibility,
        formatTime,
        audioRef,
    };
};