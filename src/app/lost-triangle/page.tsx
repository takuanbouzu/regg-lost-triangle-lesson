import type { Metadata } from 'next';
import LostTriangleAnimation from '@/components/LostTriangleAnimation';

export const metadata: Metadata = {
  title: 'The Lost Triangle — Gregg Fleishman',
  description: 'An animated proof: from a unit square to the 120° dihedral angle at the heart of Gregg Fleishman\'s architecture.',
};

export default function LostTrianglePage() {
  return <LostTriangleAnimation />;
}
