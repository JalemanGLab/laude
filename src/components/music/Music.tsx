import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Minimize2, Music2 } from 'lucide-react';
import { useMusic } from "./useMusic";
import audioFile from '@/assets/mp3/audio.mp3';

export const Music = () => {
    const {
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
    } = useMusic();

    return (
        <>
            {/* Audio Element */}
            <audio ref={audioRef} src={audioFile} preload="metadata" />
            
            {/* Floating Music Player */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-3 w-72">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: isPlaying ? 360 : 0 }}
                                            transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                                            className="w-4 h-4 bg-white rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-800 text-sm">Música de Fondo</h3>
                                        <p className="text-xs text-slate-600">
                                            {isPlaying ? "Reproduciendo..." : "Haz clic para activar"}
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleVisibility}
                                    className="text-slate-600 hover:text-slate-800 transition-colors"
                                >
                                    <Minimize2 size={18} />
                                </motion.button>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <div className="relative">
                                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                            layoutId="progress"
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        value={currentTime}
                                        onChange={(e) => handleSeek(Number(e.target.value))}
                                        className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between">
                                {/* Play/Pause Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={togglePlay}
                                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                                    layout
                                >
                                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                </motion.button>

                                {/* Volume Control */}
                                <div className="flex items-center space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.6)}
                                        className="text-slate-600 hover:text-slate-800 transition-colors"
                                        layout
                                    >
                                        {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                    </motion.button>
                                    <div className="relative w-16">
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-slate-400 to-slate-600 rounded-full"
                                                style={{ width: `${volume * 100}%` }}
                                                layoutId="volume"
                                            />
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={volume}
                                            onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                            className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Visualizer */}
                            <div className="mt-3 flex items-center justify-center space-x-1">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            height: isPlaying ? [3, 8, 3] : 3,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: isPlaying ? Infinity : 0,
                                            delay: i * 0.1,
                                            ease: "easeInOut",
                                        }}
                                        className="w-0.5 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimized Button */}
            <AnimatePresence>
                {!isVisible && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleVisibility}
                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                            layout
                        >
                            <motion.div
                                animate={{ 
                                    scale: isPlaying ? [1, 1.1, 1] : 1,
                                    rotate: isPlaying ? [0, 5, -5, 0] : 0
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: isPlaying ? Infinity : 0,
                                    ease: "easeInOut",
                                }}
                            >
                                <Music2 size={20} />
                            </motion.div>
                            {!isPlaying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                                >
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </motion.div>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};