"use client";

import { AppLayout } from '@/components/layout/app-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Star, Trash2, X } from 'lucide-react';

const currentUser = { id: 1, name: 'You' };

const swapRequests = [
  {
    id: 1,
    fromUser: { id: 2, name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', initials: 'BW' },
    toUser: currentUser,
    fromSkill: 'Excel',
    toSkill: 'Photoshop',
    status: 'pending',
  },
  {
    id: 2,
    fromUser: currentUser,
    toUser: { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', initials: 'CB' },
    fromSkill: 'Creative Writing',
    toSkill: 'Yoga Instruction',
    status: 'pending',
  },
  {
    id: 3,
    fromUser: { id: 4, name: 'Diana Miller', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g', initials: 'DM' },
    toUser: currentUser,
    fromSkill: 'Python',
    toSkill: 'Logo Design',
    status: 'completed',
    feedbackGiven: false,
  },
  {
    id: 4,
    fromUser: currentUser,
    toUser: { id: 5, name: 'Ethan Davis', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h', initials: 'ED' },
    fromSkill: 'SEO Basics',
    toSkill: 'Guitar Lessons',
    status: 'completed',
    feedbackGiven: true,
  },
];

const SwapRequestCard = ({ request }: { request: typeof swapRequests[0] }) => {
  const isIncoming = request.toUser.id === currentUser.id;
  const otherUser = isIncoming ? request.fromUser : request.toUser;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-lg">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={request.fromUser.avatar} />
              <AvatarFallback>{request.fromUser.initials}</AvatarFallback>
            </Avatar>
            <span>{request.fromUser.name}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={request.toUser.avatar} />
              <AvatarFallback>{request.toUser.initials}</AvatarFallback>
            </Avatar>
            <span>{request.toUser.name}</span>
          </div>
        </CardTitle>
        <CardDescription>
          Request to swap <Badge variant="secondary">{request.fromSkill}</Badge> for <Badge variant="secondary">{request.toSkill}</Badge>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2">
        {request.status === 'pending' && (
          isIncoming ? (
            <>
              <Button variant="outline" size="sm"><X className="mr-2 h-4 w-4" /> Decline</Button>
              <Button size="sm"><Check className="mr-2 h-4 w-4" /> Accept</Button>
            </>
          ) : (
            <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Delete Request</Button>
          )
        )}
        {request.status === 'completed' && !request.feedbackGiven && (
          <Button size="sm" variant="outline"><Star className="mr-2 h-4 w-4" /> Leave Feedback</Button>
        )}
        {request.status === 'completed' && request.feedbackGiven && (
          <div className="flex items-center text-sm text-green-600">
            <Check className="mr-2 h-4 w-4" /> Feedback Submitted
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default function SwapsPage() {
  const pendingRequests = swapRequests.filter(req => req.status === 'pending');
  const completedSwaps = swapRequests.filter(req => req.status === 'completed');

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">My Swaps</h1>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="completed">Completed Swaps</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map(req => <SwapRequestCard key={req.id} request={req} />)
            ) : (
              <p className="text-muted-foreground pt-4">You have no pending swap requests.</p>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {completedSwaps.length > 0 ? (
              completedSwaps.map(req => <SwapRequestCard key={req.id} request={req} />)
            ) : (
              <p className="text-muted-foreground pt-4">You have no completed swaps yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
