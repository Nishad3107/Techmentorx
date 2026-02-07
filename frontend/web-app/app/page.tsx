import Link from 'next/link'
import { ArrowRight, Heart, Shield, Users } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Connecting NGOs for Equitable Distribution
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A unified platform to connect NGOs, manage beneficiaries, and distribute 
              resources fairly with AI-powered content safety
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/auth/register" 
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 flex items-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <Link 
                href="/about" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="text-primary-600" size={40} />}
              title="NGO Coordination"
              description="Connect all NGOs in your city for better collaboration and resource sharing"
            />
            <FeatureCard
              icon={<Heart className="text-primary-600" size={40} />}
              title="Equitable Distribution"
              description="Fair distribution algorithms ensure resources reach those who need them most"
            />
            <FeatureCard
              icon={<Shield className="text-primary-600" size={40} />}
              title="Content Safety"
              description="AI-powered content filtration for safer digital experiences"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
