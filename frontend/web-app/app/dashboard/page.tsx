import { Users, Gift, TrendingUp, Heart } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to NGO Connect Platform</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="text-blue-600" size={32} />}
            title="Total Beneficiaries"
            value="1,234"
            change="+12%"
          />
          <StatCard
            icon={<Gift className="text-green-600" size={32} />}
            title="Donations This Month"
            value="56"
            change="+8%"
          />
          <StatCard
            icon={<TrendingUp className="text-purple-600" size={32} />}
            title="Distribution Events"
            value="23"
            change="+15%"
          />
          <StatCard
            icon={<Heart className="text-red-600" size={32} />}
            title="Active NGOs"
            value="12"
            change="+2"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <ActionButton title="Register Beneficiary" href="/beneficiaries/new" />
            <ActionButton title="Record Donation" href="/donations/new" />
            <ActionButton title="Plan Distribution" href="/distribution/plan" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              title="New beneficiary registered"
              description="John Doe added to the system"
              time="2 hours ago"
            />
            <ActivityItem
              title="Donation received"
              description="500kg of rice from Local Donor"
              time="5 hours ago"
            />
            <ActivityItem
              title="Distribution completed"
              description="50 beneficiaries received supplements"
              time="1 day ago"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, title, value, change }: any) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-green-600 text-sm font-medium">{change}</span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function ActionButton({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="block p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-center"
    >
      <span className="font-medium text-gray-900">{title}</span>
    </a>
  )
}

function ActivityItem({ title, description, time }: any) {
  return (
    <div className="border-l-4 border-primary-500 pl-4 py-2">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  )
}
