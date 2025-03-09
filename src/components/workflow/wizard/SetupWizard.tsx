import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Key,
  Wand2,
  Wrench,
  Database,
} from "lucide-react";
import APIKeyStep from "./steps/APIKeyStep";
import TemplateStep from "./steps/TemplateStep";
import AgentConfigStep from "./steps/AgentConfigStep";
import ToolsStep from "./steps/ToolsStep";

type WizardStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

export default function SetupWizard({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: WizardStep[] = [
    {
      id: "api-keys",
      title: "Configurar Claves API",
      description:
        "Configura las claves necesarias para los modelos de lenguaje",
      icon: <Key className="h-6 w-6" />,
      component: <APIKeyStep />,
    },
    {
      id: "template",
      title: "Seleccionar Plantilla",
      description: "Elige una plantilla predefinida para tu flujo de trabajo",
      icon: <Wand2 className="h-6 w-6" />,
      component: <TemplateStep />,
    },
    {
      id: "agents",
      title: "Configurar Agentes",
      description: "Configura los agentes básicos para tu equipo",
      icon: <Database className="h-6 w-6" />,
      component: <AgentConfigStep />,
    },
    {
      id: "tools",
      title: "Conectar Herramientas",
      description: "Selecciona y configura las herramientas necesarias",
      icon: <Wrench className="h-6 w-6" />,
      component: <ToolsStep />,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex flex-col h-[600px]">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Asistente de Configuración
            </h2>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                {steps[currentStep].icon}
                <div>
                  <h3 className="font-semibold">{steps[currentStep].title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Paso {currentStep + 1} de {steps.length}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-1">
            {steps[currentStep].component}
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? (
                "Finalizar"
              ) : (
                <>
                  Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
