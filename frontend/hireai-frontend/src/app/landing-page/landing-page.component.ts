import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  heroMetrics = [
    { label: 'Active Jobs', value: '18' },
    { label: 'Applicants', value: '236' },
    { label: 'Interviews', value: '42' }
  ];

  candidates = [
    { initials: 'SC', name: 'Sarah Chen', role: 'Sr. Frontend', score: '94%' },
    { initials: 'PP', name: 'Priya Patel', role: 'ML Engineer', score: '92%' },
    { initials: 'MJ', name: 'Marcus J.', role: 'Designer', score: '88%' }
  ];

  logos = ['Acme', 'Northwind', 'Vector AI', 'Orbit', 'Lumen', 'Apex'];

  features = [
    { icon: 'M', title: 'AI Match Score', desc: 'Rank candidates by skills, experience and culture fit with explainable scoring.' },
    { icon: 'S', title: 'Smart Sourcing', desc: 'Find passive talent across the web with natural-language search and intent signals.' },
    { icon: 'C', title: 'Conversations', desc: 'Unified inbox with templated outreach, scheduling and seen-status messaging.' },
    { icon: 'I', title: 'Interview Ops', desc: 'Auto-schedule across timezones, send reminders and capture structured feedback.' },
    { icon: 'A', title: 'Hiring Analytics', desc: 'Track pipeline velocity, source ROI, diversity metrics and time-to-hire in real time.' },
    { icon: 'E', title: 'Enterprise Ready', desc: 'SOC 2, SSO, role-based access, audit logs and EU/US data residency.' }
  ];

  stats = [
    { value: '12M+', label: 'Candidates indexed' },
    { value: '94%', label: 'Match accuracy' },
    { value: '37%', label: 'Faster time-to-hire' },
    { value: '4.9/5', label: 'Customer rating' }
  ];

  testimonials = [
    {
      quote: 'HireAI cut our time-to-hire by 40%. The match score is uncannily accurate.',
      initials: 'SC',
      name: 'Sarah Chen',
      role: 'Head of Talent, Acme'
    },
    {
      quote: 'Finally, a platform that feels built for modern recruiters - not a clunky ATS.',
      initials: 'MJ',
      name: 'Marcus Johnson',
      role: 'Recruiting Lead, Northwind'
    },
    {
      quote: 'The analytics alone replaced three separate tools. Our team is hooked.',
      initials: 'PP',
      name: 'Priya Patel',
      role: 'VP People, Vector AI'
    }
  ];

  pricing = [
    {
      name: 'Starter',
      price: '$0',
      period: '',
      desc: 'For individuals and small teams getting started.',
      features: ['3 active jobs', 'AI matching (basic)', 'Email support'],
      cta: 'Start free',
      featured: false
    },
    {
      name: 'Growth',
      price: '$149',
      period: '/mo',
      desc: 'For growing teams that hire every month.',
      features: ['Unlimited jobs', 'Advanced AI matching', 'Interview scheduler', 'Slack & calendar sync'],
      cta: 'Start trial',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For organizations with bespoke needs.',
      features: ['SSO + SCIM', 'Audit logs & SLA', 'Dedicated CSM', 'Custom integrations'],
      cta: 'Talk to sales',
      featured: false
    }
  ];

  faqs = [
    {
      q: 'How does the AI Match Score work?',
      a: 'Profiles and job requirements are compared across skills, experience, recency and role context.'
    },
    {
      q: 'Can I import data from my existing ATS?',
      a: 'Yes. Teams can migrate from common ATS exports and CSV files.'
    },
    {
      q: 'Is my data secure?',
      a: 'HireAI is designed around workspace roles, controlled access and auditability.'
    },
    {
      q: 'Do candidates have their own portal?',
      a: 'Yes. Candidates can track applications, resumes, jobs and messages.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. Plans are month-to-month unless your team chooses an annual agreement.'
    }
  ];

  footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
    { title: 'Company', links: ['About', 'Customers', 'Careers', 'Contact'] },
    { title: 'Resources', links: ['Blog', 'Help center', 'Security', 'Status'] }
  ];
}
