'use client';

import { Apartment } from '@/types/apartment';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  PawPrint, 
  Car, 
  WashingMachine,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';

interface ApartmentModalProps {
  apartment: Apartment | null;
  open: boolean;
  onClose: () => void;
}

export function ApartmentModal({ apartment, open, onClose }: ApartmentModalProps) {
  if (!apartment) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{apartment.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {apartment.address} • {apartment.neighborhood}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between py-2">
          <span className="text-3xl font-bold">
            {formatPrice(apartment.price)}
            <span className="text-sm text-muted-foreground font-normal">/month</span>
          </span>
          <Badge variant="secondary" className="text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Available {formatDate(apartment.available)}
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-muted/50">
                <CardContent className="p-3 flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {apartment.bedrooms === 0 ? 'Studio' : `${apartment.bedrooms} Bedroom`}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-3 flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{apartment.bathrooms} Bathroom</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-3 flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{apartment.sqft} sqft</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {apartment.petFriendly && (
                <Badge variant="secondary">
                  <PawPrint className="h-3 w-3 mr-1" />
                  Pet Friendly
                </Badge>
              )}
              {apartment.parking && (
                <Badge variant="secondary">
                  <Car className="h-3 w-3 mr-1" />
                  Parking Included
                </Badge>
              )}
              <Badge variant="secondary">
                <WashingMachine className="h-3 w-3 mr-1" />
                Laundry {apartment.laundry === 'in-unit' ? 'In-Unit' : apartment.laundry === 'in-building' ? 'In-Building' : 'None'}
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-medium mb-2">About this place</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {apartment.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {apartment.amenities.map((amenity) => (
                <Card key={amenity} className="bg-muted/50">
                  <CardContent className="p-3">
                    <p className="text-sm">{amenity}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {apartment.amenities.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No additional amenities listed
              </p>
            )}
          </TabsContent>

          <TabsContent value="contact" className="mt-4 space-y-4">
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-medium">Schedule a Tour</h4>
                <p className="text-sm text-muted-foreground">
                  Interested in this apartment? Get in touch to schedule a viewing.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
