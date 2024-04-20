import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import DailyReport from "./DailyReport"
import MonthlyReport from "./MonthlyReport"
import YearlyReport from "./YearlyReport"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="daily">daily</TabsTrigger>
        <TabsTrigger value="monthly">monthly</TabsTrigger>
        <TabsTrigger value="yearly">yearly</TabsTrigger>
      </TabsList>
      <TabsContent value="daily">
        <Card>
          <CardHeader>
            <CardTitle className="text-center capitalize">daily report</CardTitle>
            {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <DailyReport/>
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="monthly">
        <Card>
        <CardHeader>
            <CardTitle className="text-center capitalize">monthly report</CardTitle>
            {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <MonthlyReport/>
          </CardContent>
          
        </Card>
      </TabsContent>
      <TabsContent value="yearly">
        <Card>
        <CardHeader>
            <CardTitle className="text-center capitalize">yearly report</CardTitle>
            {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <YearlyReport/>
          </CardContent>
          
        </Card>
      </TabsContent>
    </Tabs>
  )
}
