import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="">
    <Button variant={"outline"} className="fixed top-2 left-2">
        <Link href="/">
            <span className="flex justify-between items-center gap-2">
              <Icons.arrowleft/>
            Back
            </span>
        </Link>
    </Button>
    {children}
    </div>;
}
