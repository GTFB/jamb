'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@jamb/ui';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {session.user?.name}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={() => signIn('github')}
      className="bg-gray-900 hover:bg-gray-800"
    >
      Sign in with GitHub
    </Button>
  );
}
