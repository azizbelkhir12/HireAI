export type Role = 'admin' | 'recruiter' | 'candidate';

export interface Stat {
  label: string;
  value: string;
  delta: string;
}

export const adminStats: Stat[] = [
  { label: 'Total Users', value: '12,486', delta: '+8.2%' },
  { label: 'Recruiters', value: '1,204', delta: '+4.1%' },
  { label: 'Candidates', value: '11,282', delta: '+9.4%' },
  { label: 'Active Jobs', value: '3,419', delta: '+12.6%' }
];

export const recruiterStats: Stat[] = [
  { label: 'Active Jobs', value: '18', delta: '+3' },
  { label: 'New Applicants', value: '236', delta: '+24' },
  { label: 'Interviews', value: '42', delta: 'this week' },
  { label: 'Hire Rate', value: '23%', delta: '+2.4%' }
];

export const candidateStats: Stat[] = [
  { label: 'Applications', value: '14', delta: 'active' },
  { label: 'Interviews', value: '3', delta: 'scheduled' },
  { label: 'Profile Strength', value: '82%', delta: 'Strong' },
  { label: 'Match Score', value: '91%', delta: 'avg' }
];

export const applicationsChart = [28, 42, 36, 58, 64, 82, 95];

export const users = [
  { name: 'Sarah Chen', email: 'sarah@acme.io', role: 'Recruiter', status: 'active' },
  { name: 'Marcus Johnson', email: 'marcus@design.co', role: 'Candidate', status: 'active' },
  { name: 'Priya Patel', email: 'priya@northwind.dev', role: 'Recruiter', status: 'pending' },
  { name: 'David Kim', email: 'david@orbit.app', role: 'Candidate', status: 'active' },
  { name: 'Elena Rossi', email: 'elena@vector.ai', role: 'Admin', status: 'active' }
];

export const jobs = [
  { title: 'Senior Frontend Engineer', company: 'Acme Corp', location: 'Remote', type: 'Full-time', salary: '$140k-$180k', applicants: 86, status: 'open' },
  { title: 'Product Designer', company: 'Northwind', location: 'Berlin', type: 'Hybrid', salary: 'EUR85k-EUR110k', applicants: 54, status: 'open' },
  { title: 'ML Engineer', company: 'Vector AI', location: 'San Francisco', type: 'On-site', salary: '$180k-$240k', applicants: 121, status: 'open' },
  { title: 'DevOps Engineer', company: 'Orbit', location: 'Remote', type: 'Contract', salary: '$120/hr', applicants: 34, status: 'open' },
  { title: 'Backend Engineer', company: 'Lumen', location: 'Lagos', type: 'Full-time', salary: '$80k-$110k', applicants: 47, status: 'closed' }
];

export const applicants = [
  { name: 'Sarah Chen', role: 'Senior Frontend Engineer', match: 94, status: 'Interview', avatar: 'SC', skills: ['React', 'TypeScript', 'GraphQL'] },
  { name: 'Marcus Johnson', role: 'Product Designer', match: 88, status: 'Under Review', avatar: 'MJ', skills: ['Figma', 'UX', 'Prototyping'] },
  { name: 'Priya Patel', role: 'ML Engineer', match: 92, status: 'Applied', avatar: 'PP', skills: ['Python', 'PyTorch', 'LLMs'] },
  { name: 'David Kim', role: 'Backend Engineer', match: 76, status: 'Applied', avatar: 'DK', skills: ['Go', 'Postgres', 'K8s'] },
  { name: 'Aisha Bello', role: 'DevOps Engineer', match: 81, status: 'Accepted', avatar: 'AB', skills: ['AWS', 'Terraform', 'CI/CD'] }
];

export const interviews = [
  { candidate: 'Sarah Chen', role: 'Sr. Frontend', time: 'Today 3:00 PM', stage: 'Technical' },
  { candidate: 'Priya Patel', role: 'ML Engineer', time: 'Tomorrow 10:00 AM', stage: 'Final' },
  { candidate: 'Marcus Johnson', role: 'Designer', time: 'Thu 1:30 PM', stage: 'Portfolio' }
];

export const appliedJobs = [
  { title: 'Senior Frontend Engineer', company: 'Acme Corp', status: 'Interview Scheduled', applied: '2d ago', match: 94 },
  { title: 'ML Engineer', company: 'Vector AI', status: 'Under Review', applied: '5d ago', match: 88 },
  { title: 'Product Designer', company: 'Northwind', status: 'Applied', applied: '1w ago', match: 76 },
  { title: 'Backend Engineer', company: 'Lumen', status: 'Rejected', applied: '2w ago', match: 62 }
];

export const messages = [
  { from: 'Sarah Chen', preview: 'Thanks for the quick turnaround on the offer letter.', time: '2m' },
  { from: 'Acme Corp HR', preview: 'Looking forward to your technical interview.', time: '1h' },
  { from: 'Marcus Johnson', preview: 'I attached my updated portfolio.', time: '3h' },
  { from: 'Vector AI', preview: 'Your application status has been updated.', time: '1d' }
];
