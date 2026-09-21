import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { GlobalSearch } from '@/components/layout/GlobalSearch';
import { NotificationBell } from '@/components/shared/NotificationBell';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, User, LogOut, Settings as SettingsIcon, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onNavigate: (id: string) => void;
  searchDatasets: { id: string; name: string; description: string }[];
}

export function Header({ onNavigate, searchDatasets }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 shrink-0">
      <GlobalSearch onResultSelect={onNavigate} datasets={searchDatasets} />

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">SC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:block">Sarah Chen</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Sarah Chen</span>
                <span className="text-xs text-muted-foreground">Admin · admin@datalake.io</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate('access')}><User className="mr-2 h-4 w-4" /> Access Control</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('settings')}><SettingsIcon className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><LogOut className="mr-2 h-4 w-4" /> Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
