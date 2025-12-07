"use client";
import React, { useEffect, useState } from 'react';
import { getCommentsForMessage } from '@/lib/appwrite/crud';
import { Models } from 'appwrite';
import { Loader2 } from 'lucide-react';

interface CommentListProps {
    messageId: string;
    refreshKey: number;
}

const CommentList = ({ messageId, refreshKey }: CommentListProps) => {
    const [comments, setComments] = useState<Models.DefaultRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            const fetchedComments = await getCommentsForMessage(messageId);
            setComments(fetchedComments);
            setLoading(false);
        };

        fetchComments();
    }, [messageId, refreshKey]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4 pt-4">
            {comments.map((comment) => (
                <div key={comment.$id} className="text-sm bg-white/10 p-3 rounded-lg border">
                    <p className="text-foreground">{comment.content}</p>
                    <div className="text-xs italic text-muted-foreground pt-1">
                        Posted anonymously
                    </div>
                </div>
            ))}
            {comments.length === 0 && (
                <div className="text-sm text-center text-muted-foreground py-4">
                    No comments yet. Be the first to comment!
                </div>
            )}
        </div>
    );
};

export default CommentList;
