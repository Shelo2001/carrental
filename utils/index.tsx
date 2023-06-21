import { FilterProps } from '@/types'
import axios from 'axios'

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set(type, value)

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}

export async function getCars(filters: FilterProps) {
  const { make, model, limit, year, fuel } = filters
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/car?model=${model}&make=${make}&fuel=${fuel}&year=${year}&limit=${limit}`
  )
  return { cars: res.data.cars.data, total: res.data.cars.total }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50
  const mileageFactor = 0.1
  const ageFactor = 0.05

  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}
