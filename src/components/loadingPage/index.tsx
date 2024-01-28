import ReactLoading from "react-loading";
import icons from "@/assets";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex-col gap-8 bg-slate-100 flex items-center justify-center">
      <div className="relative max-w-[350px] w-full">
        <Image src={icons.tokenLabLogo} alt="TokenLabLogo" className="w-full" />
      </div>
      <ReactLoading type="balls" color="#4F86C6" height={80} width={80} />
    </div>
  );
};

export default LoadingPage;
