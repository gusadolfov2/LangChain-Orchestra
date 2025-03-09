import { useState, useEffect } from "react";
import SetupWizard from "./wizard/SetupWizard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowCanvas from "./WorkflowCanvas";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Activity, Code } from "lucide-react";

export default function WorkflowDashboard() {
  const [activeTab, setActiveTab] = useState("canvas");
  const [workflowName, setWorkflowName] = useState("Market Analysis Team");
  const [showWizard, setShowWizard] = useState(false);

  // Mostrar el wizard automáticamente en el primer inicio
  useEffect(() => {
    const hasCompletedWizard = localStorage.getItem("hasCompletedWizard");
    if (!hasCompletedWizard) {
      setShowWizard(true);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">LangChain Orchestra</h1>
          <p className="text-muted-foreground">Visual Agent Workflow Editor</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center border rounded-md px-3 py-1">
            <span className="text-sm text-muted-foreground mr-2">
              Workflow:
            </span>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="border-none focus:outline-none bg-transparent"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowWizard(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Asistente
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="canvas"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="canvas">Canvas</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="canvas" className="flex-1 overflow-hidden">
          <WorkflowCanvas />
        </TabsContent>

        <TabsContent value="testing" className="flex-1">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Test Your Agent Workflow</h3>
              <p className="text-muted-foreground mb-4">
                Run your workflow with test inputs and see the results in
                real-time.
              </p>
              <Button>
                <Activity className="h-4 w-4 mr-2" />
                Start Test Run
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="flex-1">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Performance Monitoring</h3>
              <p className="text-muted-foreground mb-4">
                Track usage, response times, and other metrics for your agent
                workflow.
              </p>
              <Button variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                View Metrics
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="flex-1">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Generated Code</h3>
              <p className="text-muted-foreground mb-4">
                View and export the LangChain code generated from your visual
                workflow.
              </p>
              <Button variant="outline">
                <Code className="h-4 w-4 mr-2" />
                Export Code
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <SetupWizard
        isOpen={showWizard}
        onClose={() => {
          setShowWizard(false);
          localStorage.setItem("hasCompletedWizard", "true");
        }}
      />
    </div>
  );
}
