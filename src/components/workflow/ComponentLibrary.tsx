import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

type ComponentCategory = {
  id: string;
  name: string;
  items: ComponentItem[];
};

type ComponentItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const componentCategories: ComponentCategory[] = [
  {
    id: "agents",
    name: "Agents",
    items: [
      {
        id: "react-agent",
        name: "ReAct Agent",
        description: "Reasoning and acting agent with tool use capabilities",
        icon: "🧠",
      },
      {
        id: "planning-agent",
        name: "Planning Agent",
        description: "Agent that creates and follows plans to achieve goals",
        icon: "📝",
      },
      {
        id: "conversation-agent",
        name: "Conversation Agent",
        description: "Agent specialized in natural conversations",
        icon: "💬",
      },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    items: [
      {
        id: "web-search",
        name: "Web Search",
        description: "Search the web for information",
        icon: "🔍",
      },
      {
        id: "calculator",
        name: "Calculator",
        description: "Perform mathematical calculations",
        icon: "🧮",
      },
      {
        id: "code-interpreter",
        name: "Code Interpreter",
        description: "Execute code in various languages",
        icon: "💻",
      },
    ],
  },
  {
    id: "memory",
    name: "Memory",
    items: [
      {
        id: "conversation-memory",
        name: "Conversation Memory",
        description: "Store and retrieve conversation history",
        icon: "🧠",
      },
      {
        id: "vector-memory",
        name: "Vector Memory",
        description: "Store and retrieve information using embeddings",
        icon: "📊",
      },
    ],
  },
  {
    id: "connectors",
    name: "Connectors",
    items: [
      {
        id: "database-connector",
        name: "Database Connector",
        description: "Connect to SQL and NoSQL databases",
        icon: "🗄️",
      },
      {
        id: "api-connector",
        name: "API Connector",
        description: "Connect to external APIs",
        icon: "🔌",
      },
    ],
  },
];

export default function ComponentLibrary() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = componentCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0);

  const handleDragStart = (event: React.DragEvent, item: ComponentItem) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(item));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-full border rounded-md bg-card">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-8 pr-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={["agents"]}>
            {filteredCategories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-sm font-medium">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center p-2 rounded-md border bg-background cursor-grab hover:bg-accent hover:text-accent-foreground"
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                      >
                        <div className="mr-2 text-lg">{item.icon}</div>
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
