import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, FileSearch, MessageSquare, LineChart } from "lucide-react";

type Template = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  agents: number;
};

const templates: Template[] = [
  {
    id: "research",
    name: "Asistente de Investigación",
    description:
      "Equipo de agentes para investigación y análisis de información",
    icon: <FileSearch className="h-6 w-6" />,
    difficulty: "Principiante",
    agents: 3,
  },
  {
    id: "customer-service",
    name: "Atención al Cliente",
    description:
      "Sistema automatizado de atención al cliente con múltiples especialidades",
    icon: <MessageSquare className="h-6 w-6" />,
    difficulty: "Intermedio",
    agents: 4,
  },
  {
    id: "market-analysis",
    name: "Análisis de Mercado",
    description:
      "Equipo para análisis de datos de mercado y generación de informes",
    icon: <LineChart className="h-6 w-6" />,
    difficulty: "Avanzado",
    agents: 5,
  },
  {
    id: "custom",
    name: "Personalizado",
    description: "Comienza desde cero con un lienzo en blanco",
    icon: <Brain className="h-6 w-6" />,
    difficulty: "Principiante",
    agents: 0,
  },
];

export default function TemplateStep() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: Template["difficulty"]) => {
    switch (difficulty) {
      case "Principiante":
        return "bg-green-100 text-green-800";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "Avanzado":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === template.id
              ? "border-2 border-primary"
              : "border"
          }`}
          onClick={() => setSelectedTemplate(template.id)}
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-full bg-primary/10">
              {template.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {template.description}
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Badge
                  variant="secondary"
                  className={getDifficultyColor(template.difficulty)}
                >
                  {template.difficulty}
                </Badge>
                {template.agents > 0 && (
                  <Badge variant="outline">{template.agents} agentes</Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
