import { SignUp } from "@/components/signUp";

export default function Home() {
  return (
    <div className="bg-linear-to-r from-[#001AFF] to-[#00DBDE] min-h-screen py-12 flex items-center justify-center ">
      {/* <div className="bg-[url(/bg.png)] opacity-10 h-screen  items-center"></div> */}

      <div className="py-4">
        <SignUp />
      </div>
    </div>
  );
}
