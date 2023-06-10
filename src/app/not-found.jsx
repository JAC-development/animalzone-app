import Image from 'next/image';
import pet from '@logos/pet.png';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative my-5">
        <Image className="absolute -top-14 -right-8" src={pet} width={100} height={100} alt="pet" />
        <p className="text-6xl">
          4<span className="text-white">0</span>4
        </p>
      </div>
      <h2 className="my-4">Page not found</h2>
      <Link href={'/'}>
        <button className="py-2 px-4 bg-primary-y hover:opacity-70 rounded-full">Go back</button>
      </Link>
    </div>
  );
}
