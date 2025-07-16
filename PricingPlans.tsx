import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star } from 'lucide-react';

const PricingPlans: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small accounting firms',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Up to 100 invoices/month',
        'Basic AI insights',
        'Email automation',
        'Standard support',
        'Basic reporting',
        '2 team members'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for growing practices',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Up to 500 invoices/month',
        'Advanced AI advisor',
        'Full email automation',
        'Priority support',
        'Advanced reporting',
        '10 team members',
        'Bank connections',
        'Tax filing assistance'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For large accounting firms',
      icon: Crown,
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Unlimited invoices',
        'Full AI suite',
        'Complete automation',
        'Dedicated support',
        'Custom reporting',
        'Unlimited team members',
        'All integrations',
        'White-label branding',
        'API access'
      ],
      popular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          SamBizAi Pricing Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your accounting practice. All plans include full white-label customization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-2 border-purple-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">SamBizAi Enterprise Solutions</h3>
            <p className="text-gray-600 mb-4">
              Need a custom SamBizAi solution? We offer tailored packages with dedicated support for large enterprises.
            </p>
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPlans;