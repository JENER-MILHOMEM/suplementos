import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileLoading() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2 w-full sm:w-auto">
              <Skeleton className="h-8 w-[200px] sm:w-[250px]" />
              <Skeleton className="h-4 w-[150px] sm:w-[200px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 flex-grow" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

