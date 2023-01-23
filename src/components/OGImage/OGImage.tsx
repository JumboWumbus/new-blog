import { FunctionComponent, PropsWithChildren } from 'react';
import { convertTime } from 'src/utils';
import { avatar, twitterHandle } from 'src/utils/constants';

const style = `
  .font-logo {
    font-family: 'Caveat', cursive;
  }
`;

const Profile = () => (
   <div className="flex flex-row justify-center gap-4">
      <img className="rounded-full w-16" src={avatar} />
      <div className="flex flex-col justify-center">
         <span className="text-2xl font-medium">Ben Hammond</span>
         <span className="">
            <div>{twitterHandle}</div>
         </span>
      </div>
   </div>
);

const Row: FunctionComponent<PropsWithChildren> = ({ children }) => (
   <div className="flex flex-row justify-between w-full items-center">
      {children}
   </div>
);

const Header = (props: { date: string; readMinutes: string }) => (
   <Row>
      <Logo end={false} />
      <div>
         <DateFormatted date={new Date(props.date)} />
         {props.readMinutes ? ` · ${props.readMinutes} min read` : null}
      </div>
   </Row>
);

const Content = (props: { title: string; description: string }) => (
   <div className="flex flex-col gap-6 text-center text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-yellow-500">
      <h1 className="text-7xl grow font-bold">{props.title}</h1>
      <p className="leading-relaxed text-3xl">{props.description}</p>
   </div>
);

const Footer = () => (
   <Row>
      <Profile /> <Logo end={true} />
   </Row>
);

export const OGImage = ({
   title,
   description,
   date,
   readMinutes,
}: {
   title: string;
   description: string;
   date: string;
   readMinutes: string;
}) => (
   <html>
      <head>
         {/* eslint-disable-next-line @next/next/no-sync-scripts */}
         <script src="https://cdn.tailwindcss.com/3.1.3" />
         <link
            href="https://fonts.googleapis.com/css?family=Caveat&display=swap"
            rel="stylesheet"
         />
         <style dangerouslySetInnerHTML={{ __html: style }} />
      </head>
      <body className="flex flex-col h-full justify-between p-12 bg-zinc-800 text-white text-2xl">
         {/* <Header date={date} readMinutes={readMinutes} />
         <Content title={title} description={description} />
         <Footer /> */}
         <h1>{title}</h1>
         <p>{description}</p>
         <time dateTime={new Date(date).toISOString()}>
            {convertTime(date)}
         </time>
         <p>{readMinutes}</p>
      </body>
   </html>
);

export default OGImage;