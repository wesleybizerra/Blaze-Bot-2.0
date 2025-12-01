export type PlanType = 'trial' | 'monthly' | 'premium';

export interface User {
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  plan: PlanType;
  trialExpiresAt: number; // Timestamp
  createdAt: number;
}

export interface Signal {
  color: 'vermelho' | 'preto';
  probability: number;
  time: string;
  id: string;
}

export interface BlazeHistoryItem {
  color: 'white' | 'red' | 'black';
  value: number;
  id: string;
}

// Emails that get auto-premium
export const AUTO_PREMIUM_EMAILS = [
  "wesleybizerra1@gmail.com", "wesleybizerra02@gmail.com", "wesleybizerra03@gmail.com",
  "wesleybizerra04@gmail.com", "wesleybizerra05@gmail.com", "wesleybizerra06@gmail.com",
  "wesleybizerra07@gmail.com", "wesleybizerra@hotmail.com", "wesleybizerra1@hotmail.com",
  "wesleybizerra2@hotmail.com", "wesleybizerra3@hotmail.com", "wesleybizerra4@hotmail.com",
  "wesleybizerra5@hotmail.com", "wesleybizerra6@hotmail.com", "wesleybizerra7@hotmail.com",
  "wesleybizerra01@hotmail.com", "wesleybizerra02@hotmail.com", "wesleybizerra03@hotmail.com",
  "wesleybizerra04@hotmail.com", "wesleybizerra05@hotmail.com", "wesleybizerra06@hotmail.com",
  "wesleybizerra07@hotmail.com"
];

// Admin emails
export const ADMIN_EMAILS = [
  "wesleybizerra1@gmail.com",
  "wesleybizerra@hotmail.com"
];

export const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=71981574664&text=Ol%C3%A1%2C+Bom+Dia%2C+Boa+Tarde%2C+Boa+Noite%2C+Gostaria+De+Comprar+Um+Dos+Planos+Do+Seu+Site/App&type=phone_number&app_absent=0";
