import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calculator,
  Code,
  Database,
  Globe,
  FileText,
} from "lucide-react";

type Tool = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  requiresConfig: boolean;
  config?: Record<string, string>;
};

export default function ToolsStep() {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: "web-search",
      name: "Búsqueda Web",
      description: "Permite a los agentes buscar información en internet",
      icon: <Search className="h-5 w-5" />,
      enabled: false,
      requiresConfig: true,
      config: {
        "api-key": "",
      },
    },
    {
      id: "calculator",
      name: "Calculadora",
      description: "Realiza cálculos matemáticos complejos",
      icon: <Calculator className="h-5 w-5" />,
      enabled: true,
      requiresConfig: false,
    },
    {
      id: "code-interpreter",
      name: "Intérprete de Código",
      description: "Ejecuta código en varios lenguajes de programación",
      icon: <Code className="h-5 w-5" />,
      enabled: false,
      requiresConfig: false,
    },
    {
      id: "database",
      name: "Base de Datos",
      description: "Conecta con bases de datos SQL y NoSQL",
      icon: <Database className="h-5 w-5" />,
      enabled: false,
      requiresConfig: true,
      config: {
        "connection-string": "",
      },
    },
    {
      id: "web-browser",
      name: "Navegador Web",
      description:
        "Permite a los agentes navegar y extraer información de páginas web",
      icon: <Globe className="h-5 w-5" />,
      enabled: false,
      requiresConfig: false,
    },
    {
      id: "file-reader",
      name: "Lector de Archivos",
      description: "Lee y procesa diferentes tipos de archivos",
      icon: <FileText className="h-5 w-5" />,
      enabled: false,
      requiresConfig: false,
    },
  ]);

  const toggleTool = (id: string) => {
    setTools(
      tools.map((tool) =>
        tool.id === id ? { ...tool, enabled: !tool.enabled } : tool,
      ),
    );
  };

  const updateConfig = (toolId: string, key: string, value: string) => {
    setTools(
      tools.map((tool) =>
        tool.id === toolId
          ? { ...tool, config: { ...tool.config, [key]: value } }
          : tool,
      ),
    );
  };

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <Card key={tool.id} className="p-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-full bg-primary/10">{tool.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
                <Switch
                  checked={tool.enabled}
                  onCheckedChange={() => toggleTool(tool.id)}
                />
              </div>

              {tool.enabled && tool.requiresConfig && tool.config && (
                <div className="mt-4 space-y-3">
                  {Object.entries(tool.config).map(([key, value]) => (
                    <div key={key}>
                      <Label className="text-sm">
                        {key
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ")}
                      </Label>
                      <Input
                        value={value}
                        onChange={(e) =>
                          updateConfig(tool.id, key, e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
