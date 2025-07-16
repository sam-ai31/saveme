import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  Send
} from 'lucide-react';

const AIAdvisor: React.FC = () => {
  const [message, setMessage] = useState('');
  const [insights] = useState([
    {
      id: 1,
      type: 'optimization',
      title: 'Expense Reduction Opportunity',
      description: 'You can save $2,340 monthly by switching to digital receipts and automated bookkeeping.',
      priority: 'high',
      savings: '$2,340'
    },
    {
      id: 2,
      type: 'tax',
      title: 'Tax Deduction Alert',
      description: 'Unclaimed business meal deductions worth $1,200 for Q4 2023.',
      priority: 'medium',
      savings: '$1,200'
    },
    {
      id: 3,
      type: 'cashflow',
      title: 'Cash Flow Prediction',
      description: 'Based on current trends, expect 15% revenue increase next quarter.',
      priority: 'low',
      savings: '+15%'
    }
  ]);

  const [chatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I\'m your AI accounting advisor. How can I help you optimize your finances today?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      message: 'What are my biggest expense categories this month?',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      type: 'ai',
      message: 'Your top expense categories are: 1) Office supplies (32%), 2) Marketing (28%), 3) Software subscriptions (18%). I recommend reviewing your software subscriptions for potential savings.',
      timestamp: '10:33 AM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Financial Advisor
        </h2>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Brain className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge 
                    variant={insight.priority === 'high' ? 'destructive' : 
                            insight.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    Potential Impact: {insight.savings}
                  </span>
                  <Button size="sm" variant="outline">
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-64 overflow-y-auto mb-4">
              {chatHistory.map((chat) => (
                <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{chat.message}</p>
                    <span className="text-xs opacity-70">{chat.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything about your finances..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-4 h-auto flex flex-col items-center space-y-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span>Profit Analysis</span>
            </Button>
            <Button variant="outline" className="p-4 h-auto flex flex-col items-center space-y-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <span>Risk Assessment</span>
            </Button>
            <Button variant="outline" className="p-4 h-auto flex flex-col items-center space-y-2">
              <Brain className="h-6 w-6 text-purple-500" />
              <span>Forecast Model</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAdvisor;