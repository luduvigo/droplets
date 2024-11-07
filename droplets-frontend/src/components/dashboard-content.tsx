import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Lock, Plus, Settings, Shield } from "lucide-react"

export function DashboardContentComponent() {
  return (
    <div className="p-6 space-y-8">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h2>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Alex" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Alex Johnson</CardTitle>
              <CardDescription>Premium Member</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">5 Vaults</Badge>
              <Badge variant="secondary">2 Shared</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold tracking-tight">Your Vaults</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Vault
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Personal", count: 15 },
            { name: "Work", count: 32 },
            { name: "Family", count: 8 },
            { name: "Travel", count: 12 },
            { name: "Finance", count: 20 },
          ].map((vault) => (
            <Card key={vault.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  {vault.name}
                </CardTitle>
                <CardDescription>{vault.count} items</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Open Vault
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}