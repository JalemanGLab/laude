import { useState, useEffect } from 'react';

// Importar todas las imágenes
import img01 from '@/assets/images/01.png';
import img02 from '@/assets/images/02.png';
import img03 from '@/assets/images/03.png';
import img04 from '@/assets/images/04.png';
import img05 from '@/assets/images/05.png';
import img06 from '@/assets/images/06.png';
import img07 from '@/assets/images/07.png';
import img08 from '@/assets/images/08.png';
import img09 from '@/assets/images/09.png';
import img10 from '@/assets/images/10.png';
import img11 from '@/assets/images/11.png';
import img12 from '@/assets/images/12.png';
import img13 from '@/assets/images/13.png';

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
        { id: 1, url: img01, description: 'Cuando te conocí' },
        { id: 2, url: img02, description: 'Haciendo compras en el mercado' },
        { id: 3, url: img03, description: 'Viendo el cultivo de la hongos' },
        { id: 4, url: img04, description: 'Poniendo luces de navidad' },
        { id: 5, url: img05, description: 'Probando mi rica sopa' },
        { id: 6, url: img06, description: 'Bañando los perritos' },
        { id: 7, url: img07, description: 'Comiendo obleas' },
        { id: 8, url: img08, description: 'Arepas y jugo maluco' },
        { id: 9, url: img09, description: 'Almorzando, porque no comoe arroz?' },
        { id: 10, url: img10, description: 'Su cabello es fastidioso' },
        { id: 11, url: img11, description: 'Los peores cantantes del mundo' },
        { id: 12, url: img12, description: 'Tomando cafe, estaba mejor el de tu hermana' },
        { id: 13, url: img13, description: 'La quiero mucho' },
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
 
