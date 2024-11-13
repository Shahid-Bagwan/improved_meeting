"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Shield } from "lucide-react";

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed right-0 top-16 bottom-0 w-80 bg-neutral-900 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Tabs defaultValue="people" className="h-full">
        <TabsList className="w-full justify-start p-2 bg-neutral-900">
          <TabsTrigger value="people" className="flex gap-2">
            <Users className="h-4 w-4" />
            People
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="people" className="p-4">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">John Doe</p>
                  <p className="text-sm text-gray-400">Host</p>
                </div>
                <Button variant="ghost" size="sm">
                  Pin
                </Button>
              </div>
              {/* More participants... */}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="chat" className="p-4">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              <div className="bg-neutral-800 rounded-lg p-3">
                <p className="text-sm text-gray-400">John Doe</p>
                <p className="text-white">Hello everyone!</p>
              </div>
              {/* More chat messages... */}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="security" className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white">Meeting Security</h3>
              <p className="text-sm text-gray-400">Manage meeting access and security settings</p>
            </div>
            {/* Security options... */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}