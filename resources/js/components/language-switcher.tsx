import React from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import "flag-icons/css/flag-icons.min.css";

interface LanguageOption {
  code: string;
  name: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'us', name: 'English' },
  { code: 'ru', name: 'Русский' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
            <span className={`fi fi-${i18n.language}`}></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languageOptions.map(({ code, name }) => (
          <DropdownMenuItem key={code} onClick={() => changeLanguage(code)}>
            <span className={`fi fi-${code} mr-2`}></span> {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
