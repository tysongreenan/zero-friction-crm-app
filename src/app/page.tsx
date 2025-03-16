import { redirect } from 'next/navigation';

// Redirect the root path to the dashboard
export default function Home() {
  redirect('/dashboard');
}
