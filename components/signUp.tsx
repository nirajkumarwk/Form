import { Form } from "@/components/form";

export function SignUp() {
  return (
    <div className="bg-white w-96 h-auto p-8 rounded-lg space-y-8">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-linear-to-r from-cyan-500 to-blue-500 text-3xl text-white font-bold flex items-center justify-center w-16 h-16 mb-4 rounded-lg">SQ</div>
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-[#1A202C] font-semibold text-lg">Sign Up</h1>
          <p className="text-[#9E9E9E] text-xs">Sign up to SQ</p>
        </div>
      </div>
      <div className="">
        <Form />
        
        </div>
        <div className="text-[#767980] text-center text-[14px]">
            By sign up, you acknowledge that you have read and agree to the <span className="text-[#194BFB] underline">Privacy Policy.</span>
        </div>
    </div>
  );
}
