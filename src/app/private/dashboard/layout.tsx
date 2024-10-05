import {  ReactNode } from 'react'
import BountyWiseSidebar from './_components/BountywiseDashboardSidebar'
export default function DashboardLayout({children}: Readonly<{children : ReactNode}>) {
  return (
    <div className='flex h-[calc(100%_-_76px)]'>
      <div className='h-full'>
        <BountyWiseSidebar />
        {children}
      </div>
    </div>
  )
}
