import { RiListSettingsFill } from 'react-icons/ri'

export const FloatingSettings = ({onClick, isOpen}) => {

  return (
    <div>
      <div className={`fixed h-12 w-12 rounded-md rounded-r-none bg-blueGray-300 hover:bg-blueGray-400 active:bg-blueGray-500 ${isOpen && 'right-62'} right-2 top-1/3 cursor-pointer`}
        onClick={onClick}>
        <div className='flex justify-center p-2'>
          <RiListSettingsFill className='rounded-md border border-blueGray-900 place-self-center' size={30} />
        </div>
      </div>
    </div>
  )
}