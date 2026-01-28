"use client";

import { Apartment } from "@/lib/apartments";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Phone, ExternalLink, Home, Bath, Ruler, Star, 
  Play, Layout, ThumbsUp, ThumbsDown, Sparkles
} from "lucide-react";

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const formatPrice = (price: number) => `$${price.toLocaleString()}`;

  return (
    <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-950/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
              apartment.rank <= 3 
                ? 'bg-gradient-to-br from-amber-500 to-orange-600' 
                : 'bg-gradient-to-br from-neutral-700 to-neutral-800'
            }`}>
              #{apartment.rank}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-100">{apartment.name}</h3>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                <span>{apartment.neighborhood}, {apartment.city}</span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {apartment.rating}
                </span>
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg font-semibold text-lg ${
            apartment.price.overBudget 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            {formatPrice(apartment.price.min)} - {formatPrice(apartment.price.max)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 text-sm text-neutral-300">
          <span className="flex items-center gap-1.5">
            <Home className="h-4 w-4 text-neutral-500" /> {apartment.beds} Bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-neutral-500" /> {apartment.baths} Bath
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-neutral-500" /> {apartment.sqft} sqft
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-neutral-500" /> {apartment.phone}
          </span>
        </div>

        {/* Move-in Special */}
        {apartment.moveInSpecial && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">{apartment.moveInSpecial}</span>
          </div>
        )}

        {/* Highlights */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium">Highlights</h4>
          <div className="flex flex-wrap gap-1.5">
            {apartment.highlights.map((highlight, i) => (
              <Badge key={i} variant="secondary" className="bg-neutral-800/50 text-neutral-300 border-neutral-700/50 text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium">Amenities</h4>
          <div className="flex flex-wrap gap-1.5">
            {apartment.amenities.slice(0, 6).map((amenity, i) => (
              <Badge key={i} variant="outline" className="border-neutral-700 text-neutral-400 text-xs">
                {amenity}
              </Badge>
            ))}
            {apartment.amenities.length > 6 && (
              <Badge variant="outline" className="border-neutral-700 text-neutral-500 text-xs">
                +{apartment.amenities.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" /> Pros
            </h4>
            <ul className="space-y-1">
              {apartment.pros.slice(0, 3).map((pro, i) => (
                <li key={i} className="text-xs text-emerald-400 flex items-start gap-1.5">
                  <span className="mt-1">•</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium flex items-center gap-1">
              <ThumbsDown className="h-3 w-3" /> Cons
            </h4>
            <ul className="space-y-1">
              {apartment.cons.slice(0, 3).map((con, i) => (
                <li key={i} className="text-xs text-amber-400 flex items-start gap-1.5">
                  <span className="mt-1">•</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-neutral-800 flex flex-wrap gap-2">
        <Button asChild className="bg-neutral-100 text-neutral-900 hover:bg-white">
          <a href={apartment.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1.5" /> Website
          </a>
        </Button>
        
        {apartment.floorPlanUrl && (
          <Button asChild variant="outline" className="border-neutral-700 hover:bg-neutral-800">
            <a href={apartment.floorPlanUrl} target="_blank" rel="noopener noreferrer">
              <Layout className="h-4 w-4 mr-1.5" /> Floor Plans
            </a>
          </Button>
        )}
        
        {apartment.tourUrl && (
          <Button asChild variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950">
            <a href={apartment.tourUrl} target="_blank" rel="noopener noreferrer">
              <Play className="h-4 w-4 mr-1.5" /> Virtual Tour
            </a>
          </Button>
        )}
        
        <Button asChild variant="ghost" className="text-neutral-400 hover:text-neutral-100">
          <a href={`tel:${apartment.phone.replace(/[^0-9]/g, '')}`}>
            <Phone className="h-4 w-4 mr-1.5" /> Call
          </a>
        </Button>
        
        <Button asChild variant="ghost" className="text-neutral-400 hover:text-neutral-100">
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(apartment.address)}`} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4 mr-1.5" /> Map
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
