import { FC } from "react"
import { NavBarSettings } from "../../models/NavBarSettings"
import { convertToClassNameAttributes } from "../../utils/utils"

const NavigationBar: FC<NavBarSettings> = (props) => {

  return (
    <nav className={`${convertToClassNameAttributes(props)} w-full flex items-center`}>
      {props.children}
    </nav>
  )
}

export default NavigationBar