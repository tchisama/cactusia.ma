import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="logo">
        <Link href="/">
          <img src="/path/to/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="buttons">
        <Link href="/button1">Button 1</Link>
        <Link href="/button2">Button 2</Link>
      </div>
    </nav>
  );
};

export default Navbar;
