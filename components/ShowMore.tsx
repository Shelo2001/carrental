'use client'

import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { useRouter } from 'next/navigation'
import { updateSearchParams } from '@/utils'
import { ShowMoreProps } from '@/types'

const ShowMore = ({ isNext }: { isNext: boolean }) => {
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState(1)

  const handleNavigation = () => {
    setPageNumber(pageNumber + 1)
    const newLimit = (pageNumber + 1) * 8

    const newPathname = updateSearchParams('limit', `${newLimit}`)

    router.push(newPathname)
  }
  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isNext && (
        <CustomButton
          btnType='button'
          title='Show More'
          containerStyles='bg-primary-blue rounded-full text-white'
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore
