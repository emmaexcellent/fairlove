"use client";
import { Loader2, Send } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useAuth } from '@/context/auth';
import { createComment } from '@/lib/appwrite/crud';

interface CommentFormProps {
    messageId: string;
    onCommentPosted: () => void;
}

const CommentForm = ({ messageId, onCommentPosted }: CommentFormProps) => {
    const { user } = useAuth();
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (comment.trim().length === 0) {
            toast.warning('Please enter a comment before submitting.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await createComment({
                messageId,
                content: comment,
                authorId: user?.$id,
            });
            if (response) {
                toast.success('Comment posted anonymously!');
                setComment('');
                onCommentPosted();
            } else {
                toast.error('Failed to post comment. Please try again later.');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to post comment. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 pt-4 pl-4">
            <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[40px] bg-white/10 border-primary/20 placeholder:text-muted-foreground"
                disabled={isSubmitting}
            />
            <Button
                type="submit"
                className="bg-gradient-to-r from-pink-400 to-primary hover:from-primary hover:to-primary text-white font-semibold"
                disabled={isSubmitting}
                size="icon"
            >
                {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Send className="h-4 w-4" />
                )}
            </Button>
        </form>
    );
};

export default CommentForm;
