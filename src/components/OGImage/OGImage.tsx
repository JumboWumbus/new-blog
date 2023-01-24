
import { convertTime } from 'src/utils';



// const style = `
//   .font-logo {
//     font-family: 'Caveat', cursive;
//   }
// `;

// const Profile = () => (
//    <div className="flex flex-row justify-center gap-4">
//       <img className="rounded-full w-16" src={avatar} />
//       <div className="flex flex-col justify-center">
//          <span className="text-2xl font-medium">Ben Hammond</span>
//          <span className="">
//             <div>{twitterHandle}</div>
//          </span>
//       </div>
//    </div>
// );

// const Row: FunctionComponent<PropsWithChildren> = ({ children }) => (
//    <div className="flex flex-row justify-between w-full items-center">
//       {children}
//    </div>
// );

// const Header = (props: { date: string; readMinutes: string }) => (
//    <Row>
//       <Logo end={false} />
//       <div>
//          <DateFormatted date={new Date(props.date)} />
//          {props.readMinutes ? ` · ${props.readMinutes} min read` : null}
//       </div>
//    </Row>
// );

// const Content = (props: { title: string; description: string }) => (
//    <div className="flex flex-col gap-6 text-center text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-yellow-500">
//       <h1 className="text-7xl grow font-bold">{props.title}</h1>
//       <p className="leading-relaxed text-3xl">{props.description}</p>
//    </div>
// );

// const Footer = () => (
//    <Row>
//       <Profile /> <Logo end={true} />
//    </Row>
// );

//TODO inline style pseudoelement





const container = {
   position: 'relative',
   paddingInline: '4rem',

   //REMOVE WHEN MOVING TO REAL THING
   width: '1200px',
   height: '630px',
}

/* TODO

Maybe add 3 sections: header, postinfo and footer and do a flex space between to equally seperate them and make it look epic???

 */



const gridStyle = {
   position: 'absolute',
   zIndex: -2,
   top: 0,
   bottom: 0,
   left: 0,
   right: 0,
   backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 101 101"><path d="M1 10.5H0V0h10.5v1H1zM75.3 1H58.1V0h17.2v1zM42.9 1H25.7V0h17.2v1zm58.1 9.5h-1V1h-9.5V0H101zm0 64.8h-1V58.1h1v17.2zm0-32.4h-1V25.7h1v17.2zm0 58.1H90.5v-1h9.5v-9.5h1zm-25.7 0H58.1v-1h17.2v1zm-32.4 0H25.7v-1h17.2v1zm-32.4 0H0V90.5h1v9.5h9.5zM1 75.3H0V58.1h1v17.2zm0-32.4H0V25.7h1v17.2z"/></svg>')`,
   backgroundPosition: 'center',
   opacity: '60%', //May change later depending on contrast

};

const fade = {



};

const postInfoContainer = {

   display: 'flex',
   flexDirection: 'column',
   width: '100%',
   height: '100%',
   alignItems: 'flex-start',
   justifyContent: 'center'
}

const postTitle = {
   fontSize: '5rem',
   fontWeight: 700,

}

const footer = {
   position: 'absolute',
   bottom: 0,
   width: '100%',
   height: '100px',
   display: 'flex',
   justifyContent: 'space-between',
   fontSize: '2rem',
   textTransform: 'uppercase',
   fontWeight: 700,
   alignItems: 'center',
}

export const OGImage = ({
   title,
   date,
   excerpt,
   readMinutes,
}: {
   title: string;
   date: string;
   excerpt: string;
   readMinutes: string;
}) => (

   <>

      <div style={{
         position: 'relative',
         paddingInline: '4rem',

         //REMOVE WHEN MOVING TO REAL THING
         width: '1200px',
         height: '630px',
      }}>
         <div style={{
            position: 'absolute',
            zIndex: -2,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 101 101"><path d="M1 10.5H0V0h10.5v1H1zM75.3 1H58.1V0h17.2v1zM42.9 1H25.7V0h17.2v1zm58.1 9.5h-1V1h-9.5V0H101zm0 64.8h-1V58.1h1v17.2zm0-32.4h-1V25.7h1v17.2zm0 58.1H90.5v-1h9.5v-9.5h1zm-25.7 0H58.1v-1h17.2v1zm-32.4 0H25.7v-1h17.2v1zm-32.4 0H0V90.5h1v9.5h9.5zM1 75.3H0V58.1h1v17.2zm0-32.4H0V25.7h1v17.2z"/></svg>')`,
            backgroundPosition: 'center',
            //MAY change later if contrast bad
            opacity: '60%',
         }}></div>
         <div style={{
            content: '',
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'radial-gradient(transparent 10%, #ffffff 90%)'
         }}></div>
         <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center'
         }}>
            <h1 style={{
               fontSize: '5rem',
               fontWeight: 700,
            }}>{title}</h1>
            <p>{excerpt}</p>
         </div>

         <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '2rem',
            textTransform: 'uppercase',
            fontWeight: 700,
            alignItems: 'center',
         }}>
            <p>{date}</p>
            <p>{readMinutes}</p>
         </div>

      </div>

   </>

);

export default OGImage;