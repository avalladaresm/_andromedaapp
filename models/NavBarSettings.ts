import { Color } from './Color'

export interface NavBarSettings {
  backgroundColor?: Color
  position?: Position
  height?: Height
  spaceXItems?: SpaceXItems
  justifyContent?: JustifyContent
  className?: string
  hasActionBar?: boolean
}

type Position = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky'

type Height =
  'h-0' |
  'h-0.5' |
  'h-1' |
  'h-1.5' |
  'h-2' |
  'h-2.5' |
  'h-3' |
  'h-3.5' |
  'h-4' |
  'h-5' |
  'h-6' |
  'h-7' |
  'h-8' |
  'h-9' |
  'h-10' |
  'h-11' |
  'h-12' |
  'h-14' |
  'h-16' |
  'h-20' |
  'h-24' |
  'h-28' |
  'h-32' |
  'h-36' |
  'h-40' |
  'h-44' |
  'h-48' |
  'h-52' |
  'h-56' |
  'h-60' |
  'h-64' |
  'h-72' |
  'h-80' |
  'h-96' |
  'h-auto' |
  'h-px' |
  'h-1/2' |
  'h-1/3' |
  'h-2/3' |
  'h-1/4' |
  'h-2/4' |
  'h-3/4' |
  'h-1/5' |
  'h-2/5' |
  'h-3/5' |
  'h-4/5' |
  'h-1/6' |
  'h-2/6' |
  'h-3/6' |
  'h-4/6' |
  'h-5/6' |
  'h-full' |
  'h-screen'

type SpaceXItems =
  'space-x-0' |
  'space-x-0.5' |
  'space-x-1' |
  'space-x-1.5' |
  'space-x-2' |
  'space-x-2.5' |
  'space-x-3' |
  'space-x-3.5' |
  'space-x-4' |
  'space-x-5' |
  'space-x-6' |
  'space-x-7' |
  'space-x-8' |
  'space-x-9' |
  'space-x-10' |
  'space-x-11' |
  'space-x-12' |
  'space-x-14' |
  'space-x-16' |
  'space-x-20' |
  'space-x-24' |
  'space-x-28' |
  'space-x-32' |
  'space-x-36' |
  'space-x-40' |
  'space-x-44' |
  'space-x-48' |
  'space-x-52' |
  'space-x-56' |
  'space-x-60' |
  'space-x-64' |
  'space-x-72' |
  'space-x-80' |
  'space-x-96' |
  'space-x-px' |
  'space-x-reverse' |
  '-space-x-0' |
  '-space-x-0.5' |
  '-space-x-1' |
  '-space-x-1.5' |
  '-space-x-2' |
  '-space-x-2.5' |
  '-space-x-3' |
  '-space-x-3.5' |
  '-space-x-4' |
  '-space-x-5' |
  '-space-x-6' |
  '-space-x-7' |
  '-space-x-8' |
  '-space-x-9' |
  '-space-x-10' |
  '-space-x-11' |
  '-space-x-12' |
  '-space-x-14' |
  '-space-x-16' |
  '-space-x-20' |
  '-space-x-24' |
  '-space-x-28' |
  '-space-x-32' |
  '-space-x-36' |
  '-space-x-40' |
  '-space-x-44' |
  '-space-x-48' |
  '-space-x-52' |
  '-space-x-56' |
  '-space-x-60' |
  '-space-x-64' |
  '-space-x-72' |
  '-space-x-80' |
  '-space-x-96' |
  '-space-x-px'

type JustifyContent =
  'justify-start' |
  'justify-end' |
  'justify-center' |
  'justify-between' |
  'justify-around' |
  'justify-evenly' 