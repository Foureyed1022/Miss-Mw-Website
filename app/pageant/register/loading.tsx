import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-800" />
        <p className="text-emerald-800 text-lg font-medium">Loading registration form...</p>
      </div>
    </div>
  )
}
