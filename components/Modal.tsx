import { FC } from "react"
import { ModalSettings } from "../models/ModalSettings"

const Modal: FC<ModalSettings> = (props) => {

  return (
    <>
      {props.isShowing &&
        <>
          <div className="flex fixed justify-center items-center overflow-hidden inset-0 z-30 h-full outline-none focus:outline-none ">
            <div className="relative my-6 mx-auto max-w-5xl bg-coolGray-50 rounded pt-4">
              <div className="flex items-center justify-between pb-3 px-5 border-b border-solid border-gray-400">
                <div className="flex items-start justify-between text-2xl font-medium">
                  {props.title}
                </div>
              </div>
              <div className="relative py-3 px-5 flex-auto">
                {props.children}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-20 bg-gray-900 h-full"></div>
        </>
      }
    </>
  )
}

export default Modal

// https://www.tailwindtoolbox.com/components/modal
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular