import React from "react";

interface OwnerDisplayProps {
  name: string;
  label?: string;
}

export const OwnerDisplay: React.FC<OwnerDisplayProps> = ({ name, label }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm text-gray-400">{label}</h2>
      <p className="text-sm">{name}</p>
    </div>
  );
};
