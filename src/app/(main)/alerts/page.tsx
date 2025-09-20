'use client';
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PawPrint, Settings, Users, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MOCK_ALERTS } from '@/lib/data';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AlertsPage() {
  const { translations } = useContext(LanguageContext);
  
  const getAlertImage = (title: string) => {
    if (title.toLowerCase().includes('deer')) return PlaceHolderImages.find(img => img.id === 'deer')?.imageUrl;
    if (title.toLowerCase().includes('rabbit')) return PlaceHolderImages.find(img => img.id === 'rabbit')?.imageUrl;
    if (title.toLowerCase().includes('bird')) return PlaceHolderImages.find(img => img.id === 'bird')?.imageUrl;
    if (title.toLowerCase().includes('fox')) return PlaceHolderImages.find(img => img.id === 'fox')?.imageUrl;
    return "https://picsum.photos/seed/placeholder/200/200";
  }

  const renderAlert = (alert: any) => (
    <div key={alert.id} className="flex items-start gap-4 p-4 border-b last:border-b-0">
      <div className="relative h-16 w-16 rounded-md overflow-hidden">
        <Image src={getAlertImage(alert.title)} alt={alert.title} fill={true} objectFit="cover" data-ai-hint="animal alert"/>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold font-headline">{alert.title}</p>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
          </span>
        </div>
        <p className="text-lg text-muted-foreground">{alert.description}</p>
      </div>
      {alert.isCritical && (
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-bold">{translations.alerts.critical}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={translations.alerts.title} subtitle={translations.alerts.subtitle} />
      
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="animal">
            <TabsList className="w-full justify-around h-16 rounded-t-lg rounded-b-none p-2">
              <TabsTrigger value="animal" className="flex-1 text-lg gap-2 data-[state=active]:py-3"><PawPrint /> {translations.alerts.animalTab}</TabsTrigger>
              <TabsTrigger value="system" className="flex-1 text-lg gap-2 data-[state=active]:py-3"><Settings /> {translations.alerts.systemTab}</TabsTrigger>
              <TabsTrigger value="community" className="flex-1 text-lg gap-2 data-[state=active]:py-3"><Users /> {translations.alerts.communityTab}</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[calc(100vh-220px)]">
              <TabsContent value="animal">
                {MOCK_ALERTS.animal.map(renderAlert)}
              </TabsContent>
              <TabsContent value="system">
                {MOCK_ALERTS.system.map(renderAlert)}
              </TabsContent>
              <TabsContent value="community">
                {MOCK_ALERTS.community.map(renderAlert)}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
