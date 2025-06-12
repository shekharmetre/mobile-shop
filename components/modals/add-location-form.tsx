import React, { useState } from 'react';
import { X, MapPin, Phone, Home, Building, Navigation } from 'lucide-react';
import { FormLocationData, LocationData } from '@/lib/types';

interface ManualAddressFormProps {
  onClose: () => void;
  onAddressSaved?: (address?: FormLocationData) => void;
  initialAddress?: LocationData;
}

export default function ManualAddressForm({ onClose, onAddressSaved, initialAddress }: ManualAddressFormProps) {
  const [formData, setFormData] = useState({
    receiverName: '',
    receiverPhone: '',
    addressType: 'Home',
    area: initialAddress?.address,
    completeAddress: '',
    sector: '',
    landmark: '',
    pincode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addressTypes = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Work', label: 'Work', icon: Building },
    { id: 'Other', label: 'Other', icon: MapPin }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.receiverName.trim()) {
      newErrors.receiverName = 'Receiver name is required';
    }

    if (!formData.receiverPhone.trim()) {
      newErrors.receiverPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.receiverPhone.replace(/\s/g, ''))) {
      newErrors.receiverPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.completeAddress.trim()) {
      newErrors.completeAddress = 'Complete address is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const fullAddress = `${formData.completeAddress}, ${formData.area}, ${formData.sector}, ${formData.pincode}`;
      
      const addressData = {
        address: fullAddress,
        receiverName: formData.receiverName,
        receiverPhone: formData.receiverPhone,
        addressType: formData.addressType,
        area: formData.area,
        completeAddress: formData.completeAddress,
        sector: formData.sector,
        landmark: formData.landmark,
        pincode: formData.pincode,
        lat: 0, // Would be geocoded in real implementation
        lon: 0,
        type: 'manual' as const,
        label: formData.addressType,
        id: Date.now().toString()
      };

      onAddressSaved?.(addressData);
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
       
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Enter complete address</h2>
            <button
              onClick={onClose}
              className="p-2 right-0 absolute text-gray-400 cursor-pointer transition-colors hover:scale-110"
            >
              <X  className="w-20 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Receiver Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Receiver details for this address</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Receiver Name"
                      value={formData.receiverName}
                      onChange={(e) => handleInputChange('receiverName', e.target.value)}
                      className="border-none outline-none bg-transparent placeholder-gray-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.receiverPhone}
                      onChange={(e) => handleInputChange('receiverPhone', e.target.value)}
                      className="border-none outline-none bg-transparent placeholder-gray-500"
                    />
                  </div>
                </div>
                {(errors.receiverName || errors.receiverPhone) && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverName || errors.receiverPhone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Save address as <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-3">
              {addressTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleInputChange('addressType', type.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 border-2 rounded-lg transition-all ${
                      formData.addressType === type.id
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area/Location */}
          <div>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{formData.area || 'Area not specified'}</p>
                  <p className="text-sm text-gray-500 mt-1">Updated based on your exact map pin</p>
                </div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-600 font-medium text-sm"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Complete Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complete address <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="House/Flat/Block No., Building Name, Road Name, Area"
              value={formData.completeAddress}
              onChange={(e) => handleInputChange('completeAddress', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.completeAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.completeAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.completeAddress}</p>
            )}
          </div>

          {/* Sector/Colony */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector/Colony
            </label>
            <input
              type="text"
              placeholder="Sector/Colony (Optional)"
              value={formData.sector}
              onChange={(e) => handleInputChange('sector', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nearby Landmark
            </label>
            <input
              type="text"
              placeholder="Nearby Landmark (Optional)"
              value={formData.landmark}
              onChange={(e) => handleInputChange('landmark', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="6-digit pincode"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              maxLength={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.pincode ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              Confirm address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}