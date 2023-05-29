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
  <img src={src}  alt={alt} className={s.image}/>
</picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default ImageCaption;
