'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function VolunteerPage() {
  const opportunities = [
    {
      id: 1,
      title: 'Teaching Assistant',
      ngo: 'Education First NGO',
      location: 'San Francisco, CA',
      type: 'Education',
      beneficiary: 'School',
      hours: '6 hours/week',
      spots: '5 positions available',
      description: 'Help elementary students with homework and reading after school.',
      skills: ['Teaching', 'Patience', 'Communication'],
      urgent: false,
    },
    {
      id: 2,
      title: 'Food Distribution Volunteer',
      ngo: 'Community Kitchen',
      location: 'Los Angeles, CA',
      type: 'Food Service',
      beneficiary: 'Homeless Shelter',
      hours: '4 hours/week',
      spots: '10 positions available',
      description: 'Help prepare and distribute meals to homeless individuals.',
      skills: ['Food Handling', 'Teamwork'],
      urgent: true,
    },
    {
      id: 3,
      title: 'Elderly Care Companion',
      ngo: 'Senior Friends',
      location: 'Seattle, WA',
      type: 'Healthcare',
      beneficiary: 'Elderly Home',
      hours: '3 hours/week',
      spots: '3 positions available',
      description: 'Spend time with elderly residents, play games, and provide companionship.',
      skills: ['Patience', 'Listening', 'Empathy'],
      urgent: false,
    },
    {
      id: 4,
      title: 'Virtual Tutoring',
      ngo: 'Global Education Network',
      location: 'Remote',
      type: 'Education',
      beneficiary: 'School',
      hours: 'Flexible',
      spots: '20 positions available',
      description: 'Provide online tutoring to students in underserved communities.',
      skills: ['Teaching', 'Technology', 'Subject Expertise'],
      urgent: false,
    },
  ];

  const categories = [
    { name: 'Education', icon: '📚', count: 45 },
    { name: 'Healthcare', icon: '🏥', count: 32 },
    { name: 'Food Service', icon: '🍲', count: 28 },
    { name: 'Construction', icon: '🔨', count: 15 },
    { name: 'Administration', icon: '📋', count: 20 },
    { name: 'Events', icon: '🎉', count: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Volunteer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Give your time and skills to make a real difference in your community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Opportunities', value: '152' },
            { label: 'Volunteers Needed', value: '500+' },
            { label: 'NGOs Recruiting', value: '80+' },
            { label: 'Hours This Month', value: '12,000' },
          ].map((stat, index) => (
            <Card key={index}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 mb-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 text-primary-100">
            Register as a volunteer and start making an impact today!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                Register as Volunteer
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Login to Apply
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-500"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-medium text-gray-900 text-sm">{category.name}</p>
                <p className="text-xs text-gray-500 mt-1">{category.count} opportunities</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Opportunities */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Opportunities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} hover>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{opportunity.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{opportunity.ngo}</p>
                    </div>
                    {opportunity.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Urgent
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{opportunity.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">⏰</span>
                      {opportunity.hours}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">👥</span>
                      {opportunity.spots}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">🎯</span>
                      {opportunity.beneficiary}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {opportunity.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/volunteer/opportunity/${opportunity.id}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href="/login" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Volunteer With Us?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: '✅',
                title: 'Verified Opportunities',
                description: 'All NGOs and opportunities are verified for authenticity',
              },
              {
                icon: '📜',
                title: 'Get Certificates',
                description: 'Earn certificates for your volunteer work',
              },
              {
                icon: '⭐',
                title: 'Track Your Impact',
                description: 'See your hours and impact over time',
              },
              {
                icon: '🏆',
                title: 'Earn Badges',
                description: 'Unlock achievements as you volunteer more',
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
