'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LogOut, User, Volume2, Languages, Check } from 'lucide-react';
import PageHeader from '@/components/page-header';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';

type ProfileFormValues = {
  name: string
  farmLocation: string
  cropType: string
  language: string
}

export default function SettingsPage() {
  const { translations, language, setLanguage } = useContext(LanguageContext);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "John Farmer",
      farmLocation: "Central Valley, CA",
      cropType: "Tomatoes",
      language: language
    }
  })

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log(data);
    setLanguage(data.language as 'en' | 'ta' | 'fr' | 'ja');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={translations.settings.title} subtitle={translations.settings.subtitle} />
      
      <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline"><User /> {translations.settings.profile.title}</CardTitle>
                <CardDescription className="text-lg">{translations.settings.profile.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">{translations.settings.profile.name}</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="farmLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">{translations.settings.profile.farmLocation}</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Salinas Valley, CA" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormDescription>{translations.settings.profile.farmLocationDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">{translations.settings.profile.cropType}</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Strawberries" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormDescription>{translations.settings.profile.cropTypeDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline"><Languages /> {translations.settings.language.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[280px] h-12 text-lg">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en" className="text-lg">{translations.settings.language.english}</SelectItem>
                          <SelectItem value="ta" className="text-lg">{translations.settings.language.tamil}</SelectItem>
                          <SelectItem value="fr" className="text-lg">{translations.settings.language.french}</SelectItem>
                          <SelectItem value="ja" className="text-lg">{translations.settings.language.japanese}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="text-center">
              <Button type="submit" className="h-12 text-lg px-8 gap-2">
                <Check /> {translations.settings.saveButton}
              </Button>
            </div>
          </form>
        </Form>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline"><Volume2 /> {translations.settings.sound.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Switch id="sound-effects" />
              <Label htmlFor="sound-effects" className="text-lg">{translations.settings.sound.enableSoundEffects}</Label>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
            <Button asChild variant="destructive" className="h-12 text-lg gap-2">
                <Link href="/"><LogOut /> {translations.settings.logoutButton}</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
