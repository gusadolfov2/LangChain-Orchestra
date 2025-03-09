import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function APIKeyStep() {
  const [keys, setKeys] = useState({
    openai: "",
    anthropic: "",
  });

  const [validationStatus, setValidationStatus] = useState<{
    openai?: "success" | "error";
    anthropic?: "success" | "error";
  }>({});

  const validateKey = async (provider: "openai" | "anthropic", key: string) => {
    // Aquí iría la validación real de las claves API
    // Por ahora simulamos una validación
    try {
      setValidationStatus((prev) => ({
        ...prev,
        [provider]: key.startsWith(provider === "openai" ? "sk-" : "sk-")
          ? "success"
          : "error",
      }));
    } catch (error) {
      setValidationStatus((prev) => ({
        ...prev,
        [provider]: "error",
      }));
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Las claves API son necesarias para conectar con los modelos de
          lenguaje. Se almacenarán de forma segura y encriptada.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div>
          <Label htmlFor="openai-key" className="text-sm font-medium">
            OpenAI API Key
          </Label>
          <div className="mt-1 relative">
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              value={keys.openai}
              onChange={(e) => {
                setKeys({ ...keys, openai: e.target.value });
                validateKey("openai", e.target.value);
              }}
              className="pr-10"
            />
            {validationStatus.openai && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {validationStatus.openai === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Necesaria para usar GPT-4 y GPT-3.5-Turbo
          </p>
        </div>

        <div>
          <Label htmlFor="anthropic-key" className="text-sm font-medium">
            Anthropic API Key
          </Label>
          <div className="mt-1 relative">
            <Input
              id="anthropic-key"
              type="password"
              placeholder="sk-..."
              value={keys.anthropic}
              onChange={(e) => {
                setKeys({ ...keys, anthropic: e.target.value });
                validateKey("anthropic", e.target.value);
              }}
              className="pr-10"
            />
            {validationStatus.anthropic && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {validationStatus.anthropic === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Necesaria para usar Claude-3
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => {
            validateKey("openai", keys.openai);
            validateKey("anthropic", keys.anthropic);
          }}
        >
          Verificar Claves
        </Button>
      </div>
    </div>
  );
}
