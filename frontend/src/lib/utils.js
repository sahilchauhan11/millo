import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const fileDataUri=async(file)=>{
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = function() {
       if(typeof reader.result === 'string') resolve(reader.result); 
    };

    
    reader.readAsDataURL(file); 
});
}
