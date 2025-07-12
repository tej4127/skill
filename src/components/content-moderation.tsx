"use client";

import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";
import {
  moderateSkillDescription,
  ModerateSkillDescriptionOutput,
} from "@/ai/flows/moderate-skill-descriptions";

export function ContentModeration() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<ModerateSkillDescriptionOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!description.trim()) {
      setResult(null);
      return;
    }
    startTransition(async () => {
      const moderationResult = await moderateSkillDescription({ skillDescription: description });
      setResult(moderationResult);
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Textarea
          placeholder="Enter a skill description to check..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
        <p className="text-sm text-muted-foreground mt-2">
          The AI will determine if the description is appropriate for the platform.
        </p>
      </div>
      <Button onClick={handleSubmit} disabled={isPending || !description.trim()}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Moderating...
          </>
        ) : (
          "Moderate Content"
        )}
      </Button>

      {result && (
        <Alert variant={result.isAppropriate ? "default" : "destructive"} className="mt-4">
          {result.isAppropriate ? (
            <ShieldCheck className="h-4 w-4" />
          ) : (
            <ShieldAlert className="h-4 w-4" />
          )}
          <AlertTitle>
            {result.isAppropriate ? "Content is Appropriate" : "Content Flagged"}
          </AlertTitle>
          <AlertDescription>
            {result.isAppropriate
              ? "This skill description appears to be safe and appropriate for the platform."
              : `Reason: ${result.reason || "The AI flagged this content as inappropriate."}`}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
