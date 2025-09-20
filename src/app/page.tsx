
'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tractor } from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import Image from 'next/image';


export default function LoginPage() {
  const { translations } = useContext(LanguageContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 relative">
       <Image
        src="https://picsum.photos/seed/farm-login/1200/800"
        alt="Farm background"
        fill={true}
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="farm background"
      />
      <div className="relative z-10 flex flex-col items-center text-center bg-background/80 backdrop-blur-sm p-8 rounded-xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-primary rounded-full p-4 mb-4">
            <Tractor className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold font-headline text-primary">AgriShield</h1>
          <p className="text-lg text-muted-foreground mt-2">{translations.login.subtitle}</p>
        </div>
        <Card className="w-full max-w-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">{translations.login.title}</CardTitle>
            <CardDescription className="text-lg">{translations.login.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg">{translations.login.emailLabel}</Label>
                <Input id="email" type="email" placeholder="farmer@example.com" className="text-lg h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg">{translations.login.passwordLabel}</Label>
                <Input id="password" type="password" placeholder="••••••••" className="text-lg h-12" />
              </div>
              <Button asChild className="w-full h-12 text-lg">
                <Link href="/dashboard">{translations.login.loginButton}</Link>
              </Button>
              <div className="text-center text-md">
                <p>
                  {translations.login.signupPrompt}{' '}
                  <Link href="#" className="underline text-primary">
                    {translations.login.signupLink}
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
