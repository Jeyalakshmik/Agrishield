import { PawPrint, Settings, Users, Droplets } from 'lucide-react';

export const MOCK_SOIL_MOISTURE_DATA = [
  { time: '12:00 AM', moisture: 22 },
  { time: '03:00 AM', moisture: 25 },
  { time: '06:00 AM', moisture: 30 },
  { time: '09:00 AM', moisture: 28 },
  { time: '12:00 PM', moisture: 32 },
  { time: '03:00 PM', moisture: 35 },
  { time: '06:00 PM', moisture: 34 },
];

export const MOCK_ALERTS = {
  animal: [
    {
      id: 1,
      title: 'Deer Detected',
      description: 'A deer was spotted near Quadrant 4. Poses a high risk to tomato crops.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      icon: PawPrint,
      isCritical: true,
    },
    {
      id: 2,
      title: 'Rabbit Detected',
      description: 'A rabbit was seen near the lettuce patch. Considered a minor threat.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      icon: PawPrint,
      isCritical: false,
    },
    {
      id: 3,
      title: 'Bird Flock',
      description: 'A large flock of birds passed over the fields. No immediate threat detected.',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      icon: PawPrint,
      isCritical: false,
    },
  ],
  system: [
    {
      id: 4,
      title: 'Watering Recommended',
      description: 'Soil moisture in Quadrant 2 is below the 20% threshold. Watering is advised.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      icon: Droplets,
      isCritical: true,
    },
    {
      id: 5,
      title: 'Buzzer Activated',
      description: 'The remote buzzer system was manually activated.',
      timestamp: new Date(Date.now() - 1000 * 60 * 62),
      icon: Settings,
      isCritical: false,
    },
    {
      id: 6,
      title: 'Software Update',
      description: 'AgriShield has been updated to version 1.2.0 with new features.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      icon: Settings,
      isCritical: false,
    },
  ],
  community: [
    {
      id: 7,
      title: 'Locust Swarm Warning',
      description: 'Neighboring farm (5 miles east) reported a locust swarm moving west.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      icon: Users,
      isCritical: true,
    },
    {
      id: 8,
      title: 'Shared Equipment',
      description: 'Farmer Brown has a spare tractor available for use this afternoon.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      icon: Users,
      isCritical: false,
    },
  ],
};
