import { useState } from 'react';
import { Eye, Users, MapPin, Briefcase, GraduationCap, Calendar, Phone, Mail, Languages, Star, Heart, MessageSquare, Award, Download, FileText, Shield, CheckCircle, XCircle, Clock, Edit3, Video } from 'lucide-react';
import { Applicant } from '@/types';
import toast from 'react-hot-toast';

interface ApplicantsViewProps {
  applicants: Applicant[];
  onUpdateStatus: (id: string, status: Applicant['applicationStatus']) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onRefresh?: () => void;
}

export default function ApplicantsView({ applicants, onUpdateStatus, onDelete, onRefresh }: ApplicantsViewProps) {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && (applicant.applicationStatus || 'pending') === filterStatus;
  });

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    await onUpdateStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  const handleDocumentView = (url: string | null, type: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error(`${type} document not available`);
    }
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${window.location.origin}${path}`;
  };

  const ImageWithFallback = ({ src, alt, className, fallbackIcon: FallbackIcon = Users }: {
    src: string | null;
    alt: string;
    className: string;
    fallbackIcon?: any;
  }) => {
    const imageUrl = getImageUrl(src);
    const imageId = `${src}-${alt}`;

    if (!imageUrl || imageErrors[imageId]) {
      return (
        <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
          <FallbackIcon className="h-16 w-16 text-gray-400" />
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        onError={() => handleImageError(imageId)}
      />
    );
  };

  const DocumentCard = ({ title, url, icon: Icon, description }: {
    title: string;
    url: string;
    icon: any;
    description: string;
  }) => (
    <div className="bg-white rounded-xl border-2 border-gray-100 p-4 hover:border-yellow-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => handleDocumentView(getImageUrl(url), title)}>
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#7C3AED20' }}>
          <Icon className="h-5 w-5" style={{ color: '#7C3AED' }} />
        </div>
        <div>
          <h4 className="font-semibold text-sm" style={{ color: '#3D3B48' }}>{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Click to view</span>
        <Download className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[#7C3AED]xl font-bold mb-2" style={{ color: '#3D3B48' }}>Pageant Applicants</h1>
          <p className="text-gray-600">{applicants.length} total applications received</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': '#7C3AED' } as React.CSSProperties}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Search applicants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': '#7C3AED' } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplicants.map((applicant) => (
          <div key={applicant.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/3] bg-gray-200 relative">
              <ImageWithFallback
                src={applicant.headshotPhoto}
                alt={`${applicant.firstName} ${applicant.lastName} - Headshot`}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-xs font-semibold" style={{ color: '#7C3AED' }}>
                  Age {applicant.age}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-3" style={{ color: '#3D3B48' }}>
                {applicant.firstName} {applicant.lastName}
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{applicant.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="line-clamp-1">{applicant.occupation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {applicant.applicationStatus === 'approved' && <CheckCircle className="h-4 w-4 text-purple-500" />}
                  {applicant.applicationStatus === 'rejected' && <XCircle className="h-4 w-4 text-red-500" />}
                  {(applicant.applicationStatus === 'pending' || !applicant.applicationStatus) && <Clock className="h-4 w-4 text-yellow-500" />}
                  <span className={`capitalize ${applicant.applicationStatus === 'approved' ? 'text-purple-600' : applicant.applicationStatus === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {applicant.applicationStatus || 'pending'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedApplicant(applicant)}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: '#7C3AED' }}
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-[#7C3AED]xl font-bold mb-2" style={{ color: '#3D3B48' }}>
                    {selectedApplicant.firstName} {selectedApplicant.lastName}
                  </h3>
                  <p className="text-gray-600">Applicant ID: {selectedApplicant.id}</p>
                </div>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2" style={{ color: '#3D3B48' }}>
                      <Users className="h-5 w-5" />
                      <span>Professional Photos</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Headshot</label>
                        <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden">
                          <ImageWithFallback src={selectedApplicant.headshotPhoto} alt="Headshot" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Full Length</label>
                        <div className="aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden">
                          <ImageWithFallback src={selectedApplicant.fullLengthPhoto} alt="Full Length" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedApplicant.introVideo && (
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center space-x-2" style={{ color: '#3D3B48' }}>
                        <Video className="h-5 w-5" />
                        <span>Introductory Video</span>
                      </h4>
                      <div className="rounded-xl overflow-hidden bg-black aspect-video border-2 border-gray-100 shadow-inner">
                        <video
                          src={getImageUrl(selectedApplicant.introVideo) || ''}
                          controls
                          className="w-full h-full"
                          poster={getImageUrl(selectedApplicant.headshotPhoto) || ''}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-4 flex items-center space-x-2" style={{ color: '#3D3B48' }}>
                      <FileText className="h-5 w-5" />
                      <span>Documents</span>
                    </h4>
                    <div className="space-y-3">
                      <DocumentCard title="ID Proof" url={selectedApplicant.idProof} icon={Shield} description="National ID or Passport" />
                      <DocumentCard title="Consent Letter" url={selectedApplicant.consentletter} icon={FileText} description="Parent/Guardian permission" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center space-x-2 text-xl" style={{ color: '#3D3B48' }}>
                      <Users className="h-6 w-6" />
                      <span>Personal Information</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <p className="text-sm"><span className="text-gray-500 block">Email</span> {selectedApplicant.email}</p>
                        <p className="text-sm"><span className="text-gray-500 block">Phone</span> {selectedApplicant.phone}</p>
                        <p className="text-sm"><span className="text-gray-500 block">Date of Birth</span> {new Date(selectedApplicant.dob).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm"><span className="text-gray-500 block">Age</span> {selectedApplicant.age} years</p>
                        <p className="text-sm"><span className="text-gray-500 block">Height</span> {selectedApplicant.height} cm</p>
                        <p className="text-sm line-clamp-2"><span className="text-gray-500 block">Address</span> {selectedApplicant.address}, {selectedApplicant.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center space-x-2 text-xl" style={{ color: '#3D3B48' }}>
                      <GraduationCap className="h-6 w-6" />
                      <span>Education & Occupation</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <p><span className="text-gray-500 block capitalize">Education</span> {selectedApplicant.education}</p>
                      <p><span className="text-gray-500 block">Occupation</span> {selectedApplicant.occupation}</p>
                      <p className="col-span-2"><span className="text-gray-500 block">Languages</span> {selectedApplicant.languages}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center space-x-2 text-xl" style={{ color: '#3D3B48' }}>
                      <Star className="h-6 w-6" />
                      <span>Experience & Talents</span>
                    </h4>
                    <div className="space-y-4 text-sm">
                      <div><span className="text-gray-500 block font-medium">Why Miss Malawi?</span> {selectedApplicant.whyJoin}</div>
                      <div><span className="text-gray-500 block font-medium">Talents</span> {selectedApplicant.talents}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center space-x-2 text-xl" style={{ color: '#3D3B48' }}>
                      <Edit3 className="h-6 w-6" />
                      <span>Status Controls</span>
                    </h4>
                    <div className="flex space-x-3 mb-4">
                      <button onClick={() => handleUpdateStatus(selectedApplicant.id, 'approved')} className="flex-1 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all">Approve</button>
                      <button onClick={() => handleUpdateStatus(selectedApplicant.id, 'rejected')} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all">Reject</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
