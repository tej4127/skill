"use client";

import { AppLayout } from '@/components/layout/app-layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

const availabilityOptions = [
  "Weekdays Mornings", "Weekdays Afternoons", "Weekdays Evenings",
  "Weekends Mornings", "Weekends Afternoons", "Weekends Evenings"
];

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight font-headline">My Profile</h1>
            <Button>Save Changes</Button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Manage your public profile details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Alice Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (optional)</Label>
                  <Input id="location" placeholder="e.g. San Francisco, CA" defaultValue="San Francisco, CA" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Skills</CardTitle>
                <CardDescription>List the skills you can offer and what you're looking for.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills-offered">Skills Offered</Label>
                  <Textarea 
                    id="skills-offered"
                    placeholder="e.g. Photoshop, Illustration, Logo Design"
                    defaultValue="Photoshop, Illustration, Logo Design"
                  />
                  <p className="text-sm text-muted-foreground">Separate skills with a comma.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills-wanted">Skills Wanted</Label>
                  <Textarea 
                    id="skills-wanted" 
                    placeholder="e.g. Creative Writing, SEO Basics"
                    defaultValue="Creative Writing, SEO Basics"
                  />
                   <p className="text-sm text-muted-foreground">Separate skills with a comma.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Avatar className="w-32 h-32">
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Upload New Picture</Button>
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availabilityOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox id={option.toLowerCase().replace(/\s/g, '-')} />
                    <Label htmlFor={option.toLowerCase().replace(/\s/g, '-')}>{option}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profile Privacy</CardTitle>
                <CardDescription>A private profile won't appear in public search results.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch id="profile-public" defaultChecked />
                  <Label htmlFor="profile-public">Public Profile</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
