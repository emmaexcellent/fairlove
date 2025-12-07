"use client";
import { Loader2, Send } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { useAuth } from '@/context/auth';
import { createSocialMessage } from '@/lib/appwrite/crud';

interface SocialMessageFormProps {
    onMessagePosted: () => void;
}

const SocialMessageForm = ({ onMessagePosted }: SocialMessageFormProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (message.trim().length === 0) {
      toast.warning('Please enter a message before submitting.');
      setIsSubmitting(false);
      return;
    }

    try {
        const response = await createSocialMessage({
            content: message,
            authorId: user?.$id,
        });
        if (response) {
            toast.success('Message posted anonymously!');
            setMessage('');
            onMessagePosted();
        } else {
            toast.error('Failed to post message. Please try again later.');
        }
    } catch (error) {
      console.error('Error posting message:', error);
      toast.error('Failed to post message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-primary/10 border-white/20">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <Textarea
            placeholder="What's on your mind? Share it anonymously..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] bg-white/10 border-white/20 placeholder:text-muted-foreground"
            disabled={isSubmitting}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-400 to-primary hover:from-primary hover:to-primary text-white font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Post Anonymously
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SocialMessageForm;
