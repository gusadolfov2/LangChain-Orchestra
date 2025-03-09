# Guía de Integración con LangChain

## Índice
1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Configuración de API Keys](#configuración-de-api-keys)
4. [Integración con LangChain](#integración-con-langchain)
5. [Configuración de Agentes](#configuración-de-agentes)
6. [Herramientas y Conectores](#herramientas-y-conectores)
7. [Solución de Problemas](#solución-de-problemas)
8. [Recursos Adicionales](#recursos-adicionales)

## Requisitos Previos

- Node.js instalado (versión 16 o superior)
- Una cuenta en OpenAI y/o Anthropic
- Claves API de los proveedores de modelos de lenguaje
- Git instalado (opcional, para control de versiones)

## Instalación

1. Instalar las dependencias de LangChain:
```bash
npm install langchain @langchain/openai @langchain/anthropic
```

2. Instalar dependencias adicionales:
```bash
npm install dotenv zod
```

## Configuración de API Keys

1. Crear un archivo `.env` en la raíz del proyecto:
```env
OPENAI_API_KEY=sk-tu-clave-api-de-openai
ANTHROPIC_API_KEY=sk-tu-clave-api-de-anthropic
```

2. Modificar el archivo `src/components/workflow/wizard/steps/APIKeyStep.tsx`:
```typescript
const validateKey = async (provider: "openai" | "anthropic", key: string) => {
  try {
    if (provider === "openai") {
      const openai = new OpenAI({ apiKey: key });
      await openai.chat.completions.create({
        messages: [{ role: "user", content: "test" }],
        model: "gpt-3.5-turbo",
      });
    } else {
      const anthropic = new Anthropic({ apiKey: key });
      await anthropic.messages.create({
        messages: [{ role: "user", content: "test" }],
        model: "claude-3-sonnet",
      });
    }
    return "success";
  } catch (error) {
    return "error";
  }
};
```

## Integración con LangChain

1. Crear un archivo `src/lib/agents/baseAgent.ts`:
```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";

export async function createAgent(config) {
  const model = new ChatOpenAI({
    modelName: config.model,
    temperature: config.temperature,
  });

  const tools = config.tools;
  const prompt = await pull("hwchase17/react");

  const agent = await createReactAgent({
    llm: model,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  return agentExecutor;
}
```

## Configuración de Agentes

1. Modificar `src/components/workflow/wizard/steps/AgentConfigStep.tsx` para integrar con LangChain:
```typescript
const createAgentInstance = async (config: AgentConfig) => {
  const agent = await createAgent({
    model: config.model,
    temperature: config.temperature,
    tools: [], // Se añadirán en el paso de herramientas
  });
  return agent;
};
```

## Herramientas y Conectores

1. Crear archivo `src/lib/tools/index.ts`:
```typescript
import { WebBrowser } from "langchain/tools/webbrowser";
import { Calculator } from "langchain/tools/calculator";
import { DynamicTool } from "langchain/tools";

export const getTools = (enabledTools) => {
  const tools = [];

  if (enabledTools.includes("web-search")) {
    tools.push(new WebBrowser());
  }

  if (enabledTools.includes("calculator")) {
    tools.push(new Calculator());
  }

  // Añadir más herramientas según necesidad

  return tools;
};
```

2. Modificar `src/components/workflow/wizard/steps/ToolsStep.tsx` para integrar las herramientas:
```typescript
const applyTools = async (tools: Tool[]) => {
  const enabledTools = tools
    .filter((tool) => tool.enabled)
    .map((tool) => tool.id);
  
  return getTools(enabledTools);
};
```

## Solución de Problemas

### Problemas Comunes

1. **Error de API Key**
   - Verificar que las claves API están correctamente configuradas en el archivo .env
   - Comprobar que las claves tienen permisos suficientes

2. **Error de Conexión**
   - Verificar la conexión a internet
   - Comprobar si hay problemas con los servicios de OpenAI o Anthropic

3. **Errores de Herramientas**
   - Asegurarse de que todas las dependencias están instaladas
   - Verificar la configuración específica de cada herramienta

## Recursos Adicionales

- [Documentación oficial de LangChain](https://js.langchain.com/docs)
- [Guía de OpenAI](https://platform.openai.com/docs/introduction)
- [Documentación de Anthropic](https://docs.anthropic.com)
- [Ejemplos de LangChain](https://js.langchain.com/docs/examples)

## Mejores Prácticas

1. **Seguridad**
   - Nunca compartir o exponer las claves API
   - Usar variables de entorno para las claves
   - Implementar rate limiting para evitar costos excesivos

2. **Rendimiento**
   - Cachear resultados cuando sea posible
   - Usar el modelo más apropiado para cada tarea
   - Optimizar los prompts para reducir tokens

3. **Mantenimiento**
   - Mantener las dependencias actualizadas
   - Documentar cambios y configuraciones
   - Hacer copias de seguridad regulares

## Próximos Pasos

1. Explorar funcionalidades avanzadas:
   - Implementar memoria para los agentes
   - Añadir más herramientas personalizadas
   - Crear flujos de trabajo más complejos

2. Optimizar el rendimiento:
   - Implementar caché
   - Mejorar la gestión de errores
   - Añadir logging y monitorización

3. Mejorar la experiencia de usuario:
   - Añadir más plantillas predefinidas
   - Implementar sistema de guardado/carga de configuraciones
   - Crear documentación específica para tu caso de uso

¡Feliz desarrollo! Si tienes dudas adicionales, no dudes en consultar la documentación o buscar ayuda en la comunidad.
