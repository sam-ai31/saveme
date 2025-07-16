import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users, DollarSign, FileText, Search } from 'lucide-react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import PayrollProcessor from './PayrollProcessor';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive';
}

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  grossPay: number;
  taxes: number;
  netPay: number;
  processedDate: string;
}

const PayrollSystem: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Senior Accountant',
      department: 'accounting',
      salary: 75000,
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      position: 'HR Manager',
      department: 'hr',
      salary: 85000,
      status: 'active'
    }
  ]);

  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [processingPayroll, setProcessingPayroll] = useState<Employee | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    setEditingEmployee(undefined);
    setShowEmployeeForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowEmployeeForm(true);
  };

  const handleSaveEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => 
        emp.id === editingEmployee.id ? { ...employeeData, id: editingEmployee.id } : emp
      ));
    } else {
      const newEmployee = { ...employeeData, id: Date.now().toString() };
      setEmployees(prev => [...prev, newEmployee]);
    }
    setShowEmployeeForm(false);
    setEditingEmployee(undefined);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleProcessPayroll = (employee: Employee) => {
    setProcessingPayroll(employee);
  };

  const handlePayrollProcessed = (payrollData: any) => {
    const newRecord: PayrollRecord = {
      id: Date.now().toString(),
      ...payrollData
    };
    setPayrollRecords(prev => [...prev, newRecord]);
    setProcessingPayroll(undefined);
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netPay, 0);

  if (showEmployeeForm) {
    return (
      <EmployeeForm
        employee={editingEmployee}
        onSave={handleSaveEmployee}
        onCancel={() => {
          setShowEmployeeForm(false);
          setEditingEmployee(undefined);
        }}
      />
    );
  }

  if (processingPayroll) {
    return (
      <PayrollProcessor
        employee={processingPayroll}
        onClose={() => setProcessingPayroll(undefined)}
        onProcess={handlePayrollProcessed}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Payroll System
          </h1>
          <p className="text-gray-600 mt-1">Manage employees and process payroll</p>
        </div>
        <Button onClick={handleAddEmployee} className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Badge className="h-8 w-8 bg-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold">{activeEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold">${totalPayroll.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            onPayroll={handleProcessPayroll}
          />
        </TabsContent>
        
        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payroll Records</CardTitle>
            </CardHeader>
            <CardContent>
              {payrollRecords.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No payroll records yet</p>
              ) : (
                <div className="space-y-4">
                  {payrollRecords.map((record) => (
                    <div key={record.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{record.employeeName}</p>
                        <p className="text-sm text-gray-600">{new Date(record.processedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${record.netPay.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Net Pay</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollSystem;