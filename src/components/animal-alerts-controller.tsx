
'use client';

import { useState, useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { filterAnimalIntrusionAlert } from '@/ai/flows/animal-intrusion-alert-filtering';
import { Rabbit, Bird, PawPrint, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LanguageContext } from '@/context/language-context';
import { startThreateningSound } from '@/lib/animalDeterrentSound';

type AnimalEvent = {
  id: number;
  animalType: string;
  timestamp: Date;
  shouldAlert: boolean;
  reason: string;
  icon: React.ElementType;
  imageUrl: string;
};

const animalTypes = [
  { type: 'Deer', icon: PawPrint, imageId: 'deer' },
  { type: 'Rabbit', icon: Rabbit, imageId: 'rabbit' },
  { type: 'Bird', icon: Bird, imageId: 'bird' },
  { type: 'Fox', icon: PawPrint, imageId: 'fox' },
];

export default function AnimalAlertsController() {
  const { toast } = useToast();
  const [events, setEvents] = useState<AnimalEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { translations, language } = useContext(LanguageContext);
  const [randomAnimal, setRandomAnimal] = useState(animalTypes[0]);

  useEffect(() => {
    // Defer random selection to client-side to avoid hydration mismatch
    setRandomAnimal(animalTypes[Math.floor(Math.random() * animalTypes.length)]);
  }, [events]); // Re-roll random animal after each event

  const handleSimulateIntrusion = async () => {
    setIsLoading(true);

    const input = {
      animalType: randomAnimal.type,
      farmLocation: 'Central Valley, CA', // This could come from user settings in a real app
      cropType: 'Tomatoes', // This could also come from user settings
      language: language,
    };

    try {
      const result = await filterAnimalIntrusionAlert(input);
      const newEvent: AnimalEvent = {
        id: Date.now(),
        animalType: randomAnimal.type,
        timestamp: new Date(),
        shouldAlert: result.shouldAlert,
        reason: result.reason,
        icon: randomAnimal.icon,
        imageUrl: PlaceHolderImages.find(img => img.id === randomAnimal.imageId)?.imageUrl || ''
      };

      setEvents((prevEvents) => [newEvent, ...prevEvents]);

      // Play sound only if the AI determines it's a threat.
      if (result.shouldAlert) {
        startThreateningSound(10000, 0.5); // Start 10-second alarm for simulated alerts
      }

      toast({
        title: (
          <div className="flex items-center gap-2">
            {result.shouldAlert ? (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            <span>{`${translations.animalAlerts.intrusionAlert}: ${randomAnimal.type}`}</span>
          </div>
        ),
        description: result.reason,
        variant: result.shouldAlert ? 'destructive' : 'default',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error in animal alerts controller:', error);
      toast({
        title: 'Error',
        description: 'Could not process the intrusion event.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleSimulateIntrusion} disabled={isLoading} className="mb-6 h-12 text-lg">
        {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <PawPrint className="mr-2 h-4 w-4" />}
        {translations.animalAlerts.simulateIntrusion}
      </Button>
      <h3 className="text-xl font-bold font-headline mb-4">{translations.animalAlerts.recentEvents}</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {events.length === 0 ? (
          <p className="text-muted-foreground text-lg">{translations.animalAlerts.noRecentIntrusions}</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
              <Image src={event.imageUrl} alt={event.animalType} width={64} height={64} className="rounded-md object-cover w-16 h-16" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-lg">{event.animalType} {translations.animalAlerts.detected}</p>
                  <Badge variant={event.shouldAlert ? 'destructive' : 'secondary'}>
                    {event.shouldAlert ? translations.animalAlerts.alert : translations.animalAlerts.logged}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.reason}</p>
              </div>
              <p className="text-xs text-muted-foreground self-start">{format(event.timestamp, 'p')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
