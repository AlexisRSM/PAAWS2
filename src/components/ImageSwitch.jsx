import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Carousel } from 'react-bootstrap';

function ImageSwitcher({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const handleNext = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsFading(false);
        }, 500);
    };

    const handlePrevious = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
            setIsFading(false);
        }, 500);
    };

    return (
        <>
        <div className="imageSwitcher">
            <Image
                src={images[currentIndex].image_url}
                fluid 
                alt={`Image ${currentIndex + 1}`}
                className={`animalPageImg ${isFading ? 'hidden' : ''}`}
                rounded
            />
            {images.length > 1 && (
                <div className="imageControls mt-2 ">
                        <Button className='carouselBtn' onClick={handlePrevious}>
                        <i class="fa-solid fa-chevron-left"/>
                        </Button>
                        <Button className='carouselBtn' onClick={handleNext}>
                        <i class="fa-solid fa-chevron-right"/>
                        </Button>
                </div>
            )}
        </div>     
        </>
    );
}

export default ImageSwitcher;
