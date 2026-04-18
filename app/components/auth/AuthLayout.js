import Image from "next/image";

export default function AuthLayout({ children, hideHeader = false }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* LEFT AREA */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative">
        <div className="w-20 bg-primary flex flex-col items-center py-6 shrink-0">
          <div className="relative w-12 h-12">
            <Image
              src="/images/logo.png"
              alt="HR Logo"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center px-12 lg:px-16 xl:px-24 bg-background">
          <div className="w-full max-w-[560px] mx-auto">
            <div className="mb-10 relative h-[350px] w-full">
              <Image
                src="/images/HeroBanner.png"
                alt="AI-driven hiring illustration"
                fill
                sizes="(max-width: 1024px) 100vw, 448px"
                priority
                className="object-contain"
              />
            </div>

            <h1 className="text-3xl font-bold text-black leading-tight mb-2">
              Empowering and streamlining work with <br />
              AI-driven hiring <br />
              <span className="text-accent">Effortless candidate management.</span>
            </h1>
            <a href="#" className="inline-block mt-8 text-sm text-gray-700">
              Lean More about AI-powered HR
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT AREA*/}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 bg-background">
        {!hideHeader && (
          <div className="text-center mb-4 lg:mb-6 mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold text-primary mb-1">Welcome to the AICRM</h2>
            <p className="text-sm text-gray-500">Please sign in or register to continue.</p>
          </div>
        )}

        <div className="flex justify-center flex-none">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}