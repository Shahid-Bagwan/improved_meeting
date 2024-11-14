"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutGrid, Maximize, X } from "lucide-react";

interface LayoutOption {
  id: string;
  name: string;
  icon: JSX.Element;
}

const layouts: LayoutOption[] = [
  {
    id: "sidebar",
    name: "Sidebar with Large Main Video",
    icon: <Maximize className="h-5 w-5" />,
  },
  {
    id: "grid",
    name: "Grid Layout",
    icon: <LayoutGrid className="h-5 w-5" />,
  },
];

interface LayoutSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLayout: (layoutId: string) => void;
  currentLayout: string;
}

export function LayoutSelector({
  isOpen,
  onClose,
  onSelectLayout,
  currentLayout,
}: LayoutSelectorProps) {
  return (
    <div
      className={`fixed right-0 top-0 bottom-0 w-96 bg-neutral-900 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        <h2 className="text-lg font-medium text-white">Choose Layout</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-neutral-800"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4 space-y-4">
          {layouts.map((layout) => (
            <div
              key={layout.id}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                currentLayout === layout.id
                  ? "bg-blue-600"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
              onClick={() => {
                onSelectLayout(layout.id);
                onClose();
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                {layout.icon}
                <h3 className="text-white font-medium">{layout.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
