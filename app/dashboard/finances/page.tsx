"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeDollarSign, Download, Plus } from "lucide-react"

export default function FinancesManagementPage() {
  const transactions = [
    { id: 1, type: "Donation", amount: "+$500.00", source: "John Smith", date: "Oct 12, 2025" },
    { id: 2, type: "Expense", amount: "-$120.00", source: "Web Hosting", date: "Oct 10, 2025" },
    { id: 3, type: "Donation", amount: "+$1,000.00", source: "Corporate Sponsor", date: "Oct 08, 2025" },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Finance Management</h1>
          <p className="text-gray-600 mt-1">Track donations, expenses, and overall financial health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
          <Button className="bg-emerald-800 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Record Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">$12,450.00</div>
            <p className="text-xs text-gray-500 mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$4,320.00</div>
            <p className="text-xs text-gray-500 mt-1">Operational costs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$8,130.00</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><BadgeDollarSign className="mr-2 h-5 w-5"/> Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-xl overflow-hidden divide-y">
            {transactions.map((trx) => (
              <div key={trx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">{trx.source}</h4>
                  <span className="text-xs text-gray-500">{trx.type} • {trx.date}</span>
                </div>
                <div className={`font-medium ${trx.amount.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  {trx.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

