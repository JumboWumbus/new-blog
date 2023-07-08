import s from './VideoEmbed.module.scss';

enum FileType {
  MP4 = 'video/mp4',
  WEBM = 'video/webm',
  OGG = 'video/ogg',
}

type VideoProps = {
  src: string;
  fileType: keyof typeof FileType;
};

export default function Video({ src, fileType }: VideoProps) {
  const type = FileType[fileType];

  return (
    <div className={s.container}>
      <video controls className={s.frame}>
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}