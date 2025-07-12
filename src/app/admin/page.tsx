import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentModeration } from '@/components/content-moderation';

export default function AdminPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Admin Dashboard</h1>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation Tool</CardTitle>
              <CardDescription>
                Use AI to check skill descriptions for inappropriate or spammy content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentModeration />
            </CardContent>
          </Card>

          {/* Other admin panels can be added here */}
          {/* For example: User Management, Platform Messages, Reports etc. */}
        </div>
      </div>
    </AppLayout>
  );
}
