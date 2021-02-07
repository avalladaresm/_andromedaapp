const ContentHeader = (props) => {
  return (
    <div className='p-3 mt-12 bg-blueGray-50 rounded-md shadow-2xl h-20'>
      {props.header}
    </div>
  )
}

export default ContentHeader