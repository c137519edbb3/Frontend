"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { 
  IconPlus, 
  IconSettings, 
  IconUser, 
  IconCamera,
  IconUserPlus  
} from "@tabler/icons-react";
import { toast } from "sonner";
import { updateOrganization, addOrganizationAdmin } from "@/utils/organization-api";

// Types
interface Organization {
  id: number;
  name: string;
  maxCameras: number;
  cameraCount: number;
  usagePercentage: number;
  createdAt: string;
  admins: Admin[];
}

interface Admin {
  id: number;
  name: string;
  email: string;
}

// Format date helper function
const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function OrganizationsPage() {
  const { data: session, status } = useSession();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [newOrgData, setNewOrgData] = useState({
    name: "",
    maxCameras: 5
  });
  const [editOrgData, setEditOrgData] = useState({
    id: 0,
    name: "",
    maxCameras: 5
  });
  const [newAdminData, setNewAdminData] = useState({
    organizationId: 0,
    organizationName: "",
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Server URL from environment
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS || "";

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/auth/login';
    }
  }, [status]);

  // Fetch organizations when session is available
  useEffect(() => {
    if (status === 'loading') return;
    
    if (session?.accessToken) {
      fetchOrganizations();
    }
  }, [session, status]);

  // Fetch all organizations
  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/api/admin/organizations`, {
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }
      
      const data = await response.json();
      setOrganizations(data.organizations);
    } catch (err) {
      console.error('Error fetching organizations:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for new organization form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const { name, value } = e.target;
    const setValue = name === 'maxCameras' ? parseInt(value, 10) || 1 : value;
    
    if (isEdit) {
      setEditOrgData(prev => ({ ...prev, [name]: setValue }));
    } else {
      setNewOrgData(prev => ({ ...prev, [name]: setValue }));
    }
  };

  // Handle input change for new admin form
  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdminData(prev => ({ ...prev, [name]: value }));
  };

  // Handle create organization
  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.accessToken) {
      toast.error('You must be logged in to perform this action');
      return;
    }
    
    if (!newOrgData.name.trim()) {
      toast.error('Organization name is required');
      return;
    }
    
    if (newOrgData.maxCameras < 1) {
      toast.error('Maximum cameras must be at least 1');
      return;
    }
    
    try {
      const response = await fetch(`${SERVER_URL}/api/admin/organization`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({
          name: newOrgData.name.trim(),
          maxCameras: newOrgData.maxCameras
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create organization');
      }
      
      const data = await response.json();
      
      // Add new org to the list with default values for missing properties
      const newOrg: Organization = {
        ...data.organization,
        cameraCount: 0,
        usagePercentage: 0,
        createdAt: new Date().toISOString(),
        admins: []
      };
      
      setOrganizations(prev => [...prev, newOrg]);
      setNewOrgData({ name: "", maxCameras: 5 });
      setIsCreateDialogOpen(false);
      toast.success('Organization created successfully');
    } catch (err) {
      console.error('Error creating organization:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to create organization');
    }
  };

  // Open edit dialog with organization data
  const handleEditClick = (org: Organization) => {
    setEditOrgData({
      id: org.id,
      name: org.name,
      maxCameras: org.maxCameras
    });
    setIsEditDialogOpen(true);
  };

  // Open add admin dialog with organization data
  const handleAddAdminClick = (org: Organization) => {
    setNewAdminData({
      organizationId: org.id,
      organizationName: org.name,
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setIsAddAdminDialogOpen(true);
  };

  // Handle update organization
  const handleUpdateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.accessToken) {
      toast.error('You must be logged in to perform this action');
      return;
    }
    
    if (!editOrgData.name.trim()) {
      toast.error('Organization name is required');
      return;
    }
    
    if (editOrgData.maxCameras < 1) {
      toast.error('Maximum cameras must be at least 1');
      return;
    }
    
    try {
      const result = await updateOrganization(
        editOrgData.id,
        {
          name: editOrgData.name.trim(),
          maxCameras: editOrgData.maxCameras
        },
        session.accessToken
      );
      
      // Update the organizations list
      setOrganizations(prev => 
        prev.map(org => 
          org.id === editOrgData.id 
            ? { 
                ...org, 
                name: editOrgData.name, 
                maxCameras: editOrgData.maxCameras,
                // Recalculate usage percentage
                usagePercentage: Math.round((org.cameraCount / editOrgData.maxCameras) * 100)
              } 
            : org
        )
      );
      
      setIsEditDialogOpen(false);
      toast.success('Organization updated successfully');
    } catch (err) {
      console.error('Error updating organization:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update organization');
    }
  };

  // Handle create admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.accessToken) {
      toast.error('You must be logged in to perform this action');
      return;
    }
    
    // Validate form
    if (!newAdminData.username.trim()) {
      toast.error('Username is required');
      return;
    }
    
    if (!newAdminData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!newAdminData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    
    if (!newAdminData.password) {
      toast.error('Password is required');
      return;
    }
    
    if (newAdminData.password !== newAdminData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      const result = await addOrganizationAdmin(
        newAdminData.organizationId,
        {
          username: newAdminData.username.trim(),
          name: newAdminData.name.trim(),
          email: newAdminData.email.trim(),
          password: newAdminData.password
        },
        session.accessToken
      );
      
      // Update the organization's admin list
      setOrganizations(prev => 
        prev.map(org => {
          if (org.id === newAdminData.organizationId) {
            const newAdmin = {
              id: result.admin.id,
              name: newAdminData.name,
              email: newAdminData.email
            };
            
            return {
              ...org,
              admins: [...org.admins, newAdmin]
            };
          }
          return org;
        })
      );
      
      // Reset form and close dialog
      setNewAdminData({
        organizationId: 0,
        organizationName: "",
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      setIsAddAdminDialogOpen(false);
      toast.success('Admin created successfully');
    } catch (err) {
      console.error('Error creating admin:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to create admin');
    }
  };

  // Loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
      <Header 
        pageName="Organizations Management" 
        userName={session?.user?.name || "Admin"} 
        userEmail={session?.user?.email || "admin@example.com"} 
      />
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Organizations</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <IconPlus size={18} />
          Add Organization
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      ) : organizations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 p-6">
            <p className="text-muted-foreground mb-4">No organizations found</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>Create Organization</Button>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableCaption>Total {organizations.length} organizations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Camera Usage</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Admins</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.id}</TableCell>
                <TableCell>{org.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <IconCamera size={16} />
                      <span>{org.cameraCount} of {org.maxCameras}</span>
                    </div>
                    <div className="w-24 bg-secondary h-2 rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          org.usagePercentage > 90 ? 'bg-destructive' : 'bg-primary'
                        }`} 
                        style={{ width: `${org.usagePercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {org.usagePercentage}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(org.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {org.admins.length > 0 ? (
                      org.admins.map(admin => (
                        <div key={admin.id} className="flex items-center gap-1">
                          <IconUser size={14} />
                          <span className="text-sm">{admin.name}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No admins</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleAddAdminClick(org)}
                      title="Add Admin"
                    >
                      <IconUserPlus size={16} />
                      <span className="sr-only">Add Admin</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditClick(org)}
                      title="Edit Organization"
                    >
                      <IconSettings size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {/* Create Organization Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Organization</DialogTitle>
            <DialogDescription>
              Add a new organization to the system.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateOrg}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right font-medium col-span-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={newOrgData.name}
                  onChange={(e) => handleInputChange(e)}
                  className="col-span-3"
                  placeholder="Organization name"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="maxCameras" className="text-right font-medium col-span-1">
                  Max Cameras
                </label>
                <Input
                  id="maxCameras"
                  name="maxCameras"
                  type="number"
                  min="1"
                  value={newOrgData.maxCameras}
                  onChange={(e) => handleInputChange(e)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Organization</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Organization Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
            <DialogDescription>
              Update organization details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateOrg}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right font-medium col-span-1">
                  Name
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  value={editOrgData.name}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                  placeholder="Organization name"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-maxCameras" className="text-right font-medium col-span-1">
                  Max Cameras
                </label>
                <Input
                  id="edit-maxCameras"
                  name="maxCameras"
                  type="number"
                  min="1"
                  value={editOrgData.maxCameras}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Organization</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Add Admin Dialog */}
      <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Organization Admin</DialogTitle>
            <DialogDescription>
              Create a new admin for {newAdminData.organizationName}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateAdmin}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right font-medium col-span-1">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  value={newAdminData.username}
                  onChange={handleAdminInputChange}
                  className="col-span-3"
                  placeholder="Username for login"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="admin-name" className="text-right font-medium col-span-1">
                  Full Name
                </label>
                <Input
                  id="admin-name"
                  name="name"
                  value={newAdminData.name}
                  onChange={handleAdminInputChange}
                  className="col-span-3"
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right font-medium col-span-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newAdminData.email}
                  onChange={handleAdminInputChange}
                  className="col-span-3"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right font-medium col-span-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newAdminData.password}
                  onChange={handleAdminInputChange}
                  className="col-span-3"
                  placeholder="Create password"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="confirmPassword" className="text-right font-medium col-span-1">
                  Confirm
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={newAdminData.confirmPassword}
                  onChange={handleAdminInputChange}
                  className="col-span-3"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddAdminDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Admin</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}