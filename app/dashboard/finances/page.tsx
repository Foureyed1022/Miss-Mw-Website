"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BadgeDollarSign, Download, Plus, Eye, RefreshCcw, Loader2 } from "lucide-react"
import { getDonations, getFinanceTransactions, saveFinanceTransaction, updateDonation } from "@/lib/firestore"
import type { Donation, FinanceTransaction } from "@/types"

const currencyLabel = "MK"

export default function FinancesManagementPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [otherTransactions, setOtherTransactions] = useState<FinanceTransaction[]>([])
  const [showRecordForm, setShowRecordForm] = useState(false)
  const [recordSource, setRecordSource] = useState("")
  const [recordAmount, setRecordAmount] = useState("")
  const [recordNote, setRecordNote] = useState("")
  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null)
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [donationData, transactionData] = await Promise.all([
        getDonations(),
        getFinanceTransactions(),
      ])
      setDonations(donationData)
      setOtherTransactions(transactionData)
    } catch (error) {
      console.error("Failed loading finance data", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const transactions = useMemo(() => {
    const donationRows = donations.map((donation) => ({
      id: donation.id,
      type: "Donation" as const,
      amount: donation.amount,
      source: [donation.firstName, donation.lastName].filter(Boolean).join(" ") || "Anonymous",
      note: donation.comments || donation.allocation || "Donation",
      donationId: donation.id,
      createdAt: donation.createdAt,
      transactionId: donation.transactionId || donation.id,
      status: donation.status,
    }))

    const otherRows = otherTransactions.map((transaction) => ({
      ...transaction,
      transactionId: transaction.id,
      status: undefined,
    }))

    return [...donationRows, ...otherRows].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }, [donations, otherTransactions])

  const totalDonations = donations.reduce((sum, donation) => sum + Number(donation.amount || 0), 0)
  const totalOtherFunds = otherTransactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
  const netBalance = totalDonations + totalOtherFunds

  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize))
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return transactions.slice(start, start + pageSize)
  }, [transactions, currentPage])

  const exportCSV = () => {
    const headers = [
      "Type",
      "Source",
      "Amount",
      "Note",
      "Date",
      "Transaction ID",
      "Donation ID",
      "Status",
    ]

    const rows = transactions.map((row) => [
      row.type,
      row.source,
      `${currencyLabel} ${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      row.note || "",
      row.createdAt.toISOString(),
      row.transactionId || "",
      row.donationId || "",
      row.status || "",
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `finance-report-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveOtherTransaction = async () => {
    if (!recordSource.trim() || !recordAmount || Number(recordAmount) <= 0) return

    setIsSaving(true)
    const savedId = await saveFinanceTransaction({
      type: "Other",
      amount: Number(recordAmount),
      source: recordSource.trim(),
      note: recordNote.trim() || "Other funds received",
    })
    setIsSaving(false)

    if (savedId) {
      setOtherTransactions((prev) => [
        {
          id: savedId,
          type: "Other",
          amount: Number(recordAmount),
          source: recordSource.trim(),
          note: recordNote.trim() || "Other funds received",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...prev,
      ])
      setRecordSource("")
      setRecordAmount("")
      setRecordNote("")
      setShowRecordForm(false)
    }
  }

  const selectedDonation = selectedDonationId ? donations.find((donation) => donation.id === selectedDonationId) : null

  const handleSelectDonation = (id: string) => {
    const donation = donations.find((item) => item.id === id)
    if (!donation) return

    setSelectedDonationId(id)
    setSelectedDonationAmount(Number(donation.amount || 0))
  }

  const saveDonationAmount = async () => {
    if (!selectedDonation || selectedDonationAmount < 0) return
    setIsSaving(true)
    const success = await updateDonation(selectedDonation.id, { amount: selectedDonationAmount })
    setIsSaving(false)

    if (success) {
      setDonations((prev) => prev.map((item) => item.id === selectedDonation.id ? { ...item, amount: selectedDonationAmount } : item))
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-purple" />
          <p className="text-gray-500 font-medium">Loading finance data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED] xl md:text-4xl font-bold text-[#212224]">Finance Management</h1>
          <p className="text-gray-600 mt-1">Track donations, other funds, and reconcile confirmed amounts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportCSV}>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button className="bg-[#7C3AED] hover:bg-[#6126B0] text-white" onClick={() => setShowRecordForm((prev) => !prev)}>
            <Plus className="mr-2 h-4 w-4" /> Record Transaction
          </Button>
        </div>
      </div>

      {showRecordForm ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Record Other Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Source</label>
                <Input value={recordSource} onChange={(event) => setRecordSource(event.target.value)} placeholder="e.g. Sponsor name or grant" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Amount ({currencyLabel})</label>
                <Input value={recordAmount} type="number" min="0" onChange={(event) => setRecordAmount(event.target.value)} placeholder="Enter amount" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Note</label>
                <Input value={recordNote} onChange={(event) => setRecordNote(event.target.value)} placeholder="Optional note" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-[#7C3AED] hover:bg-[#6126B0] text-white" onClick={handleSaveOtherTransaction} disabled={isSaving}>
                {isSaving ? "Recording..." : "Save Transaction"}
              </Button>
              <Button variant="secondary" onClick={() => setShowRecordForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">{currencyLabel} {totalDonations.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Confirmed donation amounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Other Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#7C3AED]">{currencyLabel} {totalOtherFunds.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">External received funds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Net Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currencyLabel} {netBalance.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
              <p className="text-sm text-gray-500">Donation records and manually recorded funds.</p>
            </div>
            <Button variant="outline" size="sm" onClick={loadData}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Note</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{transaction.type}</td>
                    <td className="px-4 py-3 text-gray-600">{transaction.source}</td>
                    <td className="px-4 py-3 text-gray-900">{currencyLabel} {Number(transaction.amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(transaction.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-3 text-gray-500">{transaction.note || '-'}</td>
                    <td className="px-4 py-3">
                      {transaction.type === 'Donation' ? (
                        <Button variant="outline" size="sm" className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10" onClick={() => handleSelectDonation(transaction.id)}>
                          <Eye className="mr-2 h-3.5 w-3.5" /> View
                        </Button>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">Manual</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * pageSize + 1, transactions.length)} - {Math.min(currentPage * pageSize, transactions.length)} of {transactions.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="hidden items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 md:flex">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`rounded-sm px-2 py-1 ${currentPage === index + 1 ? 'bg-[#7C3AED] text-white' : 'text-gray-600 hover:bg-slate-100'}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedDonation)} onOpenChange={(open) => { if (!open) setSelectedDonationId(null) }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>Review and update the confirmed amount for this donation.</DialogDescription>
          </DialogHeader>

          {selectedDonation && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Donor</p>
                  <p className="font-medium text-gray-900">{selectedDonation.firstName || 'Anonymous'} {selectedDonation.lastName || ''}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-900">{selectedDonation.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allocation</p>
                  <p className="font-medium text-gray-900">{selectedDonation.allocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium text-gray-900">{selectedDonation.transactionId || selectedDonation.id}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Confirmed Amount ({currencyLabel})</label>
                  <Input
                    type="number"
                    min={0}
                    value={selectedDonationAmount}
                    onChange={(event) => setSelectedDonationAmount(Number(event.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Comments</label>
                  <p className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600 mt-2">{selectedDonation.comments || 'No comments provided.'}</p>
                </div>
              </div>

              <DialogFooter className="flex flex-wrap gap-2">
                <Button
                  className="bg-[#7C3AED] hover:bg-[#6126B0] text-white"
                  onClick={saveDonationAmount}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Update Donation Amount'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedDonationId(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

