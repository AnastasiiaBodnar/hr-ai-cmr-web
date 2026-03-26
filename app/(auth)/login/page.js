import Input from "@/app/components/ui/Input"
import Button from "@/app/components/ui/Button"

export default function LoginPage() {
  return (
    <div>
    <Input placeholder = "Email address"/>
    <Button text="Log In" variant="primary" />
    </div>
  )
}