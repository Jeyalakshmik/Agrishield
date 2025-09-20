'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShieldAlert, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';

export default function BottomNav() {
  const pathname = usePathname();
  const { translations } = useContext(LanguageContext);
  
  const navItems = [
    { href: '/dashboard', label: translations.nav.dashboard, icon: LayoutDashboard },
    { href: '/alerts', label: translations.nav.alerts, icon: ShieldAlert },
    { href: '/settings', label: translations.nav.settings, icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t border-border shadow-t-lg z-50">
      <div className="flex h-full items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-24 h-full text-muted-foreground transition-colors duration-200',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-7 w-7" />
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
