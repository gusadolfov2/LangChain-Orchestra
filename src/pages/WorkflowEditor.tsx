import { ReactFlowProvider } from "reactflow";
import WorkflowDashboard from "@/components/workflow/WorkflowDashboard";
import ComponentLibrary from "@/components/workflow/ComponentLibrary";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function WorkflowEditor() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <ReactFlowProvider>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <ComponentLibrary />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={80}>
            <WorkflowDashboard />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ReactFlowProvider>
    </div>
  );
}
