
import { Route } from '../../types';
import { generateRoute } from '../../utils/routeGenerator';

export const routes: Route[] = [
  // Generate a sea route via Panama Canal
  generateRoute({
    origin: 'Shanghai',
    destination: 'Chicago',
    viaPoints: ['Panama Canal', 'Los Angeles'],
    transportMode: 'sea'
  }),
  
  // Generate a direct air route
  generateRoute({
    origin: 'Shanghai',
    destination: 'Chicago',
    viaPoints: ['Los Angeles'],
    transportMode: 'air'
  }),
  
  // Generate a multimodal route
  generateRoute({
    origin: 'Guangzhou',
    destination: 'Rotterdam',
    viaPoints: ['Singapore'],
    transportMode: 'multimodal'
  }),
  
  // Generate a sea route via Singapore
  generateRoute({
    origin: 'Vietnam',
    destination: 'Los Angeles',
    viaPoints: ['Singapore'],
    transportMode: 'sea'
  }),
  
  // Generate a rail route through Mexico
  generateRoute({
    origin: 'China',
    destination: 'US',
    viaPoints: ['Mexico'],
    transportMode: 'rail'
  })
];
