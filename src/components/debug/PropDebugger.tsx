
import React from 'react';

interface PropDebuggerProps {
  componentProps: Record<string, unknown>;
  title?: string;
}

export const PropDebugger = ({ componentProps, title }: PropDebuggerProps) => (
  <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
    {title && (
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      </div>
    )}
    <pre className="text-xs bg-gray-50 p-4 overflow-auto max-h-96">
      {JSON.stringify(componentProps, null, 2)}
    </pre>
  </div>
);
