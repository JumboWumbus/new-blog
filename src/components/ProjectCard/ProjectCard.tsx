import Image from 'next/image'
import s from './ProjectCard.module.scss'

export default function ProjectCard (){

  return(
    <div className={s.container}>
      <Image className={s.previewImage} src={""} alt={""}/>

      <div className={s.information}>
        <h1 className={s.title}>Title of project</h1>
        
        <p className={s.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quia laborum ut, voluptate saepe reprehenderit? Alias soluta maiores deserunt. Quo dignissimos accusamus suscipit velit. Non!</p>
        
        <div className={s.skills}>
          <h3>Skills used</h3>
          <ul>
            <li>Typescript</li>
            <li>Frontend</li>
            <li>NextJS</li>
          </ul>
        </div>

        <div className={s.timeContainer}>
        <h3 className={s.timeTitle}>Timeframe: <span className={s.timeframe}>20 years</span></h3>
        
        </div>
      </div>

    </div>
  )
}