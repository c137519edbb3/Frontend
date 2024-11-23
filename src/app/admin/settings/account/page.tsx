import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./account-form"


export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Organization Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your organization account settings. Set your defaults and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
