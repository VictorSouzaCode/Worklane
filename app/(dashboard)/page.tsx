import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardHome() {
  return (
    <div>
        <h1>Dashboard</h1>

        <Card>
            <CardHeader>
                <CardTitle>
                    Welcome to Worklane
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    This is your internal workspace. KPIs will live here
                </p>
            </CardContent>
        </Card>
    </div>
  )
}