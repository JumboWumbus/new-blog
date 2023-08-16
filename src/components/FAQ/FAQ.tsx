import * as Accordion from '@radix-ui/react-accordion';

import s from "./FAQ.module.scss";



export default function FAQ () {

  return(
    <Accordion.Root className={s.AccordionRoot} type="single" defaultValue="item-1" collapsible>
    <Accordion.Item className={s.AccordionItem} value="item-1">
      <Accordion.Header className={s.AccordionHeader}>
        <Accordion.Trigger className={s.AccordionTrigger}>
          What is this place?

          <span className={s.PlusIcon}/>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={s.AccordionContent}>
        <p>This place is where I put all of my ideas, work and content as a one stop shop to look at my own progress as well as hopefully inspire and help others!</p>
        </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className={s.AccordionItem} value="item-2">
      <Accordion.Header className={s.AccordionHeader}>
        <Accordion.Trigger className={s.AccordionTrigger}>
          Who are you?

          <span className={s.PlusIcon}/>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={s.AccordionContent}>I'm Ben; a software developer from Glasgow, Scotland that is hoping to get his brain massive with knowledge and skillz.</Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className={s.AccordionItem} value="item-3">
      <Accordion.Header className={s.AccordionHeader}>
        <Accordion.Trigger className={s.AccordionTrigger}>
          Why have you made a website?

          <span className={s.PlusIcon}/>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={s.AccordionContent}>  
      <p>
        Why I decided to make a website was because I don't like the idea of relying on other platforms or services as places for me to post things. It's very messy and difficult to keep track of what you posted and where.</p> 
        <br/>
      <p>
      I think everyone should have a website, it's basically just an interactive resource of knowledge and personal experience that other people can benefit from.
      </p>
  </Accordion.Content>
    </Accordion.Item>

    {/* <Accordion.Item className={s.AccordionItem} value="item-4">
      <Accordion.Header className={s.AccordionHeader}>
        <Accordion.Trigger className={s.AccordionTrigger}>
          Do you like other platforms?
          <span className={s.PlusIcon}/>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className={s.AccordionContent}>
    <p>Yes I like them! But I like them in a sense that they allow me to get feedback or find people I'd like to connect with! I don't like using the platforms constantly as they are designed to keep you glued to them and cause you mental anguish.</p>
    <br/>
    <p>
    Social media and other services simplified the process of web interaction for users but at a cost: your time, your sense of self, your data and your words are controlled, stored, analyzed and sold to companies that will use that information to boil you down to a statistic, target user, recommended audience, willingness to pay value and the list goes on...</p>
    <br/>

    <p>  Why rely on third party services or companies that don't have your best interest in mind as a platform for you to show people who you are and what you do? The web is a place you can collaborate, help others, express yourself and make a living! So why not do it your own special and cool way! </p>
  </Accordion.Content>
    </Accordion.Item> */}
  </Accordion.Root>
  )
}

// I think everyone should have a web presence that's personal and handmade. Everyone used to have personal websites where they did and posted whatever they wanted, so what changed? Why is the idea of having your own little pocket of the web falling out of fashion? Social media and other services simplified the process of web interaction for users but at a cost: your time, your sense of self, your data and your words are controlled, stored, analyzed and sold to companies that will use that information to boil you down to a statistic, target user, recommended audience, willingness to pay value and the list goes on... Why rely on third party services or companies that don't have your best interest in mind as a platform for you to show people who you are and what you do? The web is a place you can collaborate, help others, express yourself and make a living! Go do it your own special and cool way! 
