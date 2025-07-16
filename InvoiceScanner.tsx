import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Calendar,
  Building
} from 'lucide-react';

const InvoiceScanner: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [scannedInvoices] = useState([
    {
      id: 1,
      vendor: 'Office Supplies Co.',
      amount: '$1,234.56',
      date: '2024-01-15',
      status: 'processed',
      confidence: 98
    },
    {
      id: 2,
      vendor: 'Tech Solutions Inc.',
      amount: '$2,890.00',
      date: '2024-01-14',
      status: 'processing',
      confidence: 95
    },
    {
      id: 3,
      vendor: 'Marketing Agency',
      amount: '$5,670.25',
      date: '2024-01-13',
      status: 'processed',
      confidence: 99
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Invoice Scanner
        </h2>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
          Bulk Upload
        </Button>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop invoices here or click to upload</h3>
            <p className="text-gray-600 mb-4">Supports PDF, JPG, PNG files up to 10MB</p>
            <Input type="file" className="hidden" id="file-upload" multiple accept=".pdf,.jpg,.jpeg,.png" />
            <Button onClick={() => document.getElementById('file-upload')?.click()}>
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scanned Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scannedInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{invoice.vendor}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{invoice.amount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{invoice.date}</span>
                      </div>
                      <span>Confidence: {invoice.confidence}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={invoice.status === 'processed' ? 'default' : 'secondary'}>
                    {invoice.status === 'processed' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {invoice.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceScanner;