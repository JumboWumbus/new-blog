import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import s from './NavMenu.module.scss'

//TODO Fix navbar and make it epic:

//https://cal.com/pricing

export default () => (


  <NavigationMenu.Root className={s.container} orientation="horizontal">
  <NavigationMenu.List className={s.list}>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className={s.button}>Item one</NavigationMenu.Trigger>
      <NavigationMenu.Content className={s.content}>Item one content</NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className={s.button}>Item two</NavigationMenu.Trigger>
      <NavigationMenu.Content className={s.content}>Item two content</NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className={s.button}>Item two</NavigationMenu.Trigger>
    </NavigationMenu.Item>

    <NavigationMenu.Indicator className="NavigationMenuIndicator" />
  </NavigationMenu.List>

  <NavigationMenu.Viewport className={s.test}/>
</NavigationMenu.Root>

);