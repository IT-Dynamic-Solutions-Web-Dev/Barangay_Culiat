import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Heart, Users, IdCard, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {user.firstName} {user.middleName} {user.lastName}{user.suffix ? ` ${user.suffix}` : ''}
              </h1>
              <p className="text-gray-600">@{user.username}</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mt-2">
                {user.role || 'Resident'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Account Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="font-medium text-gray-800">@{user.username}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium text-gray-800">{user.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <IdCard className="w-5 h-5 text-blue-600" />
              Personal Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Place of Birth</p>
                <p className="font-medium text-gray-800">{user.placeOfBirth || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium text-gray-800">{user.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Civil Status</p>
                  <p className="font-medium text-gray-800">{user.civilStatus || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nationality</p>
                <p className="font-medium text-gray-800">{user.nationality || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupation</p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  {user.occupation || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Religion</p>
                <p className="font-medium text-gray-800">{user.religion || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Address
            </h2>
            <div className="space-y-2">
              <p className="font-medium text-gray-800">
                {user.address?.houseNumber} {user.address?.street}
              </p>
              {user.address?.subdivision && (
                <p className="text-gray-700">{user.address.subdivision}</p>
              )}
              <p className="text-gray-600">Barangay Culiat, Quezon City</p>
              <p className="text-gray-600">Metro Manila, 1128, Philippines</p>
            </div>
          </div>

          {/* Additional Information */}
          {(user.tinNumber || user.sssGsisNumber || user.precinctNumber) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Additional Information
              </h2>
              <div className="space-y-3">
                {user.tinNumber && (
                  <div>
                    <p className="text-sm text-gray-600">TIN Number</p>
                    <p className="font-medium text-gray-800">{user.tinNumber}</p>
                  </div>
                )}
                {user.sssGsisNumber && (
                  <div>
                    <p className="text-sm text-gray-600">SSS/GSIS Number</p>
                    <p className="font-medium text-gray-800">{user.sssGsisNumber}</p>
                  </div>
                )}
                {user.precinctNumber && (
                  <div>
                    <p className="text-sm text-gray-600">Precinct Number</p>
                    <p className="font-medium text-gray-800">{user.precinctNumber}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Spouse Information */}
          {user.spouseInfo && user.spouseInfo.name && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                Spouse Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-800">{user.spouseInfo.name}</p>
                </div>
                {user.spouseInfo.occupation && (
                  <div>
                    <p className="text-sm text-gray-600">Occupation</p>
                    <p className="font-medium text-gray-800">{user.spouseInfo.occupation}</p>
                  </div>
                )}
                {user.spouseInfo.contactNumber && (
                  <div>
                    <p className="text-sm text-gray-600">Contact Number</p>
                    <p className="font-medium text-gray-800">{user.spouseInfo.contactNumber}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          {user.emergencyContact && (
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Emergency Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-800">{user.emergencyContact.fullName}</p>
                </div>
                {user.emergencyContact.relationship && (
                  <div>
                    <p className="text-sm text-gray-600">Relationship</p>
                    <p className="font-medium text-gray-800">{user.emergencyContact.relationship}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Contact Number</p>
                  <p className="font-medium text-gray-800">{user.emergencyContact.contactNumber}</p>
                </div>
                {user.emergencyContact.address && (
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-800">
                      {user.emergencyContact.address.houseNumber} {user.emergencyContact.address.street} {user.emergencyContact.address.subdivision}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
