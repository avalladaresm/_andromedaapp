import React, { FC, useEffect, useState } from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { NavigationItem } from "../../components/navigation/NavigationItem";
import Spin from "../../components/Spin";
import { ActionBarSettings } from "../../models/ActionBarSettings";

const ActionBar: FC<ActionBarSettings> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(props.isLoading)
  }, [props.isLoading])

  return (
    <NavigationBar className='grid grid-cols-12' backgroundColor='bg-lightBlue-800' height='h-12' spaceXItems='space-x-4' justifyContent='justify-center'>
      <div className='col-start-3 col-span-1 flex items-center justify-center'>
        <p className='text-4xl align-middle text-blueGray-50 m-0'>{props.pageTitle}</p>
      </div>
      <div className='col-start-5 col-span-5 inline-flex space-x-4'>
        {props.navItems?.map(item => (
          <NavigationItem
            key={item.title}
            title={item.title}
            styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }}
            onClick={item.onClick}
          />
        ))}
      </div>
      {isLoading ?
        <div className='col-start-10 col-span-6 inline-flex'>
          <Spin />
        </div> :
        <></>
      }
    </NavigationBar>
  )
}

export default ActionBar