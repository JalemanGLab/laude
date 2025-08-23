import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useGallery } from "./useGallery";
import { cn } from "@/lib/utils";

export const Gallery = () => {
    const { 
        images, 
        lightboxOpen, 
        currentImageIndex, 
        openLightbox, 
        closeLightbox, 
        goToNext, 
        goToPrevious 
    } = useGallery();

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            x: -100,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50">
            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Timeline Gallery */}
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="relative"
                    >
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-slate-300 to-slate-400 h-full rounded-full hidden md:block"></div>
                        
                        {images.map((image, index) => (
                            <motion.div
                                key={image.id}
                                variants={itemVariants}
                                className={cn(
                                    "relative mb-16 flex items-center",
                                    "md:flex-row md:space-x-8",
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                                    "flex-col space-y-4"
                                )}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-slate-400 rounded-full shadow-lg z-10 hidden md:block"></div>
                                <div className="w-6 h-6 bg-white border-4 border-slate-400 rounded-full shadow-lg z-10 md:hidden mx-auto"></div>
                                
                                {/* Image Card */}
                                <div className={cn(
                                    "w-full md:w-5/12 relative",
                                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                                )}>
                                    <motion.div
                                        className="group relative overflow-hidden rounded-2xl shadow-xl bg-white"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="aspect-video overflow-hidden">
                                            <motion.img
                                                src={image.url}
                                                alt={image.description}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            
                                            {/* Overlay */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => openLightbox(index)}
                                                    className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                                                >
                                                    <ZoomIn size={24} />
                                                </motion.button>
                                            </motion.div>
                                        </div>
                                        
                                        {/* Description */}
                                        <div className="p-6">
                                            <p className="text-lg text-slate-700 font-medium leading-relaxed">
                                                {image.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                                
                                {/* Empty space for alignment */}
                                <div className="w-full md:w-5/12 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Custom Modal */}
                    {lightboxOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={closeLightbox}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative max-w-4xl max-h-[90vh] w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeLightbox}
                                    className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors z-10"
                                >
                                    <X size={24} />
                                </motion.button>
                                
                                {/* Navigation Buttons */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors z-10"
                                >
                                    <ChevronLeft size={24} />
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={goToNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors z-10"
                                >
                                    <ChevronRight size={24} />
                                </motion.button>
                                
                                {/* Image */}
                                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={images[currentImageIndex].url}
                                        alt={images[currentImageIndex].description}
                                        className="w-full h-auto max-h-[70vh] object-contain"
                                    />
                                    
                                    {/* Image Info */}
                                    <div className="p-6 bg-white">
                                        <p className="text-lg text-slate-700 font-medium">
                                            {images[currentImageIndex].description}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-2">
                                            {currentImageIndex + 1} de {images.length}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};