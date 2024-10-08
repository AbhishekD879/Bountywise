import BountyCard from './BountyCard'
import BountyPagination from './BountyPagination'
import React from 'react'
export default async function BountyCardContainer() {
  return (
    <>
      <div className='space-y-4'>
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
      </div>
      <BountyPagination />
    </>
  )
}
