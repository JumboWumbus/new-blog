import React from 'react';
import Image from 'next/image';



import s from "./ImageCaption.module.scss"

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
}

const ImageCaption: React.FC<ImageWithCaptionProps> = ({ src, alt, caption }) => {

  return (
  <figure className={s.imageFigure}>
  <picture>
  <source srcSet={`${src}.webp`} type="image/webp" />
  <source srcSet={`${src}.jpg`}  type="image/jpeg" />
  <source srcSet={`${src}.png`}  type="image/png" />
  <img src={`${src}.png`}  alt={alt} className={s.image}/>
</picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default ImageCaption;
