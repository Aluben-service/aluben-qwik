declare global {
    interface Window {
      chemicalAction: (action: string, source: string) => void;
    }
}
  
export {}; 
