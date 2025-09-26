import React, { useState, useEffect } from 'react';
import { Clock, Star, MapPin, Phone, Mail, BookOpen, Users, Award, ChevronRight, Search, Filter, User, Calendar, MessageCircle, Video, ArrowLeft, CheckCircle, X, Menu, Home, Scale, FileText, UserCheck } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [activeTab, setActiveTab] = useState('hire-lawyer');
  const [quizState, setQuizState] = useState({
    category: null,
    started: false,
    currentQuestion: 0,
    answers: [],
    timeLeft: 1800, // 30 minutes in seconds
    completed: false,
    score: 0
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample data
  const lawyers = [
    {
      id: 1,
      name: "Advocate Priya Sharma",
      specialization: "Criminal Law",
      experience: "12 years",
      rating: 4.8,
      location: "New Delhi",
      price: "₹2,500/hour",
      image: "👩‍⚖️",
      about: "Specializing in criminal defense with over a decade of experience in high-profile cases. Fluent in Hindi, English, and Punjabi.",
      languages: ["Hindi", "English", "Punjabi"],
      education: "LLB from Delhi University, LLM from JNU",
      achievements: ["Best Criminal Lawyer Award 2023", "500+ successful cases"],
      reviews: 156,
      phone: "+91-9876543210",
      email: "priya.sharma@legal.com"
    },
    {
      id: 2,
      name: "Advocate Rajesh Kumar",
      specialization: "Family Law",
      experience: "15 years",
      rating: 4.9,
      location: "Mumbai",
      price: "₹3,000/hour",
      image: "👨‍⚖️",
      about: "Expert in family disputes, divorce proceedings, and child custody cases. Known for sensitive handling of family matters.",
      languages: ["Hindi", "English", "Marathi"],
      education: "LLB from Government Law College Mumbai",
      achievements: ["Family Law Expert of the Year 2022", "1000+ cases resolved"],
      reviews: 203,
      phone: "+91-9876543211",
      email: "rajesh.kumar@legal.com"
    },
    {
      id: 3,
      name: "Advocate Sunita Patel",
      specialization: "Corporate Law",
      experience: "10 years",
      rating: 4.7,
      location: "Bangalore",
      price: "₹2,800/hour",
      image: "👩‍💼",
      about: "Corporate legal advisor with expertise in company law, mergers, and acquisitions. Served major IT companies.",
      languages: ["Hindi", "English", "Gujarati"],
      education: "LLB from National Law School Bangalore",
      achievements: ["Corporate Lawyer of the Year 2021", "100+ M&A deals"],
      reviews: 89,
      phone: "+91-9876543212",
      email: "sunita.patel@legal.com"
    },
    {
      id: 4,
      name: "Advocate Vikram Singh",
      specialization: "Property Law",
      experience: "18 years",
      rating: 4.9,
      location: "Gurgaon",
      price: "₹2,200/hour",
      image: "👨‍💼",
      about: "Property law specialist with extensive experience in real estate transactions, property disputes, and documentation.",
      languages: ["Hindi", "English"],
      education: "LLB from Punjab University",
      achievements: ["Property Law Expert Award", "2000+ property deals"],
      reviews: 312,
      phone: "+91-9876543213",
      email: "vikram.singh@legal.com"
    }
  ];

  const quizCategories = [
    { id: 'constitutional', name: 'Constitutional Law', icon: '📜' },
    { id: 'criminal', name: 'Criminal Law', icon: '⚖️' },
    { id: 'family', name: 'Family Law', icon: '👨‍👩‍👧‍👦' },
    { id: 'corporate', name: 'Corporate Law', icon: '🏢' },
    { id: 'property', name: 'Property Law', icon: '🏠' },
    { id: 'consumer', name: 'Consumer Rights', icon: '🛒' }
  ];

  const quizQuestions = {
    constitutional: [
      {
        question: "Which Article of the Indian Constitution guarantees the Right to Equality?",
        options: ["Article 14", "Article 15", "Article 16", "Article 17"],
        correct: 0,
        explanation: "Article 14 guarantees equality before law and equal protection of laws."
      },
      {
        question: "The Constitution of India was adopted on which date?",
        options: ["15th August 1947", "26th January 1950", "26th November 1949", "2nd October 1947"],
        correct: 2,
        explanation: "The Constitution was adopted on 26th November 1949 and came into effect on 26th January 1950."
      }
    ],
    criminal: [
      {
        question: "Under which section of IPC is murder defined?",
        options: ["Section 300", "Section 302", "Section 299", "Section 304"],
        correct: 0,
        explanation: "Section 300 of IPC defines murder, while Section 302 prescribes punishment for murder."
      },
      {
        question: "What is the maximum punishment for theft under IPC?",
        options: ["2 years", "3 years", "5 years", "7 years"],
        correct: 1,
        explanation: "Under Section 379, theft is punishable with imprisonment up to 3 years or fine or both."
      }
    ]
  };

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Consumer Rights in India: A Comprehensive Guide",
      excerpt: "Learn about your rights as a consumer under the Consumer Protection Act 2019 and how to file complaints effectively.",
      content: `
The Consumer Protection Act 2019 has revolutionized consumer rights in India. Here's what every citizen should know:

## Key Rights Under the Act

### 1. Right to Safety
Consumers have the right to be protected against goods and services that are hazardous to life and property.

### 2. Right to Information
You have the right to be informed about the quality, quantity, potency, purity, standard and price of goods or services.

### 3. Right to Choose
Freedom to choose from a variety of goods and services at competitive prices.

### 4. Right to be Heard
Your interests will receive due consideration at appropriate forums.

### 5. Right to Redressal
You have the right to seek redressal against unfair trade practices or exploitation.

## Filing Complaints

The new act has made filing complaints easier:
- Online complaint filing through e-Daakhil portal
- Video conferencing for hearings
- Simplified procedures for small claims

## Recent Updates

The Act now covers e-commerce transactions and provides better protection for online consumers. It also includes provisions for product liability and class action suits.

Remember, as a consumer, you have powerful rights. Don't hesitate to use them when faced with unfair practices.
      `,
      author: "Advocate Meera Joshi",
      authorBio: "Consumer Rights Expert with 8 years of experience",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Consumer Law"
    },
    {
      id: 2,
      title: "Property Law Updates: New RERA Guidelines for 2024",
      excerpt: "Latest amendments to RERA and what they mean for property buyers and developers in India.",
      content: `
The Real Estate (Regulation and Development) Act has seen significant updates in 2024. Here's what you need to know:

## Major Changes

### Enhanced Transparency
- Mandatory quarterly updates on project status
- Real-time financial disclosures
- Better complaint resolution mechanisms

### Digital Integration
- Online registration processes
- Digital document verification
- E-governance implementation

### Penalty Revisions
- Stricter penalties for non-compliance
- Fast-track resolution for disputes
- Enhanced consumer protection

## Impact on Buyers

Property buyers now have:
- Better legal protection
- Faster dispute resolution
- More transparent dealings

## Developer Obligations

Developers must now:
- Maintain higher transparency standards
- Provide regular project updates
- Ensure timely project completion

Stay informed about these changes to make better property decisions.
      `,
      author: "Advocate Rohit Malhotra",
      authorBio: "Property Law Specialist with 12 years of experience",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Property Law"
    },
    {
      id: 3,
      title: "How to File FIR Online: Step-by-Step Guide",
      excerpt: "Complete guide to filing First Information Report online through state police portals and what documents you need.",
      content: `
Filing an FIR online has become easier with digital initiatives. Here's your complete guide:

## When Can You File Online FIR?

Online FIRs can be filed for:
- Theft of mobile phones, vehicles, or other property
- Lost documents
- Cyber crimes
- Cheating and fraud cases

## Step-by-Step Process

### 1. Visit the State Police Website
Each state has its own online FIR portal:
- Delhi: delhipolice.gov.in
- Mumbai: mumbaipolice.gov.in
- Bangalore: ksp.gov.in

### 2. Fill the Online Form
Provide:
- Personal details
- Incident details
- Location and time
- Supporting documents

### 3. Submit and Get Receipt
- Submit the form
- Receive acknowledgment number
- Print the receipt

### 4. Follow Up
- Track status online
- Visit police station if required
- Cooperate with investigation

## Required Documents

- Identity proof (Aadhaar, PAN, etc.)
- Address proof
- Supporting evidence
- Witness details (if any)

## Important Points

- Online FIR has same legal validity
- Response time is usually 24-48 hours
- Some cases may require physical visit

Remember, filing false FIR is a punishable offense. Ensure all information is accurate and truthful.
      `,
      author: "Advocate Priya Gupta",
      authorBio: "Criminal Law Expert and Digital Rights Advocate",
      date: "March 8, 2024",
      readTime: "6 min read",
      category: "Criminal Law"
    }
  ];

  // Timer for quiz
  useEffect(() => {
    let timer;
    if (quizState.started && !quizState.completed && quizState.timeLeft > 0) {
      timer = setTimeout(() => {
        setQuizState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (quizState.timeLeft === 0 && !quizState.completed) {
      handleQuizComplete();
    }
    return () => clearTimeout(timer);
  }, [quizState.timeLeft, quizState.started, quizState.completed]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (category) => {
    setQuizState({
      category,
      started: true,
      currentQuestion: 0,
      answers: [],
      timeLeft: 1800,
      completed: false,
      score: 0
    });
  };

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    setQuizState(prev => ({ ...prev, answers: newAnswers }));
  };

  const nextQuestion = () => {
    const questions = quizQuestions[quizState.category] || [];
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const questions = quizQuestions[quizState.category] || [];
    const score = quizState.answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correct ? 1 : 0);
    }, 0);
    
    setQuizState(prev => ({ 
      ...prev, 
      completed: true, 
      score: Math.round((score / questions.length) * 100) 
    }));
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const resetQuiz = () => {
    setQuizState({
      category: null,
      started: false,
      currentQuestion: 0,
      answers: [],
      timeLeft: 1800,
      completed: false,
      score: 0
    });
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSpecialization === '' || lawyer.specialization === filterSpecialization;
    return matchesSearch && matchesFilter;
  });

  const Navigation = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Wakalatnama Beta Version
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${currentPage === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => { setCurrentPage('lawyers'); setActiveTab('hire-lawyer'); }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${currentPage === 'lawyers' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Hire Lawyer</span>
            </button>
            <button 
              onClick={() => { setCurrentPage('quiz'); setActiveTab('quiz'); }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${currentPage === 'quiz' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Law Quiz</span>
            </button>
            <button 
              onClick={() => { setCurrentPage('blog'); setActiveTab('blog'); }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${currentPage === 'blog' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <FileText className="h-4 w-4" />
              <span>Legal Blog</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('lawyers'); setActiveTab('hire-lawyer'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Hire Lawyer
              </button>
              <button 
                onClick={() => { setCurrentPage('quiz'); setActiveTab('quiz'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Law Quiz
              </button>
              <button 
                onClick={() => { setCurrentPage('blog'); setActiveTab('blog'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Legal Blog
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Your Trusted
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Legal Partner
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with qualified lawyers, test your legal knowledge, and stay informed with the latest updates in Indian law.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => { setCurrentPage('lawyers'); setActiveTab('hire-lawyer'); }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <UserCheck className="h-5 w-5" />
              <span>Find a Lawyer</span>
            </button>
            <button 
              onClick={() => { setCurrentPage('quiz'); setActiveTab('quiz'); }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Wakalatnama?</h2>
            <p className="text-xl text-gray-600">Your one-stop solution for all legal needs</p>
          </div>

          {/* Tabbed Interface */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg p-2 mb-8">
              <button
                onClick={() => setActiveTab('hire-lawyer')}
                className={`flex-1 px-6 py-3 rounded-md text-center font-semibold transition ${
                  activeTab === 'hire-lawyer' 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <UserCheck className="h-5 w-5 mx-auto mb-2" />
                Hire Lawyers
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 px-6 py-3 rounded-md text-center font-semibold transition ${
                  activeTab === 'quiz' 
                    ? 'bg-white text-indigo-600 shadow-md' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <BookOpen className="h-5 w-5 mx-auto mb-2" />
                Law Quizzes
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`flex-1 px-6 py-3 rounded-md text-center font-semibold transition ${
                  activeTab === 'blog' 
                    ? 'bg-white text-purple-600 shadow-md' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <FileText className="h-5 w-5 mx-auto mb-2" />
                Legal Blog
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'hire-lawyer' && (
              <div className="bg-blue-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Find Qualified Lawyers</h3>
                    <ul className="space-y-3 text-gray-600 mb-6">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Browse verified lawyer profiles</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Compare ratings and specializations</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Book consultations instantly</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Transparent pricing ₹2,000-₹3,000/hour</span>
                      </li>
                    </ul>
                    <button 
                      onClick={() => { setCurrentPage('lawyers'); setActiveTab('hire-lawyer'); }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Browse Lawyers
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {lawyers.slice(0, 4).map(lawyer => (
                      <div key={lawyer.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-3xl mb-2">{lawyer.image}</div>
                        <h4 className="font-semibold text-sm">{lawyer.name}</h4>
                        <p className="text-xs text-gray-600">{lawyer.specialization}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{lawyer.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="bg-indigo-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Test Your Legal Knowledge</h3>
                    <ul className="space-y-3 text-gray-600 mb-6">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span>Comprehensive quiz categories</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span>30-minute timed sessions</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span>Detailed explanations</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span>Grade scoring and progress tracking</span>
                      </li>
                    </ul>
                    <button 
                      onClick={() => { setCurrentPage('quiz'); setActiveTab('quiz'); }}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                      Start Quiz
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {quizCategories.slice(0, 4).map(category => (
                      <div key={category.id} className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <h4 className="font-semibold text-sm">{category.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="bg-purple-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated with Legal Insights</h3>
                    <ul className="space-y-3 text-gray-600 mb-6">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                        <span>Expert legal analysis</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                        <span>Latest law updates</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                        <span>Practical legal guides</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                        <span>Community discussions</span>
                      </li>
                    </ul>
                    <button 
                      onClick={() => { setCurrentPage('blog'); setActiveTab('blog'); }}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Read Articles
                    </button>
                  </div>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 2).map(post => (
                      <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-sm mb-1 line-clamp-2">{post.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Verified Lawyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Cases Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="text-blue-100">Quiz Attempts</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Legal Articles</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const LawyersPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Qualified Lawyers</h1>
          <p className="text-gray-600">Connect with experienced legal professionals across India</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search lawyers by name, specialization, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Property Law">Property Law</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
              Search
            </button>
          </div>
        </div>

        {/* Lawyers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map(lawyer => (
            <div key={lawyer.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{lawyer.image}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{lawyer.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{lawyer.specialization}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{lawyer.experience}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{lawyer.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{lawyer.rating}</span>
                  <span className="text-gray-600 text-sm">({lawyer.reviews} reviews)</span>
                </div>
                <div className="text-xl font-bold text-green-600">{lawyer.price}</div>
              </div>

              <button 
                onClick={() => setSelectedLawyer(lawyer)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const LawyerProfile = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => setSelectedLawyer(null)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Lawyers</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedLawyer.image}</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedLawyer.name}</h1>
                <p className="text-blue-600 font-semibold mb-2">{selectedLawyer.specialization}</p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{selectedLawyer.rating}</span>
                  <span className="text-gray-600">({selectedLawyer.reviews} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">{selectedLawyer.price}</div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Book Consultation</span>
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center space-x-2">
                  <Video className="h-5 w-5" />
                  <span>Video Call</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{selectedLawyer.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{selectedLawyer.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{selectedLawyer.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 mb-4">{selectedLawyer.about}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Experience</h3>
                  <p className="text-gray-600">{selectedLawyer.experience}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
                  <p className="text-gray-600">{selectedLawyer.languages.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
              <p className="text-gray-600">{selectedLawyer.education}</p>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h2>
              <ul className="space-y-2">
                {selectedLawyer.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Client Reviews</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">5.0</span>
                  </div>
                  <p className="text-gray-600 mb-2">"Excellent lawyer with deep knowledge of criminal law. Handled my case professionally and got the best outcome."</p>
                  <p className="text-sm text-gray-500">- Rahul Sharma</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">5.0</span>
                  </div>
                  <p className="text-gray-600 mb-2">"Very responsive and knowledgeable. Explained everything clearly and kept me informed throughout the process."</p>
                  <p className="text-sm text-gray-500">- Priya Patel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuizPage = () => {
    if (quizState.started && !quizState.completed) {
      const questions = quizQuestions[quizState.category] || [];
      const currentQ = questions[quizState.currentQuestion];

      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Quiz Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                  {quizState.category.replace('-', ' ')} Quiz
                </h1>
                <button 
                  onClick={resetQuiz}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Question {quizState.currentQuestion + 1} of {questions.length}</span>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono text-lg">{formatTime(quizState.timeLeft)}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((quizState.currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQ?.question}</h2>
              <div className="space-y-3">
                {currentQ?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      quizState.answers[quizState.currentQuestion] === index
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setQuizState(prev => ({ 
                    ...prev, 
                    currentQuestion: Math.max(0, prev.currentQuestion - 1) 
                  }))}
                  disabled={quizState.currentQuestion === 0}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={quizState.answers[quizState.currentQuestion] === undefined}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quizState.currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (quizState.completed) {
      const questions = quizQuestions[quizState.category] || [];
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h1>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 mb-6">
                <div className="text-4xl font-bold mb-2">{quizState.score}%</div>
                <div className="text-xl">Grade: {getGrade(quizState.score)}</div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-800">{questions.length}</div>
                  <div className="text-gray-600">Total Questions</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {quizState.answers.filter((ans, i) => ans === questions[i]?.correct).length}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">
                    {questions.length - quizState.answers.filter((ans, i) => ans === questions[i]?.correct).length}
                  </div>
                  <div className="text-gray-600">Incorrect Answers</div>
                </div>
              </div>

              {/* Review Questions */}
              <div className="text-left mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers</h2>
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Q{index + 1}: {question.question}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Your Answer:</p>
                          <p className={`font-medium ${
                            quizState.answers[index] === question.correct 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {question.options[quizState.answers[index]] || 'Not answered'}
                            {quizState.answers[index] === question.correct ? ' ✓' : ' ✗'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Correct Answer:</p>
                          <p className="font-medium text-green-600">
                            {question.options[question.correct]} ✓
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Take Another Quiz
                </button>
                <button
                  onClick={() => startQuiz(quizState.category)}
                  className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium"
                >
                  Retake This Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Test Your Legal Knowledge</h1>
            <p className="text-xl text-gray-600">Choose a category and challenge yourself with our comprehensive law quizzes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quizCategories.map(category => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-8 text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{category.name}</h3>
                <p className="text-gray-600 mb-6">
                  Test your knowledge in {category.name.toLowerCase()} with our comprehensive quiz questions.
                </p>
                <button
                  onClick={() => startQuiz(category.id)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-2">Choose Category</h3>
                <p className="text-sm text-gray-600">Select from 6 different law categories</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">30 Minutes</h3>
                <p className="text-sm text-gray-600">Complete the quiz within the time limit</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-gray-600">Receive detailed feedback and grades</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Review & Learn</h3>
                <p className="text-sm text-gray-600">Study explanations for each question</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BlogPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Legal Insights & Updates</h1>
          <p className="text-gray-600">Stay informed with the latest legal developments and expert analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-8">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Featured Article
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{blogPosts[0].author}</span>
                  <span>{blogPosts[0].date} • {blogPosts[0].readTime}</span>
                </div>
                <button 
                  onClick={() => setSelectedBlog(blogPosts[0])}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Read Full Article
                </button>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="space-y-6">
              {blogPosts.slice(1).map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer"
                          onClick={() => setSelectedBlog(post)}>
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.date} • {post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="mb-4 text-blue-100">Get the latest legal insights delivered to your inbox</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg text-gray-800 mb-3"
              />
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-gray-100 transition font-medium">
                Subscribe
              </button>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {['Constitutional Law', 'Criminal Law', 'Family Law', 'Corporate Law', 'Property Law', 'Consumer Rights'].map(category => (
                  <div key={category} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 hover:text-blue-600 cursor-pointer">{category}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {Math.floor(Math.random() * 20) + 5}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Discussions</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm text-gray-600 mb-1">
                    "Very informative article about consumer rights..."
                  </p>
                  <p className="text-xs text-gray-500">- Amit Kumar on Consumer Rights</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="text-sm text-gray-600 mb-1">
                    "The RERA updates are very helpful for property buyers..."
                  </p>
                  <p className="text-xs text-gray-500">- Priya Singh on Property Law</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="text-sm text-gray-600 mb-1">
                    "Online FIR filing process explained clearly..."
                  </p>
                  <p className="text-xs text-gray-500">- Rajesh Sharma on Criminal Law</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogPost = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => setSelectedBlog(null)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Blog</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-8">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {selectedBlog.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{selectedBlog.title}</h1>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-8 pb-8 border-b">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{selectedBlog.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{selectedBlog.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{selectedBlog.readTime}</span>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                  {selectedBlog.content.match(/### \d+\. [^\n]+/g)?.map((heading, index) => (
                    <li key={index}>
                      <a 
                        href={`#section-${index}`} 
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {heading.replace('### ', '')}
                      </a>
                    </li>
                  )) || []}
                </ul>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {selectedBlog.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  } else if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3" id={`section-${index}`}>
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-600">{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Author Bio */}
              <div className="bg-blue-50 rounded-lg p-6 mt-12">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full p-4">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About {selectedBlog.author}</h3>
                    <p className="text-gray-600">{selectedBlog.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="border-t pt-8 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Share on Twitter
                  </button>
                  <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition">
                    Share on LinkedIn
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    Share on WhatsApp
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t pt-8 mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Comments</h3>
                
                {/* Comment Form */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Leave a Comment</h4>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Your Comment"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                      Post Comment
                    </button>
                  </div>
                </div>

                {/* Sample Comments */}
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-gray-300 rounded-full p-2">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Amit Kumar</h5>
                        <p className="text-sm text-gray-500">March 16, 2024</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Very informative article! The explanation about consumer rights under the new act is comprehensive and easy to understand. Thank you for sharing this valuable information.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-gray-300 rounded-full p-2">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Priya Singh</h5>
                        <p className="text-sm text-gray-500">March 15, 2024</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      I had no idea about the e-Daakhil portal for filing complaints online. This will be very helpful for consumers. Could you also write about the time limits for filing complaints?
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="border-t pt-8 mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {blogPosts.filter(post => post.id !== selectedBlog.id).slice(0, 2).map(post => (
                    <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                         onClick={() => setSelectedBlog(post)}>
                      <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600">{post.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      
      {currentPage === 'lawyers' && !selectedLawyer && <LawyersPage />}
      {currentPage === 'lawyers' && selectedLawyer && <LawyerProfile />}
      
      {currentPage === 'quiz' && <QuizPage />}
      
      {currentPage === 'blog' && !selectedBlog && <BlogPage />}
      {currentPage === 'blog' && selectedBlog && <BlogPost />}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Wakalatnama</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted legal partner for finding qualified lawyers, testing legal knowledge, and staying updated with Indian law.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Find Lawyers</a></li>
                <li><a href="#" className="hover:text-white transition">Legal Consultation</a></li>
                <li><a href="#" className="hover:text-white transition">Law Quizzes</a></li>
                <li><a href="#" className="hover:text-white transition">Legal Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Criminal Law</a></li>
                <li><a href="#" className="hover:text-white transition">Family Law</a></li>
                <li><a href="#" className="hover:text-white transition">Corporate Law</a></li>
                <li><a href="#" className="hover:text-white transition">Property Law</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 contact@wakalatnama.in</p>
                <p>📞 +91-11-4567-8900</p>
                <p>📍 New Delhi, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Wakalatnama. All rights reserved. | Legal Services Platform for India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
            
