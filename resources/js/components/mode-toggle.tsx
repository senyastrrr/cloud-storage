import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button variant='ghost' size='icon' onClick={handleToggleTheme}>
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">{t("theme.toggle")}</span>
    </Button>
  )
}
