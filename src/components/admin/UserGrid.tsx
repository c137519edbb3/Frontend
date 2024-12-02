 

import { orgUsers } from '@/types/user';
import UserCard from './UserCard'

interface UserGridProps {
  Users: orgUsers[];
  onUpdateUser: (id: string, updatedUser: Partial<orgUsers>) => void;
  onDeleteUser: (id: string) => void;
}


const UserGrid: React.FC<UserGridProps> = ({ Users = [], onUpdateUser, onDeleteUser }) => {
  if (Users.length === 0) {
    return <p className="text-gray-600">No Users available.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Users.map((User) => (
        <UserCard 
          key={User.id} 
          User={User} 
          onUpdate={onUpdateUser}
          onDelete={onDeleteUser}
        />
      ))}
    </div>
  );
};


export default UserGrid

