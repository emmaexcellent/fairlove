import MessageCard from '@/components/anonymous-message/MessageCard'
import { getUser } from '@/lib/appwrite/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const AnonymousMessage = async () => {
  const user = await getUser(); 
  if(!user) redirect("/login?redirect=/anonymous-message");
  return (
    <div>
      <MessageCard user ={user}/>
    </div>
  );
}

export default AnonymousMessage