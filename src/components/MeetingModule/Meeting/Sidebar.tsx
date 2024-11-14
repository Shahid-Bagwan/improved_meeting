"use client";

import { Button } from "@/components/shadcnComponents/button";
import { ScrollArea } from "@/components/shadcnComponents/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcnComponents/tabs";
import { Users, MessageSquare, X } from "lucide-react";

export function Sidebar({
  isOpen,
  onClose,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  content: "chat" | "people";
}) {
  return (
    <div
      className={`fixed right-0 top-16 bottom-0 w-80 bg-white border-l shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute right-2 top-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Tabs defaultValue={content} className="h-full">
        <TabsList className="w-full justify-start p-2 bg-gray-50 border-b">
          <TabsTrigger
            value="people"
            className="flex gap-2 data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Users className="h-4 w-4" />
            People
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="flex gap-2 data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="people" className="p-4">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">Host</p>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  Pin
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="chat" className="p-4">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500">John Doe</p>
                <p className="text-gray-900">Hello everyone!</p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
