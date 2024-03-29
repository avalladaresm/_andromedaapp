import ContentHeader from "./ContentHeader"

const Content = (props) => {
  return (
    <div className={`p-3 ${props.collapsed ? 'ml-14 sm:ml-20' : 'ml-14 sm:ml-56'} bg-blueGray-300 min-h-screen space-y-2`}>
      <ContentHeader header={props.header} />
      <div className='p-6 bg-blueGray-50 rounded-md shadow-2xl min-h-full'>
        {props.children}
      </div>
    </div>
  )
}

export default Content