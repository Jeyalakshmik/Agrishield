'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Siren, PawPrint, Bell } from 'lucide-react';
import SoilMoistureChart from '@/components/soil-moisture-chart';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/page-header';
import AnimalAlertsController from '@/components/animal-alerts-controller';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { startThreateningSound, stopThreateningSound } from '@/lib/animalDeterrentSound';

export default function DashboardPage() {
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);
  const { translations } = useContext(LanguageContext);


  useEffect(() => {
    if (isBuzzerActive) {
      startThreateningSound(120000, 0.6); // Start alarm for 2 minutes at 60% volume
    } else {
      stopThreateningSound();
    }

    // Ensure alarm is stopped on component unmount
    return () => {
        stopThreateningSound();
    }
  }, [isBuzzerActive]);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={translations.dashboard.title} subtitle={translations.dashboard.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Soil Moisture */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-headline">{translations.dashboard.soilMoisture}</CardTitle>
            <Droplets className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary">34%</div>
            <p className="text-md text-muted-foreground mt-1">
              {translations.dashboard.trendingUpwards}
            </p>
            <div className="h-[200px] mt-4">
              <SoilMoistureChart />
            </div>
          </CardContent>
        </Card>

        {/* Remote Buzzer */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-headline">{translations.dashboard.remoteBuzzer}</CardTitle>
            <Siren className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-8">
            <div className="relative w-32 h-32 mb-4">
                <Bell className="w-full h-full text-muted" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Switch 
                      id="buzzer-switch" 
                      className="scale-150"
                      checked={isBuzzerActive}
                      onCheckedChange={setIsBuzzerActive}
                    />
                </div>
            </div>
            <Label htmlFor="buzzer-switch" className="text-xl">{translations.dashboard.activateBuzzer}</Label>
            <p className="text-center text-muted-foreground mt-2 text-md">{translations.dashboard.buzzerDescription}</p>
          </CardContent>
        </Card>

        {/* Animal Intrusion Alerts */}
        <Card className="md:col-span-2 lg:col-span-3 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <PawPrint className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-headline">{translations.dashboard.animalIntrusionAlerts}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <AnimalAlertsController />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
