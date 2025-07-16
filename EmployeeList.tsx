import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Trash2, DollarSign } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onPayroll: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete, onPayroll }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={employee.avatar} />
                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{employee.name}</CardTitle>
                <p className="text-sm text-gray-600">{employee.email}</p>
              </div>
              <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                {employee.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">{employee.position}</p>
                <p className="text-sm text-gray-600">{employee.department}</p>
              </div>
              <div className="flex items-center text-sm font-medium text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                ${employee.salary.toLocaleString()}/year
              </div>
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(employee)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => onPayroll(employee)}>
                  <DollarSign className="h-4 w-4 mr-1" />
                  Payroll
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(employee.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmployeeList;