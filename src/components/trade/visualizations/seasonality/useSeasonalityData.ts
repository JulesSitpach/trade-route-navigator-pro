
import { useState, useEffect } from 'react';
import { SeasonalityDataPoint } from '../../regulations/types';

export const useSeasonalityData = () => {
  const [seasonalityData, setSeasonalityData] = useState<SeasonalityDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we're using sample data
    const fetchData = () => {
      try {
        setLoading(true);
        
        // Sample data representing shipping trends throughout the year
        const data: SeasonalityDataPoint[] = [
          { month: 'Jan', freight: 95, congestion: 40, risk: 35 },
          { month: 'Feb', freight: 90, congestion: 35, risk: 30 },
          { month: 'Mar', freight: 85, congestion: 30, risk: 25 },
          { month: 'Apr', freight: 80, congestion: 25, risk: 20 },
          { month: 'May', freight: 85, congestion: 30, risk: 25 },
          { month: 'Jun', freight: 90, congestion: 35, risk: 30 },
          { month: 'Jul', freight: 100, congestion: 40, risk: 35 },
          { month: 'Aug', freight: 110, congestion: 45, risk: 40 },
          { month: 'Sep', freight: 120, congestion: 50, risk: 45 },
          { month: 'Oct', freight: 130, congestion: 60, risk: 50 },
          { month: 'Nov', freight: 140, congestion: 70, risk: 60 },
          { month: 'Dec', freight: 150, congestion: 80, risk: 70 },
        ];
        
        setSeasonalityData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load seasonality data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { seasonalityData, loading, error };
};
