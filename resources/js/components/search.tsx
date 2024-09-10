import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchProps {
    onSearch: (query: string) => void;
}

export default function SearchComponent({ onSearch }: SearchProps) {
    const { t } = useTranslation();

    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center">
            <Input
                type="search"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={t("search-component.placeholder")}
                className="w-full "
            />
            <button
                type="button"
                onClick={handleSearch}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out"
            >
                <Search className="h-4 w-4" />
            </button>
        </div>
    );
}