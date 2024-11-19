import { Button } from "@/components/shadcnComponents/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcnComponents/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { AlertCircle, RefreshCcw, X } from "lucide-react";

interface ErrorPopoverProps {
  error: string | null;
  trigger?: React.ReactNode;
}

export function ErrorPopover({ error, trigger }: ErrorPopoverProps) {
  const handleRetry = () => {
    window.location.reload();
  };

  if (!error) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || <AlertCircle className="h-4 w-4 text-red-500" />}
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-neutral-800 text-white border-neutral-700">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>Device Error</span>
          </div>
          <PopoverClose asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
        </div>
        <p className="text-sm mt-2">{error}</p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4 w-full"
          onClick={handleRetry}
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </PopoverContent>
    </Popover>
  );
}
