
"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from a database
const initialUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    initials: 'AJ',
    skillsOffered: ['Photoshop', 'Illustration', 'Logo Design'],
    skillsWanted: ['Creative Writing', 'SEO Basics'],
  },
  {
    id: 2,
    name: 'Bob Williams',
    location: 'New York, NY',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    initials: 'BW',
    skillsOffered: ['Excel', 'Data Analysis', 'QuickBooks'],
    skillsWanted: ['Public Speaking', 'Python'],
  },
  {
    id: 3,
    name: 'Charlie Brown',
    location: 'Chicago, IL',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    initials: 'CB',
    skillsOffered: ['Yoga Instruction', 'Meditation', 'Wellness Coaching'],
    skillsWanted: ['Social Media Marketing', 'Video Editing'],
  },
  {
    id: 4,
    name: 'Diana Miller',
    location: 'Austin, TX',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g',
    initials: 'DM',
    skillsOffered: ['Python', 'JavaScript', 'React'],
    skillsWanted: ['Graphic Design', 'Project Management'],
  },
  {
    id: 5,
    name: 'Ethan Davis',
    location: 'Seattle, WA',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h',
    initials: 'ED',
    skillsOffered: ['Guitar Lessons', 'Music Production'],
    skillsWanted: ['Web Development', 'Photography'],
  },
  {
    id: 6,
    name: 'Fiona Garcia',
    location: 'Miami, FL',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704i',
    initials: 'FG',
    skillsOffered: ['Spanish Tutoring', 'Salsa Dancing'],
    skillsWanted: ['Financial Planning', 'Excel'],
  },
];

type User = typeof initialUsers[0];

const UserCard = ({ user, onRequestSwap }: { user: User; onRequestSwap: (user: User) => void }) => (
  <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <CardHeader className="flex flex-row items-center gap-4 p-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <CardTitle className="text-xl font-headline">{user.name}</CardTitle>
        {user.location && (
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4 mr-1.5" />
            {user.location}
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent className="p-4 flex-grow flex flex-col justify-between">
      <div>
        <h4 className="font-semibold text-sm mb-2">Skills Offered</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {user.skillsOffered.map(skill => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
        <h4 className="font-semibold text-sm mb-2">Skills Wanted</h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted.map(skill => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>
      <Button className="w-full mt-6" onClick={() => onRequestSwap(user)}>Request Swap</Button>
    </CardContent>
  </Card>
);

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState<User[]>(initialUsers);
  const { toast } = useToast();

  const handleRequestSwap = (user: User) => {
    // In a real app, this would trigger a more complex flow, 
    // like opening a modal to select which skills to swap.
    // For now, we'll just show a notification.
    toast({
      title: "Swap Requested!",
      description: `Your request to swap skills with ${user.name} has been sent.`,
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    [...user.skillsOffered, ...user.skillsWanted].some(skill =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <h1 className="text-4xl font-bold tracking-tight font-headline">Find a Skill Swap</h1>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by skill or name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} onRequestSwap={handleRequestSwap} />
          ))}
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No users found matching your search.</p>
            <p>Try a different skill or name!</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
