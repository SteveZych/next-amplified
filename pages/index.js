//Home page and entry to the app
//Describes what the app does (Intentory management, quality control tracking, etc.)
//Log in button redirects to the dashboard which is wrapped in an authenticator so user 
// sign in to view the dashboard

import Link from 'next/link';

function Home() {
  
  return (
    //
    <div>
      <p>This is the home screen</p>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}

export default Home;
