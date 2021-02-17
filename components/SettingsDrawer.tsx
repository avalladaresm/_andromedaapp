export const SettingsDrawer = (props) => {

  return (
    <div>
      {props.isOpen &&
        <div className={` flex flex-col fixed top-12 bottom-0 right-0 overflow-y-auto flex-no-wrap overflow-hidden bg-blueGray-300 items-center justify-between z-10 pt-4 pb-2 w-20 px-2 sm:w-60 sm:px-4`}>
        </div>
      }
    </div>
  )
}