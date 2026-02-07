import Link from 'next/link'
import { Heart, Shield, Users, TrendingUp, Globe, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-primary-600 text-white py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-sm hover:underline">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About NGO Connect Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building a better world through equitable distribution and safer digital experiences
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              NGO Connect Platform is a comprehensive solution designed to tackle two critical challenges:
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">1. NGO Coordination</h3>
                <p className="text-gray-600">
                  Connecting NGOs across cities to ensure equitable distribution of resources, supplements, 
                  and aid to those who need it most. Our algorithms ensure fairness and transparency.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-secondary-600">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2. Content Safety</h3>
                <p className="text-gray-600">
                  Providing AI-powered content filtration with a privacy-first approach, ensuring safer 
                  digital experiences through toxicity detection, age-appropriate filtering, and bias mitigation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Users className="text-primary-600" size={48} />}
              title="Multi-NGO Coordination"
              description="Connect and collaborate with NGOs across your city for better resource management and impact."
            />
            <FeatureCard
              icon={<Heart className="text-red-600" size={48} />}
              title="Equitable Distribution"
              description="Fair distribution algorithms ensuring resources reach those who need them most based on priority and need."
            />
            <FeatureCard
              icon={<Shield className="text-green-600" size={48} />}
              title="Privacy-First AI"
              description="Content safety powered by AI with user anonymization and GDPR compliance built-in."
            />
            <FeatureCard
              icon={<TrendingUp className="text-blue-600" size={48} />}
              title="Real-time Analytics"
              description="Track impact, monitor distributions, and measure outcomes with comprehensive dashboards."
            />
            <FeatureCard
              icon={<Globe className="text-purple-600" size={48} />}
              title="Scalable Architecture"
              description="Built on modern microservices architecture to scale with your organization's growth."
            />
            <FeatureCard
              icon={<Award className="text-yellow-600" size={48} />}
              title="Fairness & Ethics"
              description="Bias detection and mitigation ensuring equal opportunity across all demographics."
            />
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <TechStack
                title="Frontend"
                technologies={[
                  'Next.js 14 with App Router',
                  'React & TypeScript',
                  'Tailwind CSS',
                  'Progressive Web App (PWA)',
                  'React Native for Mobile'
                ]}
              />
              <TechStack
                title="Backend"
                technologies={[
                  'Node.js & Express',
                  'Python & FastAPI',
                  'PostgreSQL & MongoDB',
                  'Redis Caching',
                  'RESTful APIs'
                ]}
              />
              <TechStack
                title="AI/ML"
                technologies={[
                  'PyTorch & Transformers',
                  'BERT-based Models',
                  'Toxicity Detection',
                  'Fairness Algorithms',
                  'Privacy-Preserving ML'
                ]}
              />
              <TechStack
                title="DevOps"
                technologies={[
                  'Docker & Kubernetes',
                  'CI/CD Pipelines',
                  'Monitoring & Logging',
                  'Cloud Infrastructure',
                  'Automated Testing'
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <ImpactStat number="100+" label="NGOs Connected" />
            <ImpactStat number="10K+" label="Beneficiaries Served" />
            <ImpactStat number="50K+" label="Content Items Filtered" />
            <ImpactStat number="99.9%" label="Uptime Reliability" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our platform and help create a more equitable and safer world
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TechStack({ title, technologies }: { title: string; technologies: string[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
      <ul className="space-y-2">
        {technologies.map((tech, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span className="text-gray-700">{tech}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ImpactStat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-primary-600 mb-2">{number}</div>
      <div className="text-gray-700">{label}</div>
    </div>
  )
}
