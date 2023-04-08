import { Webmention } from "src/webmentions/webmentions";
import dayjs from 'dayjs';
import Image from 'next/image'


import s from "./WebmentionComment.module.scss"
import Link from "next/link";
import { sanitize } from "dompurify";

type WebmentionTileProps = {
  webmention: Webmention;
};


export const WebmentionComment: React.FC<WebmentionTileProps> =({
webmention
})=>{

  return(
    <div className={s.container}>
      <Image className={s.author_image} src={webmention.data.author.photo} alt="user profile picture" width={48} height={48}/>
      <div className={s.details}>
        <p className={s.author_name}>{webmention.data.author.name}</p>
        <Link className={s.actionType} href={webmention.data.url} target='_blank'>{webmentionToActionVerb(webmention)}</Link>
        {webmention.data.published_ts && (
          <div className={s.timestamp}>
            <span className={s.spacer}>|</span>
            <span>{dayjs.unix(webmention.data.published_ts).format('DD MMMM, YYYY')}</span>
          </div>
        )}
      </div>
      {webmention.data.content && webmention.activity.type === 'reply' && (
        <p dangerouslySetInnerHTML={{__html: sanitize(webmention.data.content)}}/>
      )}
    </div>
  )
}

// export const WebmentionTile: React.FC<WebmentionTileProps> = ({ webmention }) => {
//   return (
//     <WebmentionContainer>
//       <AuthorAvatar src={webmention.data.author.photo} alt="" width={48} height={48} />
//       <Headline>
//         <AuthorName>{webmention.data.author.name}</AuthorName>
//         <ActivityType href={webmention.data.url} target="_blank">
//           {webmentionToActionVerb(webmention)}
//         </ActivityType>
//         {webmention.data.published_ts && (
//           <Timestamp>
//             <TimestampSpacer>⋅</TimestampSpacer>
//             <span>{dayjs.unix(webmention.data.published_ts).format('DD MMMM, YYYY')}</span>
//           </Timestamp>
//         )}
//       </Headline>
//       {webmention.data.content && webmention.activity.type === 'reply' && (
//         <Content dangerouslySetInnerHTML={{ __html: sanitizeHTML(webmention.data.content) }} />
//       )}
//     </WebmentionContainer>
//   );
// };

function assertIsUnreachable(value?: never): never {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`should be unreachable, but got here. value=${value}`);
}

function webmentionToActionVerb(webmention: Webmention): string {
  switch (webmention.activity.type) {
    case 'reply': {
      if (webmention.data.url.startsWith('https://twitter')) {
        return 'mentioned this';
      }
      return 'replied';
    }
    case 'repost': {
      if (webmention.data.url.startsWith('https://twitter')) {
        return 'retweeted';
      }
      return 'reposted';
    }
    default:
      assertIsUnreachable(webmention.activity.type);
  }
}