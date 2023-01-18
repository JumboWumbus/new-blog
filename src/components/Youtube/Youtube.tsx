import s from './YouTube.module.scss';

export default function YouTube({ id }: { id: string }) {
  return (
    <div className={s.container}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow='autoplay; encrypted-media'
        title='Embedded YouTube video'
        className={s.frame}
      />
    </div>
  );
}
