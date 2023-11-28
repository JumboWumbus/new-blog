import React, { useState, useEffect } from 'react';
import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentIndex, interval, images.length]);

  return (
    <img
      src={images[currentIndex]}
      alt={`Slide ${currentIndex + 1}`}
      className={styles.sliderImage}
    />
  );
};

export default ImageSlider;
