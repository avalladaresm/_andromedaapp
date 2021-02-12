import React, { FC, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectSettings } from '../models/SelectSettings';

const Select: FC<SelectSettings> = (props) => {
  const [displayingText, setDisplayingText] = useState<string>(undefined)
  const [touchedError, setTouchedError] = useState<boolean>(false)

  useEffect(() => {
    const index = props.items.findIndex(x => x.value === props.value)
    setDisplayingText(props.items[index]?.displayValue?.toString())
  }, [props.value])

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-xxs min-w-full mx-auto'>
        <Listbox
          as='div'
          value={displayingText}
          onChange={props.onChange}
          onBlur={() => { displayingText ? setTouchedError(false) : (setTouchedError(true), props.onTouch && props.onTouch()) }}
        >
          {({ open }) => (
            <>
              <div className='relative'>
                <span className='inline-block w-full rounded-md shadow-sm'>
                  <Listbox.Button
                    className={`h-10 pl-3 pr-10 py-2 relative w-full rounded-md text-left transition ease-in-out duration-150 sm:text-sm
                    ${props.isRequired && touchedError ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'}
                    ${props.disabled ? 'bg-coolGray-200 pointer-events-none' : 'bg-white cursor-pointer'}`}
                    style={{ outline: 'none' }}
                  >
                    {displayingText ?
                      <span className='block truncate'>{displayingText}</span> :
                      <span className='block truncate text-coolGray-400'>{props.defaultValue}</span>
                    }
                    <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
                      <svg
                        className='h-5 w-5 text-gray-400'
                        viewBox='0 0 20 20'
                        fill='none'
                        stroke='currentColor'
                      >
                        <path
                          d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  show={open}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  className='absolute z-10 mt-1 min-w-xxs rounded-md bg-coolGray-50 shadow-lg'
                >
                  <Listbox.Options
                    style={{ outline: 'none' }}
                    static
                    className='max-h-80 rounded-md py-1 text-base shadow-xs overflow-auto break-words focus:outline-none sm:text-sm'
                  >
                    {props.items.map((item) => (
                      <Listbox.Option key={item.displayValue} value={item.value}>
                        {({ selected, active }) => (
                          <div className={`${active ?
                            'text-coolGray-50 bg-blue-600' :
                            'text-gray-900'
                            } cursor-pointer select-none relative py-2 pl-8 pr-4`}
                          >
                            <span
                              className={`${selected ? 'font-semibold' : 'font-normal'
                                } max-w-xl block`}
                            >
                              {item.displayValue}
                            </span>
                            {selected && (
                              <span
                                className={`${active ?
                                  'text-coolGray-50' :
                                  'text-blue-600'
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                              >
                                <svg
                                  className='h-5 w-5'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}

export default Select

// https://github.com/tailwindlabs/headlessui/tree/c7b91dc7315b1f49c1a469f70eb1f6eba6a2e31c/packages/%40headlessui-react#listbox-select
// https://thoughtbot.com/blog/positioning#position