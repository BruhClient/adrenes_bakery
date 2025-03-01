import { FunctionComponent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {  Laugh } from "lucide-react";

interface PromotionBannerProps {
    message : string, 
    subText : string, 
}
 
const PromotionBanner: FunctionComponent<PromotionBannerProps> = ({message,subText}) => {
    return ( <Alert className="max-w-[1200px] w-full flex items-center justify-center flex-col bg-secondary shadow-md text-center">
        
        <AlertTitle className="font-bold text-2xl flex items-center gap-2"><Laugh />Promotion Alert</AlertTitle>
        <AlertDescription className="text-lg">
          {message}
        </AlertDescription>
        <div>{subText}</div>
      </Alert> );
}
 
export default PromotionBanner;