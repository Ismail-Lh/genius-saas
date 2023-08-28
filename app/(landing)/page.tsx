import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <h1>Landing page</h1>
      <Link href="/sign-in">
        <Button>Login</Button>
      </Link>

      <Link href="/sign-up">
        <Button>Register</Button>
      </Link>
    </div>
  );
}
