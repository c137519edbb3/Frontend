// src/types/user.ts
export interface orgUsers {
    id: string;
    name: string;
    state: 'connected' | 'running' | 'disconnected';
    ipAddress: string;
    location: string;
    model: string;
  }  

  export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    role: string;
    organization: {
      id: number;
      name: string;
    };
    token: string;
  }


  