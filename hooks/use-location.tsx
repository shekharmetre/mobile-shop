export interface LocationCoordinates {
  lat: number;
  lon: number;
}

export interface LocationData {
  address: string;
  lat: number;
  lon: number;
  type?: 'current' | 'search' | 'saved' | 'manual';
  label?: string;
  id?: string;
  receiverName?: string;
  receiverPhone?: string;
  addressType?: string;
  area?: string;
  completeAddress?: string;
  sector?: string;
  landmark?: string;
  pincode?: string;
}

export const getCurrentLocation = (): Promise<LocationCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        let errorMessage = 'Failed to get location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      options
    );
  });
};

export const getAddressFromCoordinates = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch address from coordinates');
    }

    const result = await response.json();

    if (result && result.display_name) {
      return result.display_name;
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    throw new Error('Failed to get address from coordinates');
  }
};

export const searchLocations = async (query: string, limit: number = 5): Promise<LocationData[]> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=${limit}&countrycodes=in`
    );
    
    if (!response.ok) {
      throw new Error('Search request failed');
    }

    const results = await response.json();
    
    return results.map((result: any) => ({
      address: result.display_name,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      type: 'search' as const
    }));
  } catch (error) {
    throw new Error('Failed to search locations');
  }
};