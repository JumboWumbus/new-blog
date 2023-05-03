import { TwitterShareButton, TwitterIcon, FacebookShareButton, LinkedinShareButton } from "next-share";
import { mainUrl } from "src/utils/constants";
import Facebook from "../Icons/Facebook";
import LinkedIn from "../Icons/LinkedIn";
import Twitter from "../Icons/Twitter";

import s from "./ShareCurrentPage.module.scss"


interface ShareProps{
  currentPageURL: string,
  supportingText?:string
}


export default function ShareCurrentPage({currentPageURL, supportingText}:ShareProps){


  return(
    <div className={s.shareContainer}>
      <h5 className={s.CTATitle}>Share this page!</h5>

      <div className={s.socialContainer}>
        <TwitterShareButton url={currentPageURL} title={supportingText ? supportingText : undefined}><Twitter/></TwitterShareButton>
        <LinkedinShareButton url={currentPageURL} title={supportingText ? supportingText : undefined}><LinkedIn/></LinkedinShareButton>
        <FacebookShareButton url={currentPageURL} title={supportingText ? supportingText : undefined}><Facebook/></FacebookShareButton>

      </div>
    </div>
  )
}