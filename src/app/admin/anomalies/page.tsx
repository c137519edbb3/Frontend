
import Header from "@/components/common/navbar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog } from "@radix-ui/react-dialog"
import { Sheet } from "lucide-react"

function Anomalies() {
  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
      <Header pageName="Anomaly management" userName="John Doe" userEmail="6oFkI@example.com" />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="Anomaly Logs">Anomaly Logs</TabsTrigger>
        </TabsList>
      </Tabs>


    </div>
  )
}

export default Anomalies

// Data table
// Dialog
// scroll area

// Sheet

// text area

