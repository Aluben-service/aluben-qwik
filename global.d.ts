declare global {
    interface Window {
      chemicalAction: (action: string, source: string) => void;
      chemical: any;  // Or replace `any` with a more specific type if you know the type of `chemical`
    }
}
  
export {}; 
