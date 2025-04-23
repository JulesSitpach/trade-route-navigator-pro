
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PermitInfo } from "./types";

interface PermitGuidanceProps {
  permits: PermitInfo[];
}

export const PermitGuidance = ({ permits }: PermitGuidanceProps) => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold mb-4">Permit Application Guidance</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Permit Type</TableHead>
          <TableHead>Processing Time</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Required Documentation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permits.map((permit, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{permit.permit}</TableCell>
            <TableCell>{permit.processingTime}</TableCell>
            <TableCell>{permit.fee}</TableCell>
            <TableCell>{permit.documentation.join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="mt-4">
      <p className="text-blue-700 font-medium">Official Application Portal:</p>
      <a href="#" className="text-blue-600 hover:underline">https://trade.gov/import-permits</a>
    </div>
  </Card>
);
