import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, DollarSign, FileText, X } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive';
}

interface PayrollProcessorProps {
  employee: Employee;
  onClose: () => void;
  onProcess: (payrollData: any) => void;
}

const PayrollProcessor: React.FC<PayrollProcessorProps> = ({ employee, onClose, onProcess }) => {
  const [payrollData, setPayrollData] = useState({
    hoursWorked: 40,
    overtimeHours: 0,
    bonuses: 0,
    deductions: 0,
    payPeriod: 'bi-weekly'
  });

  const calculateGrossPay = () => {
    const hourlyRate = employee.salary / 2080; // Assuming 2080 work hours per year
    const regularPay = payrollData.hoursWorked * hourlyRate;
    const overtimePay = payrollData.overtimeHours * hourlyRate * 1.5;
    return regularPay + overtimePay + payrollData.bonuses;
  };

  const calculateTaxes = (grossPay: number) => {
    const federalTax = grossPay * 0.22; // Simplified federal tax
    const stateTax = grossPay * 0.05; // Simplified state tax
    const socialSecurity = grossPay * 0.062;
    const medicare = grossPay * 0.0145;
    return federalTax + stateTax + socialSecurity + medicare;
  };

  const grossPay = calculateGrossPay();
  const taxes = calculateTaxes(grossPay);
  const netPay = grossPay - taxes - payrollData.deductions;

  const handleProcess = () => {
    const processedPayroll = {
      employeeId: employee.id,
      employeeName: employee.name,
      payPeriod: payrollData.payPeriod,
      hoursWorked: payrollData.hoursWorked,
      overtimeHours: payrollData.overtimeHours,
      bonuses: payrollData.bonuses,
      deductions: payrollData.deductions,
      grossPay,
      taxes,
      netPay,
      processedDate: new Date().toISOString()
    };
    onProcess(processedPayroll);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Process Payroll - {employee.name}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payroll Details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="hours">Regular Hours Worked</Label>
                <Input
                  id="hours"
                  type="number"
                  value={payrollData.hoursWorked}
                  onChange={(e) => setPayrollData(prev => ({ ...prev, hoursWorked: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="overtime">Overtime Hours</Label>
                <Input
                  id="overtime"
                  type="number"
                  value={payrollData.overtimeHours}
                  onChange={(e) => setPayrollData(prev => ({ ...prev, overtimeHours: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="bonuses">Bonuses ($)</Label>
                <Input
                  id="bonuses"
                  type="number"
                  value={payrollData.bonuses}
                  onChange={(e) => setPayrollData(prev => ({ ...prev, bonuses: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="deductions">Additional Deductions ($)</Label>
                <Input
                  id="deductions"
                  type="number"
                  value={payrollData.deductions}
                  onChange={(e) => setPayrollData(prev => ({ ...prev, deductions: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>

          {/* Calculation Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payroll Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span>Employee:</span>
                <span className="font-medium">{employee.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Position:</span>
                <span>{employee.position}</span>
              </div>
              <div className="flex justify-between">
                <span>Department:</span>
                <span>{employee.department}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Gross Pay:</span>
                <span className="font-medium">${grossPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Total Taxes:</span>
                <span>-${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Deductions:</span>
                <span>-${payrollData.deductions.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-green-600">
                <span>Net Pay:</span>
                <span>${netPay.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleProcess} className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Process Payroll
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollProcessor;