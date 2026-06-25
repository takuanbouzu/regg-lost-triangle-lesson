import Link from 'next/link';

type ActivePage = 'lesson' | 'math' | 'gallery' | 'about';

interface Props {
  active?: ActivePage;
}

export default function SiteNav({ active }: Props) {
  return (
    <nav id="gfnav">
      <Link className="brand" href="/">Gregg Fleishman</Link>
      <Link className={`navlink${active === 'lesson' ? ' active' : ''}`} href="/lost-triangle">Geometry Lesson</Link>
      <Link className={`navlink${active === 'math' ? ' active' : ''}`} href="/mathematics">The Lost Triangle</Link>
      <Link className={`navlink${active === 'gallery' ? ' active' : ''}`} href="/gallery">Gallery</Link>
      <Link className={`navlink${active === 'about' ? ' active' : ''}`} href="/about">About</Link>
    </nav>
  );
}
