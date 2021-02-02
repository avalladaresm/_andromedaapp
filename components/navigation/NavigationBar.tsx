import { FC } from "react"
import { NavBarSettings } from "../../models/NavBarSettings"

const NavigationBar: FC<NavBarSettings> = (props) => {

  return (
    <nav className='w-full flex items-center bg-lightBlue-800 h-14 space-x-4 justify-center'>
      {props.children}
    </nav>
  )
}

export default NavigationBar