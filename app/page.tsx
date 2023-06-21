import { CarCard, CustomFilters, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants'
import { CarProps, HomeProps } from '@/types'
import { getCars } from '@/utils'
import Image from 'next/image'

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await getCars({
    model: searchParams.model || '',
    make: searchParams.make || '',
    year: searchParams.year || 0,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 8,
  })

  const isDataEmpty =
    !Array.isArray(allCars.cars) || allCars.cars.length < 1 || !allCars.cars

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilters options={fuels} title='fuel' />
            <CustomFilters options={yearsOfProduction} title='year' />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.cars?.map((car: CarProps) => (
                <div key={car.make}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
            <ShowMore isNext={(searchParams.limit || 8) > allCars.total} />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black font-bold text-xl'>Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  )
}
