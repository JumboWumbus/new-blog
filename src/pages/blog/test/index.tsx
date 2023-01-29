

export default function Test() {

   return (
      <div style={{
         position: 'relative',
         paddingLeft: '4rem',
         display: 'flex',
         width: '1200px',
         height: '630px',
         backgroundColor: 'white'

      }}>
         <div style={{
            position: 'absolute',
            display: 'flex',
            zIndex: '-2',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 101 101"><path d="M1 10.5H0V0h10.5v1H1zM75.3 1H58.1V0h17.2v1zM42.9 1H25.7V0h17.2v1zm58.1 9.5h-1V1h-9.5V0H101zm0 64.8h-1V58.1h1v17.2zm0-32.4h-1V25.7h1v17.2zm0 58.1H90.5v-1h9.5v-9.5h1zm-25.7 0H58.1v-1h17.2v1zm-32.4 0H25.7v-1h17.2v1zm-32.4 0H0V90.5h1v9.5h9.5zM1 75.3H0V58.1h1v17.2zm0-32.4H0V25.7h1v17.2z"/></svg>')`,
            backgroundPosition: 'center',
            //MAY change later if contrast bad
            opacity: '0.6',
         }}></div>
         <div style={{


            position: 'absolute',
            zIndex: '-1',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            opacity: '0.8',
            backgroundImage: 'radial-gradient(ellipse, rgba(255,255,255,0) 10%, rgba(255,255,255,1) 90%)',


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
               display: 'flex',
               fontWeight: 700,
            }}>{'Title'}</h1>
            <p>{'excerpt'}</p>
         </div>

         <div style={{
            position: 'absolute',
            display: 'flex',
            bottom: 0,
            width: '100%',
            height: '100px',
            justifyContent: 'space-between',
            fontSize: '2rem',
            textTransform: 'uppercase',
            fontWeight: 700,
            alignItems: 'center',
         }}>
            <p>{'Dec 15, 2022'}</p>
            <p>{'8 min read'}</p>
         </div>


      </div>
   )
}