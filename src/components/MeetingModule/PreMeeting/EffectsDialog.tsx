import { Button } from "@/components/shadcnComponents/button";
import { Dialog, DialogContent } from "@/components/shadcnComponents/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcnComponents/tabs";
import { X } from "lucide-react";

interface EffectsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EffectsDialog({ isOpen, onClose }: EffectsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Effects</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <Tabs defaultValue="backgrounds">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="backgrounds" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">
                Blur and personal backgrounds
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-video bg-muted rounded-lg" />
                <div className="aspect-video bg-muted rounded-lg" />
                <div className="aspect-video bg-muted rounded-lg" />
              </div>
              <h3 className="text-sm font-medium">Professional</h3>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-muted rounded-lg cursor-pointer hover:ring-2 hover:ring-primary"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
