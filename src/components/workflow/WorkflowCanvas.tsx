import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Panel,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Plus, Save, Play } from "lucide-react";
import AgentNode from "./AgentNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "agentNode",
    position: { x: 250, y: 100 },
    data: { label: "Research Agent", type: "agent", role: "Researcher" },
  },
  {
    id: "2",
    type: "agentNode",
    position: { x: 500, y: 200 },
    data: { label: "Analysis Agent", type: "agent", role: "Analyst" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
];

export default function WorkflowCanvas() {
  // Define node types
  const nodeTypes: NodeTypes = {
    agentNode: AgentNode,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNewAgent = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "agentNode",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: { label: "New Agent", type: "agent", role: "Assistant" },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  const saveWorkflow = useCallback(() => {
    console.log("Saving workflow:", { nodes, edges });
    // Here you would implement the actual save functionality
  }, [nodes, edges]);

  const deployWorkflow = useCallback(() => {
    console.log("Deploying workflow:", { nodes, edges });
    // Here you would implement the actual deployment functionality
  }, [nodes, edges]);

  return (
    <div className="w-full h-full bg-background border rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right" className="flex gap-2">
          <Button onClick={addNewAgent} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Agent
          </Button>
          <Button onClick={saveWorkflow} size="sm" variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button onClick={deployWorkflow} size="sm" variant="default">
            <Play className="mr-2 h-4 w-4" /> Deploy
          </Button>
        </Panel>
      </ReactFlow>
      {selectedNode && (
        <div className="absolute right-0 top-0 h-full w-80 bg-card border-l p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Agent Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={selectedNode.data.label}
                onChange={(e) => {
                  // Update node label
                  setNodes(
                    nodes.map((n) =>
                      n.id === selectedNode.id
                        ? { ...n, data: { ...n.data, label: e.target.value } }
                        : n,
                    ),
                  );
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={selectedNode.data.role}
                onChange={(e) => {
                  // Update node role
                  setNodes(
                    nodes.map((n) =>
                      n.id === selectedNode.id
                        ? { ...n, data: { ...n.data, role: e.target.value } }
                        : n,
                    ),
                  );
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Model</label>
              <select className="w-full p-2 border rounded mt-1">
                <option>gpt-4o</option>
                <option>gpt-4</option>
                <option>gpt-3.5-turbo</option>
                <option>claude-3-opus</option>
                <option>claude-3-sonnet</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Temperature</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                className="w-full mt-1"
                defaultValue="0.7"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tools</label>
              <div className="mt-1 space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="tool-web" className="mr-2" />
                  <label htmlFor="tool-web">Web Search</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="tool-calc" className="mr-2" />
                  <label htmlFor="tool-calc">Calculator</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="tool-code" className="mr-2" />
                  <label htmlFor="tool-code">Code Interpreter</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
