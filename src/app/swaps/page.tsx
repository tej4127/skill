
"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Star, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Defined a clear current user object
const currentUser = { id: 1, name: 'You', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', initials: 'AJ' };

// Other users in the system
const otherUsers = [
  { id: 2, name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', initials: 'BW' },
  { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', initials: 'CB' },
  { id: 4, name: 'Diana Miller', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g', initials: 'DM' },
  { id: 5, name: 'Ethan Davis', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h', initials: 'ED' },
];

const initialSwapRequests = [
  {
    id: 1,
    fromUser: otherUsers[0], // Bob
    toUser: currentUser,
    fromSkill: 'Excel',
    toSkill: 'Photoshop',
    status: 'pending',
  },
  {
    id: 2,
    fromUser: currentUser,
    toUser: otherUsers[1], // Charlie
    fromSkill: 'Creative Writing',
    toSkill: 'Yoga Instruction',
    status: 'pending',
  },
  {
    id: 3,
    fromUser: otherUsers[2], // Diana
    toUser: currentUser,
    fromSkill: 'Python',
    toSkill: 'Logo Design',
    status: 'completed',
    feedbackGiven: false,
  },
  {
    id: 4,
    fromUser: currentUser,
    toUser: otherUsers[3], // Ethan
    fromSkill: 'SEO Basics',
    toSkill: 'Guitar Lessons',
    status: 'completed',
    feedbackGiven: true,
  },
];

type SwapRequest = typeof initialSwapRequests[0];

const SwapRequestCard = ({ request, onUpdateRequest, onDeleteRequest }: { request: SwapRequest; onUpdateRequest: (id: number, newStatus: 'completed' | 'declined') => void; onDeleteRequest: (id: number) => void; }) => {
  const { toast } = useToast();
  const isIncoming = request.toUser.id === currentUser.id;
  const otherUser = isIncoming ? request.fromUser : request.toUser;

  const handleAccept = () => {
    onUpdateRequest(request.id, 'completed');
    toast({ title: "Swap Accepted!", description: `You can now coordinate with ${otherUser.name}.` });
  };
  
  const handleDecline = () => {
    onUpdateRequest(request.id, 'declined');
    toast({ title: "Swap Declined", variant: "destructive" });
  };

  const handleDelete = () => {
    onDeleteRequest(request.id);
    toast({ title: "Request Deleted", description: "Your swap request has been deleted." });
  };

  const handleLeaveFeedback = () => {
    // In a real app, this would update the feedbackGiven status
    toast({ title: "Feature not implemented", description: "Leaving feedback is not yet available.", variant: "destructive" });
  };

  if (request.status === 'declined') return null;

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
              <Button variant="outline" size="sm" onClick={handleDecline}><X className="mr-2 h-4 w-4" /> Decline</Button>
              <Button size="sm" onClick={handleAccept}><Check className="mr-2 h-4 w-4" /> Accept</Button>
            </>
          ) : (
            <Button variant="destructive" size="sm" onClick={handleDelete}><Trash2 className="mr-2 h-4 w-4" /> Delete Request</Button>
          )
        )}
        {request.status === 'completed' && !request.feedbackGiven && (
          <Button size="sm" variant="outline" onClick={handleLeaveFeedback}><Star className="mr-2 h-4 w-4" /> Leave Feedback</Button>
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
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>(initialSwapRequests);

  const handleUpdateRequest = (id: number, newStatus: 'completed' | 'declined') => {
    setSwapRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };
  
  const handleDeleteRequest = (id: number) => {
    setSwapRequests(prev => prev.filter(req => req.id !== id));
  };

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
              pendingRequests.map(req => <SwapRequestCard key={req.id} request={req} onUpdateRequest={handleUpdateRequest} onDeleteRequest={handleDeleteRequest} />)
            ) : (
              <p className="text-muted-foreground pt-4">You have no pending swap requests.</p>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {completedSwaps.length > 0 ? (
              completedSwaps.map(req => <SwapRequestCard key={req.id} request={req} onUpdateRequest={handleUpdateRequest} onDeleteRequest={handleDeleteRequest} />)
            ) : (
              <p className="text-muted-foreground pt-4">You have no completed swaps yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
