
import { Card } from "@/components/ui/card";
import { RegulatoryUpdate } from "./types";

interface RegulatoryUpdatesProps {
  updates: RegulatoryUpdate[];
}

export const RegulatoryUpdates = ({ updates }: RegulatoryUpdatesProps) => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold mb-4">Regulatory Updates</h3>
    <div className="space-y-4">
      {updates.map((update, index) => (
        <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
          <p className="text-amber-700 font-medium">{update.date}: {update.title}</p>
          <p className="text-gray-700">{update.description}</p>
        </div>
      ))}
    </div>
  </Card>
);
