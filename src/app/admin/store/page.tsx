import StoreHours, { WeekHours } from "@/components/store-hours"
import { getExceptionsQuery } from "@/firebase/queries/get-exceptions"
import { getHours } from "@/firebase/queries/get-hours"

const Store = async () => {
  
  const hours = await getHours()
  const exceptions = await getExceptionsQuery()

  return (
    <StoreHours initialWeekHours={hours as WeekHours} exceptionsData={exceptions} />
  )
}

export default Store