import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Brain, Database, FileText } from "lucide-react";

type AgentNodeData = {
  label: string;
  type: string;
  role: string;
};

const AgentNode = ({ data }: NodeProps<AgentNodeData>) => {
  const getIcon = () => {
    switch (data.role.toLowerCase()) {
      case "researcher":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "analyst":
        return <Brain className="h-5 w-5 text-purple-500" />;
      case "data":
        return <Database className="h-5 w-5 text-green-500" />;
      default:
        return <Brain className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200 min-w-[150px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center">
        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-100">
          {getIcon()}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-gray-500 text-sm">{data.role}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default memo(AgentNode);
