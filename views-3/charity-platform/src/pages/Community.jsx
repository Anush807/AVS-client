import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Heart, Trophy, Target, CheckCircle } from 'lucide-react';

const Community = () => {
  const roles = [
    {
      icon: Heart,
      title: 'Donors',
      count: '5,000+',
      description: 'Generous individuals making regular contributions',
      benefits: [
        'Earn points with every donation',
        'Climb the leaderboard',
        'Unlock exclusive badges',
        'Track your impact',
      ],
      color: 'from-red-500 to-pink-600',
    },
    {
      icon: Users,
      title: 'Beneficiaries',
      count: '2,500+',
      description: 'People receiving support and assistance',
      benefits: [
        'Submit support requests',
        'Access to various campaigns',
        'Direct assistance programs',
        'Community support',
      ],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Trophy,
      title: 'Volunteers',
      count: '1,200+',
      description: 'Dedicated volunteers contributing their time',
      benefits: [
        'Complete meaningful tasks',
        'Earn volunteer points',
        'Build your reputation',
        'Make real impact',
      ],
      color: 'from-green-500 to-emerald-600',
    },
  ];

  const stats = [
    { label: 'Total Members', value: '8,700+', icon: Users },
    { label: 'Lives Impacted', value: '25,000+', icon: Heart },
    { label: 'Active Campaigns', value: '250+', icon: Target },
    { label: 'Total Donations', value: '₹10M+', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Our Community
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Join thousands of donors, volunteers, and beneficiaries in creating positive change
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</p>
              <p className="text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Roles Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Be Part of Something Bigger
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div
                key={index}
                className="card hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${role.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                      <role.icon className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-neutral-900">{role.count}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{role.title}</h3>
                  <p className="text-neutral-600 mb-6">{role.description}</p>
                  <div className="space-y-3">
                    {role.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-primary-100 mb-8 text-lg max-w-2xl mx-auto">
            Whether you want to donate, volunteer, or receive support - there's a place for you here
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-primary bg-white text-primary-600 hover:bg-primary-50"
            >
              Join as Donor
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg font-medium border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Join as Volunteer
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg font-medium border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Join as Beneficiary
            </Link>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Impact</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-700">Education</span>
                  <span className="font-semibold text-primary-600">₹4.2M</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-700">Healthcare</span>
                  <span className="font-semibold text-green-600">₹3.5M</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-700">Disaster Relief</span>
                  <span className="font-semibold text-orange-600">₹2.3M</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Why Join Us?</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">100% transparent fund utilization</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">Real-time impact tracking</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">Gamified experience with rewards</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700">Active and supportive community</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;