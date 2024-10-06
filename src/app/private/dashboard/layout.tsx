import {  ReactNode } from 'react'
import BountyWiseSidebar from './_components/BountywiseDashboardSidebar'
export default function DashboardLayout({children}: Readonly<{children : ReactNode}>) {
  return (
    <div className='flex h-[calc(100%_-_76px)] gap-10  '>
      
        <BountyWiseSidebar />
        <div className=' overflow-auto my-3 '>{children}</div>
      </div>
    
  )
}
