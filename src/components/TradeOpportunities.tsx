
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TradeOpportunity {
  title: string;
  savings: string;
  tags: string[];
  description: string;
  currentRoute: string;
  alternativeRoute: string;
  type: 'savings' | 'market';
}

interface TradeOpportunitiesProps {
  opportunities: TradeOpportunity[];
}

const TradeOpportunities = ({ opportunities }: TradeOpportunitiesProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Alternative Trade Opportunities</h2>
      <p className="text-gray-600">
        We've identified potential alternatives that could reduce your costs or improve your supply chain.
      </p>
      
      <div className="space-y-4">
        {opportunities.map((opportunity, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                <div className="text-right">
                  {opportunity.type === 'savings' ? (
                    <p className="text-green-600 font-semibold">
                      Potential Savings: {opportunity.savings}
                    </p>
                  ) : (
                    <p className="text-blue-600 font-semibold">
                      Market Expansion Opportunity
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {opportunity.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className={
                      tag.toLowerCase().includes('risk') ? 'bg-green-100 text-green-800' :
                      tag.toLowerCase().includes('usmca') ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <p className="text-gray-600">{opportunity.description}</p>
              
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Current Route:</span> {opportunity.currentRoute}
                </p>
                <p>
                  <span className="font-medium">Alternative Route:</span> {opportunity.alternativeRoute}
                </p>
              </div>
              
              <div>
                <Button variant="default" className="bg-gray-800 hover:bg-gray-700">
                  {opportunity.type === 'savings' ? 'Calculate Details' : 'Explore Market'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TradeOpportunities;
