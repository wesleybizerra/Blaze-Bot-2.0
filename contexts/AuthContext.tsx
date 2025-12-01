import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PlanType, AUTO_PREMIUM_EMAILS } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, phone: string, birthDate: string) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  getAllUsers: () => User[];
  updateUserPlan: (email: string, plan: PlanType) => void;
  addTime: (email: string, hours: number, minutes: number, days: number) => void;
  checkAccess: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      // Sync with "database" (localStorage users array) to get latest plan status
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const freshUser = allUsers.find((u: User) => u.email === parsed.email);
      if (freshUser) {
        setUser(freshUser);
      } else {
        setUser(parsed);
      }
    }
  }, []);

  const login = (email: string, name: string, phone: string, birthDate: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let existingUser = users.find((u: User) => u.email === email);

    if (!existingUser) {
      // New Registration
      const isAutoPremium = AUTO_PREMIUM_EMAILS.includes(email);
      const now = Date.now();
      
      const newUser: User = {
        email,
        name,
        phone,
        birthDate,
        plan: isAutoPremium ? 'premium' : 'trial',
        trialExpiresAt: now + (25 * 60 * 60 * 1000), // 25 hours
        createdAt: now,
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      existingUser = newUser;
    }

    // Save session
    localStorage.setItem('currentUser', JSON.stringify(existingUser));
    setUser(existingUser);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: User) => u.email === updatedUser.email);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      
      // If updating self
      if (user && user.email === updatedUser.email) {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
  };

  const updateUserPlan = (email: string, plan: PlanType) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const targetUser = users.find((u: User) => u.email === email);
    if (targetUser) {
      targetUser.plan = plan;
      // Reset trial timer if setting back to trial (optional, but logical for admin control)
      if (plan === 'trial' && targetUser.trialExpiresAt < Date.now()) {
         targetUser.trialExpiresAt = Date.now() + (25 * 60 * 60 * 1000);
      }
      localStorage.setItem('users', JSON.stringify(users));
      
      if (user && user.email === email) {
        setUser(targetUser);
        localStorage.setItem('currentUser', JSON.stringify(targetUser));
      }
      
      logAction(`Updated plan for ${email} to ${plan}`);
    }
  };

  const addTime = (email: string, hours: number, minutes: number, days: number) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const targetUser = users.find((u: User) => u.email === email);
    
    if (targetUser) {
      const msToAdd = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
      
      // If expired, start from now. If not, add to existing.
      const baseTime = targetUser.trialExpiresAt > Date.now() ? targetUser.trialExpiresAt : Date.now();
      targetUser.trialExpiresAt = baseTime + msToAdd;
      
      localStorage.setItem('users', JSON.stringify(users));
      
      if (user && user.email === email) {
        setUser(targetUser);
        localStorage.setItem('currentUser', JSON.stringify(targetUser));
      }
      
      logAction(`Added time to ${email}: ${days}d ${hours}h ${minutes}m`);
    }
  }

  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  };

  const logAction = (action: string) => {
    const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    logs.push({
      action,
      admin: user?.email,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('adminLogs', JSON.stringify(logs));
  };

  const checkAccess = (): boolean => {
    if (!user) return false;
    if (user.plan === 'premium' || user.plan === 'monthly') return true;
    if (user.plan === 'trial') {
      return Date.now() < user.trialExpiresAt;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, getAllUsers, updateUserPlan, addTime, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
