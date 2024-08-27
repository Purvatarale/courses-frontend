import {NAV_LINKS} from '@/constants';
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-row flex-wrap mx-auto p-16 align-center justify-center gap-4">
      {NAV_LINKS.map((link:any) => {
        return (
          <Link key={link.url} href={link.url} className="flex w-[120px] justify-center items-center border-2 transition-all hover:border-solid border-dotted aspect-square rounded-lg">
              {link.name}
          </Link>
          )
        })}
    </main>
  );
}
