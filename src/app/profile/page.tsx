
"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";

const availabilityOptions = [
  "Weekdays Mornings", "Weekdays Afternoons", "Weekdays Evenings",
  "Weekends Mornings", "Weekends Afternoons", "Weekends Evenings"
];

// Mock data for the current user
const initialProfile = {
  name: 'Alice Johnson',
  location: 'San Francisco, CA',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  initials: 'AJ',
  skillsOffered: 'Photoshop, Illustration, Logo Design',
  skillsWanted: 'Creative Writing, SEO Basics',
  availability: ["Weekdays Afternoons", "Weekends Mornings"],
  isPublic: true,
};

type ProfileData = typeof initialProfile;

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ProfileData, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    setProfile(prev => {
      const newAvailability = checked
        ? [...prev.availability, option]
        : prev.availability.filter(item => item !== option);
      return { ...prev, availability: newAvailability };
    });
  };

  const handleSaveChanges = () => {
    // Here you would typically send the data to a server
    console.log("Saving profile:", profile);
    toast({
      title: "Profile Saved!",
      description: "Your changes have been successfully saved.",
    });
  };

  const handleUploadPicture = () => {
    // This would open a file dialog
    toast({
      title: "Feature not implemented",
      description: "Uploading a new picture is not yet available.",
      variant: "destructive",
    });
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight font-headline">My Profile</h1>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
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
                  <Input 
                    id="name" 
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (optional)</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g. San Francisco, CA" 
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
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
                    value={profile.skillsOffered}
                    onChange={(e) => handleInputChange('skillsOffered', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Separate skills with a comma.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills-wanted">Skills Wanted</Label>
                  <Textarea 
                    id="skills-wanted" 
                    placeholder="e.g. Creative Writing, SEO Basics"
                    value={profile.skillsWanted}
                    onChange={(e) => handleInputChange('skillsWanted', e.target.value)}
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
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback>{profile.initials}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" onClick={handleUploadPicture}>Upload New Picture</Button>
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availabilityOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.toLowerCase().replace(/\s/g, '-')}
                      checked={profile.availability.includes(option)}
                      onCheckedChange={(checked) => handleAvailabilityChange(option, !!checked)}
                    />
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
                  <Switch 
                    id="profile-public"
                    checked={profile.isPublic}
                    onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                  />
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
