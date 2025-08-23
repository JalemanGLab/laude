import { useState, useEffect } from 'react';

export interface GalleryImage {
    id: number;
    url: string;
    description: string;
}

export const useGallery = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array de imágenes con las 13 imágenes de la carpeta images
    const images: GalleryImage[] = [
        { id: 1, url: '/src/assets/images/01.png', description: 'Cuando te conocí' },
        { id: 2, url: '/src/assets/images/02.png', description: 'Haciendo compras en el mercado' },
        { id: 3, url: '/src/assets/images/03.png', description: 'Viendo el cultivo de la hongos' },
        { id: 4, url: '/src/assets/images/04.png', description: 'Poniendo luces de navidad' },
        { id: 5, url: '/src/assets/images/05.png', description: 'Probando mi rica sopa' },
        { id: 6, url: '/src/assets/images/06.png', description: 'Bañando los perritos' },
        { id: 7, url: '/src/assets/images/07.png', description: 'Comiendo obleas' },
        { id: 8, url: '/src/assets/images/08.png', description: 'Arepas y jugo maluco' },
        { id: 9, url: '/src/assets/images/09.png', description: 'Almorzando, porque no comoe arroz?' },
        { id: 10, url: '/src/assets/images/10.png', description: 'Su cabello es fastidioso' },
        { id: 11, url: '/src/assets/images/11.png', description: 'Los peores cantantes del mundo' },
        { id: 12, url: '/src/assets/images/12.png', description: 'Tomando cafe, estaba mejor el de tu hermana' },
        { id: 13, url: '/src/assets/images/13.png', description: 'La quiero mucho' },
    ];

    // useEffect para hacer scroll al top cuando se inicialice o tenga el foco
    useEffect(() => {
        // Scroll inmediato al top
        window.scrollTo(0, 0);
        
        // Scroll suave después de un pequeño delay para asegurar que funcione
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

        // Función para manejar el foco
        const handleFocus = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Agregar event listener para el foco
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Cleanup: remover event listeners y timer
        return () => {
            window.removeEventListener('focus', handleFocus);
            clearTimeout(timer);
        };
    }, []);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return {
        images,
        lightboxOpen,
        currentImageIndex,
        openLightbox,
        closeLightbox,
        goToNext,
        goToPrevious,
    };
};
 
