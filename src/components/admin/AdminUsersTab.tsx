import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { DEMO_USERS } from '../../data/mockData';
import { UserRole } from '../../types';
import {
  Users,
  Search,
  Shield,
  Home,
  Briefcase,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Building,
  CheckCircle,
} from 'lucide-react';

export const AdminUsersTab: React.FC = () => {
  const { properties, currentUser } = useRealEstate();
  const [selectedRole, setSelectedRole] = useState<'ALL' | UserRole>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Combined user list
  const allUsers = [
    ...(currentUser ? [currentUser] : []),
    ...DEMO_USERS.filter((u) => u.uid !== currentUser?.uid),
  ];

  const filteredUsers = allUsers.filter((u) => {
    if (selectedRole !== 'ALL' && u.role !== selectedRole) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phone || '').toLowerCase().includes(q) ||
      (u.agencyName || '').toLowerCase().includes(q)
    );
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Shield className="w-3 h-3" />
            ADMIN
          </span>
        );
      case 'seller':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Home className="w-3 h-3" />
            SELLER / OWNER
          </span>
        );
      case 'agent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Briefcase className="w-3 h-3" />
            AGENT / BROKER
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700">
            <UserCheck className="w-3 h-3" />
            BUYER / CUSTOMER
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E6E1] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#102A43] text-white">
                <Users className="w-3.5 h-3.5 text-[#C6A15B]" />
                Identity & Access Control
              </span>
              <span className="text-xs text-stone-500">4 User Archetypes</span>
            </div>
            <h1 className="text-2xl font-bold text-[#102A43] font-serif mt-2">
              User Management Directory
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Directory of registered Buyers, Property Owners, Real Estate Agents, and Platform Administrators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#F7F5F0] border border-[#E8E6E1] text-xs font-bold text-[#102A43]">
              Total Users: {allUsers.length}
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-[#E8E6E1]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedRole('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRole === 'ALL'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setSelectedRole('seller')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRole === 'seller'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              Sellers ({allUsers.filter((u) => u.role === 'seller').length})
            </button>
            <button
              onClick={() => setSelectedRole('agent')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRole === 'agent'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              Agents ({allUsers.filter((u) => u.role === 'agent').length})
            </button>
            <button
              onClick={() => setSelectedRole('buyer')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRole === 'buyer'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              Buyers ({allUsers.filter((u) => u.role === 'buyer').length})
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRole === 'admin'
                  ? 'bg-[#102A43] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-700 hover:bg-stone-200'
              }`}
            >
              Admins ({allUsers.filter((u) => u.role === 'admin').length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, agency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F5F0] border border-[#E8E6E1] rounded-xl focus:ring-2 focus:ring-[#102A43]"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] text-stone-600 border-b border-[#E8E6E1] font-semibold">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Agency / Company</th>
                <th className="py-3 px-4">Active Plan</th>
                <th className="py-3 px-4">Properties</th>
                <th className="py-3 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E6E1]">
              {filteredUsers.map((user) => {
                const userProperties = properties.filter((p) => p.ownerId === user.uid || p.ownerEmail === user.email);
                return (
                  <tr key={user.uid} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#102A43] text-white flex items-center justify-center font-bold text-xs">
                          {user.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[#102A43]">{user.displayName}</div>
                          <div className="text-[11px] text-stone-400 font-mono">UID: {user.uid}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-stone-700">
                        <Mail className="w-3 h-3 text-stone-400" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1.5 text-stone-500">
                          <Phone className="w-3 h-3 text-stone-400" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-stone-700">
                      {user.agencyName || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      {user.activePackageId ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle className="w-3 h-3" />
                          {user.activePackageId}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[11px]">No active package</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#102A43]">
                      {userProperties.length} listings
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {user.createdAt || '2026-08-01'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
