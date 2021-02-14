const ContentHeader = (props) => {
  return (
    <div className='p-3 mt-12 bg-blueGray-50 rounded-md shadow-2xl h-16 text-3xl font-semibold'>
      {props.header}
    </div>
  )
}

export default ContentHeader