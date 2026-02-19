import { Link } from 'react-router-dom';
import { Heart, Users, Target, Award, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Heart,
      title: 'Make an Impact',
      description: 'Donate to causes you care about and track your contributions in real-time',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      link: '/register',
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Gain points, unlock badges, and climb the leaderboard as you contribute',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      link: '/register',
    },
    {
      icon: Target,
      title: 'Campaign Goals',
      description: 'Support targeted campaigns for education, healthcare, and disaster relief',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      link: '/campaigns',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join volunteers and beneficiaries in a transparent charitable ecosystem',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      link: '/community',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor fund utilization with detailed analytics and reports',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      link: '/tracking',
    },
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'All transactions are secure with complete transparency and receipts',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      link: '/register',
    },
  ];

  const stats = [
    { label: 'Total Donations', value: '₹10M+', icon: TrendingUp },
    { label: 'Active Campaigns', value: '250+', icon: Target },
    { label: 'Happy Donors', value: '5,000+', icon: Users },
    { label: 'Lives Impacted', value: '25,000+', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAxNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Make a Difference,
              <br />
              <span className="text-primary-200">One Donation at a Time</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of donors, volunteers, and beneficiaries in creating positive change through transparent, gamified charitable giving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 text-lg font-medium text-white border-2 border-white hover:bg-white hover:text-primary-600 rounded-lg transition-all duration-200"
              >
                Sign In
              </Link>
              <a
                href="#features"
                className="px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 hover:shadow-lg transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary-600" />
                <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Helping Hands?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Experience a modern approach to charitable giving with gamification, transparency, and real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card hover:shadow-xl transition-all duration-300 group animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
                <div className="mt-4 text-primary-600 font-medium flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Making an Impact?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join our community today and be part of something bigger.
          </p>
          <Link
            to="/login"
            className="inline-block btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="text-white font-semibold">Helping Hands</span>
            </div>
            <p className="text-sm">
              © 2026 Helping Hands. Making a difference together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;