import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type AgentConfig = {
  name: string;
  role: string;
  model: string;
  temperature: number;
};

export default function AgentConfigStep() {
  const [agents, setAgents] = useState<AgentConfig[]>([
    {
      name: "Investigador Principal",
      role: "researcher",
      model: "gpt-4",
      temperature: 0.7,
    },
    {
      name: "Analista de Datos",
      role: "analyst",
      model: "gpt-4",
      temperature: 0.3,
    },
  ]);

  const updateAgent = (index: number, field: keyof AgentConfig, value: any) => {
    const newAgents = [...agents];
    newAgents[index] = { ...newAgents[index], [field]: value };
    setAgents(newAgents);
  };

  return (
    <div className="space-y-6">
      {agents.map((agent, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            <div>
              <Label>Nombre del Agente</Label>
              <Input
                value={agent.name}
                onChange={(e) => updateAgent(index, "name", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Rol</Label>
              <Select
                value={agent.role}
                onValueChange={(value) => updateAgent(index, "role", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="researcher">Investigador</SelectItem>
                  <SelectItem value="analyst">Analista</SelectItem>
                  <SelectItem value="writer">Redactor</SelectItem>
                  <SelectItem value="reviewer">Revisor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Modelo de Lenguaje</Label>
              <Select
                value={agent.model}
                onValueChange={(value) => updateAgent(index, "model", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3-opus">Claude-3 Opus</SelectItem>
                  <SelectItem value="claude-3-sonnet">
                    Claude-3 Sonnet
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Temperatura ({agent.temperature})
                <span className="text-sm text-muted-foreground ml-2">
                  Controla la creatividad del agente
                </span>
              </Label>
              <Slider
                value={[agent.temperature]}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
                onValueChange={([value]) =>
                  updateAgent(index, "temperature", value)
                }
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
