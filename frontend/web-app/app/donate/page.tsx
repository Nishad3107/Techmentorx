'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function DonatePage() {
  const [selectedType, setSelectedType] = useState<'one-time' | 'recurring'>('one-time');

  const donationTypes = [
    {
      id: 'money',
      name: 'Money',
      icon: '💵',
      description: 'Make a monetary donation via card, PayPal, or crypto',
    },
    {
      id: 'food',
      name: 'Food',
      icon: '🍲',
      description: 'Donate food items, grains, or prepared meals',
    },
    {
      id: 'clothing',
      name: 'Clothing',
      icon: '👕',
      description: 'Donate clothes, blankets, shoes, and accessories',
    },
    {
      id: 'medicine',
      name: 'Medicine',
      icon: '💊',
      description: 'Donate medicines and medical supplies',
    },
  ];

  const beneficiaryTypes = [
    { id: 'orphanage', name: 'Orphanages', icon: '👶' },
    { id: 'elderly_home', name: 'Elderly Homes', icon: '👴' },
    { id: 'homeless_shelter', name: 'Homeless Shelters', icon: '🏠' },
    { id: 'disaster_relief', name: 'Disaster Relief', icon: '🆘' },
    { id: 'school', name: 'Schools', icon: '🏫' },
    { id: 'hospital', name: 'Hospitals', icon: '🏥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Donation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your contribution makes a real difference. Choose how you'd like to help.
          </p>
        </div>

        {/* Donation Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm inline-flex">
            <button
              onClick={() => setSelectedType('one-time')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedType === 'one-time'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              One-Time Donation
            </button>
            <button
              onClick={() => setSelectedType('recurring')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedType === 'recurring'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recurring Donation
            </button>
          </div>
        </div>

        {/* Donation Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Would You Like to Donate?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTypes.map((type) => (
              <Card key={type.id} hover className="cursor-pointer">
                <div className="text-center">
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  <Link href={`/donate/${type.id}`}>
                    <Button variant="primary" size="sm" className="w-full">
                      Donate {type.name}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Beneficiary Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Who Would You Like to Help?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {beneficiaryTypes.map((beneficiary) => (
              <div
                key={beneficiary.id}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-500"
              >
                <div className="text-4xl mb-2">{beneficiary.icon}</div>
                <p className="font-medium text-gray-900 text-sm">{beneficiary.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured NGOs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Featured NGOs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} hover>
                <CardHeader>
                  <CardTitle>Hope Foundation #{i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Supporting underprivileged communities with food, education, and healthcare.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Verified ✓</span>
                    <span className="text-sm font-medium text-primary-600">
                      500+ donations
                    </span>
                  </div>
                  <Link href={`/ngo/${i}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Not sure where to start? Need help?
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button variant="secondary">Create Account</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
