'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Download,
  Calendar,
  MapPin,
  ExternalLink,
  Users
} from 'lucide-react';
import { Applicant } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ApplicantsViewProps {
  applicants: Applicant[];
}

export default function ApplicantsView({ applicants }: ApplicantsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const filteredApplicants = applicants.filter(applicant => {
    const fullName = `${applicant.firstName} ${applicant.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || applicant.applicationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#3D3B48]">Pageant Applicants</h1>
          <p className="text-gray-500 mt-1">Review and manage all pageant registration applications.</p>
        </div>
        <Button variant="outline" className="flex gap-2">
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by name, email, or city..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-[#9C8653] font-bold border border-gray-200">
                          {applicant.firstName[0]}{applicant.lastName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{applicant.firstName} {applicant.lastName}</p>
                          <p className="text-gray-500 text-xs">{applicant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {applicant.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{applicant.age}</td>
                    <td className="px-6 py-4">
                      <Badge className={`
                        capitalize font-bold text-[10px] px-2 py-0.5 rounded
                        ${applicant.applicationStatus === 'approved' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                          applicant.applicationStatus === 'rejected' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                          'bg-amber-100 text-amber-700 hover:bg-amber-100'}
                      `}>
                        {applicant.applicationStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(applicant.createdAt || '').toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-200 rounded-full">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex gap-2" onClick={() => setSelectedApplicant(applicant)}>
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-2 text-green-600 focus:text-green-600">
                            <CheckCircle className="h-4 w-4" /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-2 text-red-600 focus:text-red-600">
                            <XCircle className="h-4 w-4" /> Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredApplicants.length === 0 && (
              <div className="p-20 text-center text-gray-500">
                <Users className="h-10 w-10 mx-auto mb-4 opacity-20" />
                <p className="font-medium">No applicants found</p>
                <p className="text-xs">Adjust your search or filters to see more results</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Applicant Details Dialog */}
      <Dialog open={!!selectedApplicant} onOpenChange={(open) => !open && setSelectedApplicant(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">Applicant Details</DialogTitle>
          </DialogHeader>
          
          {selectedApplicant && (
            <div className="py-4 space-y-8">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row gap-6 pb-6 border-b">
                <div className="h-24 w-24 rounded-2xl bg-gray-100 flex items-center justify-center text-4xl text-[#9C8653] font-bold border-2 border-[#9C8653]/10">
                  {selectedApplicant.firstName[0]}{selectedApplicant.lastName[0]}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedApplicant.firstName} {selectedApplicant.lastName}</h3>
                    <Badge className="bg-[#9C8653] text-white">ID: {selectedApplicant.id.slice(0, 8)}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {selectedApplicant.email}</div>
                    <div className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {selectedApplicant.phone}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined: {new Date(selectedApplicant.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button className="bg-[#9C8653] hover:bg-[#8A7542] text-white">Approve Application</Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200">Reject Application</Button>
                </div>
              </div>

              {/* Tabs for detailed info */}
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-gray-100 p-1 w-full flex overflow-x-auto justify-start h-auto">
                  <TabsTrigger value="personal" className="flex-1 py-2 data-[state=active]:bg-white data-[state=active]:text-[#9C8653]">Personal Information</TabsTrigger>
                  <TabsTrigger value="experience" className="flex-1 py-2 data-[state=active]:bg-white data-[state=active]:text-[#9C8653]">Experience & Talents</TabsTrigger>
                  <TabsTrigger value="documents" className="flex-1 py-2 data-[state=active]:bg-white data-[state=active]:text-[#9C8653]">Documents & Photos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="py-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <DetailItem label="Full Name" value={`${selectedApplicant.firstName} ${selectedApplicant.lastName}`} />
                  <DetailItem label="Date of Birth" value={selectedApplicant.dob} />
                  <DetailItem label="Age" value={`${selectedApplicant.age} years old`} />
                  <DetailItem label="Height" value={`${selectedApplicant.height} cm`} />
                  <DetailItem label="Address" value={selectedApplicant.address} />
                  <DetailItem label="City & Country" value={`${selectedApplicant.city}, ${selectedApplicant.country}`} />
                  <DetailItem label="Education" value={selectedApplicant.education} />
                  <DetailItem label="Occupation" value={selectedApplicant.occupation} />
                  <DetailItem label="Languages" value={selectedApplicant.languages} />
                </TabsContent>

                <TabsContent value="experience" className="py-6 space-y-6">
                  <DetailItem label="Talents" value={selectedApplicant.talents} fullWidth />
                  <DetailItem label="Community Service" value={selectedApplicant.communityService} fullWidth />
                  <DetailItem label="Previous Pageant Experience" value={selectedApplicant.previousPageants} fullWidth />
                  <DetailItem label="Why do you want to join Miss Malawi?" value={selectedApplicant.whyJoin} fullWidth />
                </TabsContent>

                <TabsContent value="documents" className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DocumentPreview label="Headshot Photo" url={selectedApplicant.headshotPhoto} />
                  <DocumentPreview label="Full Length Photo" url={selectedApplicant.fullLengthPhoto} />
                  <DocumentPreview label="ID Proof" url={selectedApplicant.idProof} />
                  <DocumentPreview label="Consent Letter" url={selectedApplicant.consentletter} />
                  <div className="col-span-full border-t pt-6 mt-4">
                    <h4 className="font-bold text-gray-800 mb-4">Payment Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <DetailItem label="Payment Method" value={selectedApplicant.paymentMethod} />
                      <DocumentPreview label="Payment Proof" url={selectedApplicant.paymentProof} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailItem({ label, value, fullWidth = false }: { label: string, value: string | number, fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-gray-800 font-medium bg-gray-50 p-2 rounded-md">{value}</p>
    </div>
  );
}

function DocumentPreview({ label, url }: { label: string, url: string }) {
  return (
    <div className="space-y-2 border p-4 rounded-xl bg-gray-50/30">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#9C8653] hover:underline text-[10px] flex items-center gap-1">
          <ExternalLink className="h-3 w-3" /> View Original
        </a>
      </div>
      <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border group relative transition-all">
        {url ? (
          <>
            <img src={url} alt={label} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="sm" variant="secondary" onClick={() => window.open(url, '_blank')}>View Document</Button>
            </div>
          </>
        ) : (
          <div className="text-xs text-gray-400">No document uploaded</div>
        )}
      </div>
    </div>
  );
}
