
export type Language = 'en' | 'hi' | 'gu';

export interface ActiveInvestment {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  startDate: string;
  type: 'monthly' | 'wealth';
  totalEarned: number;
  monthsCompleted: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address?: string;
  dob?: string;
  referralId: string;
  referrerName?: string;
  balance: number;
  coins: number;
  isLoggedIn: boolean;
  profileImage?: string;
  activeInvestments?: ActiveInvestment[];
  transactionPin?: string;
  loginPassword?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  link: string;
  price: string;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  monthlyReturn: number;
}
