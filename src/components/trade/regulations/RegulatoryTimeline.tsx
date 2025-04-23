
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { RequirementTimelineItem } from "./types";

interface RegulatoryTimelineProps {
  timeline: RequirementTimelineItem[];
}

export const RegulatoryTimeline = ({ timeline }: RegulatoryTimelineProps) => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold mb-4">Regulatory Timeline</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Stage</TableHead>
          <TableHead>Documents</TableHead>
          <TableHead>Deadline</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeline.map((stage, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{stage.stage}</TableCell>
            <TableCell>{stage.documents.join(', ')}</TableCell>
            <TableCell>{stage.deadline}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);
