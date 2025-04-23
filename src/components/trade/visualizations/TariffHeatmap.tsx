
import { Card, CardContent } from "@/components/ui/card";
import TariffScatterChart from "./tariff/TariffScatterChart";
import TariffLegend from "./tariff/TariffLegend";
import TariffInsights from "./tariff/TariffInsights";
import { useTariffData } from "./tariff/useTariffData";

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tariff Heatmap Analysis</h3>
      <p className="text-sm text-muted-foreground">
        Visualize tariff rates across different countries and identify opportunities for tariff optimization
      </p>
      
      <Card>
        <CardContent className="p-6">
          <TariffScatterChart data={tariffData} getTariffColor={getTariffColor} />
        </CardContent>
      </Card>

      <TariffLegend />
      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
