import React, { useState, useEffect } from 'react';
import { Clock, Star, MapPin, Phone, Mail, BookOpen, Users, Award, ChevronRight, Search, Filter, User, Calendar, MessageCircle, Video, ArrowLeft, CheckCircle, X, Menu, Home, Scale, FileText, UserCheck, Settings, Plus, Edit, Trash2, Save, Shield } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [activeTab, setActiveTab] = useState('hire-lawyer');
  const [quizState, setQuizState] = useState({
    category: null,
    started: false,
    currentQuestion: 0,
    answers: [],
    timeLeft: 1800,
    completed: false,
    score: 0
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Admin System States
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminSection, setAdminSection] = useState('lawyers');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // Dynamic Data States
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: "Advocate Priya Sharma",
      specialization: "Criminal Law",
      experience: "12 years",
      rating: 4.8,
      location: "New Delhi",
      price: "₹2,500/hour",
      image: "👩‍⚖️",
      about: "Specializing in criminal defense with over a decade of experience in high-profile cases.",
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
      about: "Expert in family disputes, divorce proceedings, and child custody cases.",
      languages: ["Hindi", "English", "Marathi"],
      education: "LLB from Government Law College Mumbai",
      achievements: ["Family Law Expert of the Year 2022", "1000+ cases resolved"],
      reviews: 203,
      phone: "+91-9876543211",
      email: "rajesh.kumar@legal.com"
    }
  ]);

  const [quizQuestions, setQuizQuestions] = useState({
    constitutional: [
      {
        question: "Which Article of the Indian Constitution guarantees the Right to Equality?",
        options: ["Article 14", "Article 15", "Article 16", "Article 17"],
        correct: 0,
        explanation: "Article 14 guarantees equality before law and equal protection of laws."
      }
    ],
    criminal: [
      {
        question: "Under which section of IPC is murder defined?",
        options: ["Section 300", "Section 302", "Section 299", "Section 304"],
        correct: 0,
        explanation: "Section 300 of IPC defines murder, while Section 302 prescribes punishment for murder."
      }
    ]
  });

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Understanding Consumer Rights in India",
      excerpt: "Learn about your rights as a consumer under the Consumer Protection Act 2019.",
      content: "The Consumer Protection Act 2019 has revolutionized consumer rights in India.",
      author: "Advocate Meera Joshi",
      authorBio: "Consumer Rights Expert with 8 years of experience",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Consumer Law"
    }
  ]);

  const quizCategories = [
    { id: 'constitutional', name: 'Constitutional Law', icon: '📜' },
    { id: 'criminal', name: 'Criminal Law', icon: '⚖️' },
    { id: 'family', name: 'Family Law', icon: '👨‍👩‍👧‍👦' },
    { id: 'corporate', name: 'Corporate Law', icon: '🏢' },
    { id: 'property', name: 'Property Law', icon: '🏠' },
    { id: 'consumer', name: 'Consumer Rights', icon: '🛒' }
  ];

  // Admin Functions
  const handleAdminLogin = () => {
    if (adminPassword === 'wakalatnama2024') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setCurrentPage('admin');
    } else {
      alert('Invalid password!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setCurrentPage('home');
    setEditingItem(null);
    setShowForm(false);
  };

  // Quiz functions
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

  // Form Components
  const LawyerForm = ({ lawyer, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: lawyer?.name || '',
      specialization: lawyer?.specialization || '',
      experience: lawyer?.experience || '',
      rating: lawyer?.rating || 4.5,
      location: lawyer?.location || '',
      price: lawyer?.price || '',
      image: lawyer?.image || '👨‍⚖️',
      about: lawyer?.about || '',
      languages: lawyer?.languages?.join(', ') || '',
      education: lawyer?.education || '',
      achievements: lawyer?.achievements?.join(', ') || '',
      reviews: lawyer?.reviews || 0,
      phone: lawyer?.phone || '',
      email: lawyer?.email || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const processedData = {
        ...formData,
        languages: formData.languages.split(',').map(lang => lang.trim()),
        achievements: formData.achievements.split(',').map(ach => ach.trim()),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews) || 0
      };
      onSave(processedData);
    };

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">{lawyer ? 'Edit Lawyer' : 'Add New Lawyer'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Experience"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Rating"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Price (e.g., ₹2,500/hour)"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <textarea
            placeholder="About"
            value={formData.about}
            onChange={(e) => setFormData({...formData, about: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
          <input
            type="text"
            placeholder="Languages (comma separated)"
            value={formData.languages}
            onChange={(e) => setFormData({...formData, languages: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Education"
            value={formData.education}
            onChange={(e) => setFormData({...formData, education: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Achievements (comma separated)"
            value={formData.achievements}
            onChange={(e) => setFormData({...formData, achievements: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Reviews Count"
              value={formData.reviews}
              onChange={(e) => setFormData({...formData, reviews: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {lawyer ? 'Update' : 'Add'} Lawyer
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  const BlogForm = ({ blog, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: blog?.title || '',
      excerpt: blog?.excerpt || '',
      content: blog?.content || '',
      author: blog?.author || '',
      authorBio: blog?.authorBio || '',
      readTime: blog?.readTime || '',
      category: blog?.category || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">{blog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            placeholder="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            rows={2}
            required
          />
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            rows={8}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Author Bio"
              value={formData.authorBio}
              onChange={(e) => setFormData({...formData, authorBio: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Read Time (e.g., 5 min read)"
              value={formData.readTime}
              onChange={(e) => setFormData({...formData, readTime: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {blog ? 'Update' : 'Add'} Blog Post
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Wakalatnama
            </span>
          </div>
          
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
            {isAdmin ? (
              <>
                <button 
                  onClick={() => setCurrentPage('admin')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${currentPage === 'admin' ? 'bg-red-100 text-red-600' : 'text-red-600 hover:text-red-700'}`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </button>
                <button 
                  onClick={handleAdminLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-red-600 hover:text-red-700 transition"
                >
                  <Shield className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowAdminLogin(true)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

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
                onClick={() => { setCurrentPage('lawyers'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Hire Lawyer
              </button>
              <button 
                onClick={() => { setCurrentPage('quiz'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Law Quiz
              </button>
              <button 
                onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                Legal Blog
              </button>
              {isAdmin ? (
                <>
                  <button 
                    onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Admin Panel
                  </button>
                  <button 
                    onClick={() => { handleAdminLogout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Admin Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setShowAdminLogin(true); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Admin Login</h2>
              <button 
                onClick={() => setShowAdminLogin(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700 text-center font-medium">
                  Demo Password: wakalatnama2024
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
   /* Tab Content */
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
      </section>


  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Manage lawyers, quizzes, and blog posts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Lawyers</p>
                <p className="text-3xl font-bold text-blue-600">{lawyers.length}</p>
              </div>
              <UserCheck className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Quiz Questions</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {Object.values(quizQuestions).reduce((acc, questions) => acc + questions.length, 0)}
                </p>
              </div>
              <BookOpen className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Blog Posts</p>
                <p className="text-3xl font-bold text-purple-600">{blogPosts.length}</p>
              </div>
              <FileText className="h-12 w-12 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setAdminSection('lawyers')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                adminSection === 'lawyers' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manage Lawyers
            </button>
            <button
              onClick={() => setAdminSection('blogs')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                adminSection === 'blogs' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manage Blogs
            </button>
            <button
              onClick={() => setAdminSection('quizzes')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                adminSection === 'quizzes' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manage Quizzes
            </button>
          </div>
        </div>

        {adminSection === 'lawyers' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Manage Lawyers</h2>
                <button
                  onClick={() => { setEditingItem(null); setShowForm(true); }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Lawyer</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {lawyers.map(lawyer => (
                  <div key={lawyer.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{lawyer.image}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{lawyer.name}</h3>
                          <p className="text-blue-600">{lawyer.specialization}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{lawyer.experience}</span>
                            <span>{lawyer.location}</span>
                            <span className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{lawyer.rating}</span>
                            </span>
                            <span>{lawyer.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { setEditingItem(lawyer); setShowForm(true); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Lawyer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this lawyer?')) {
                              setLawyers(lawyers.filter(l => l.id !== lawyer.id));
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Lawyer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {adminSection === 'blogs' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Manage Blog Posts</h2>
                <button
                  onClick={() => { setEditingItem(null); setShowForm(true); }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Blog Post</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {blogPosts.map(blog => (
                  <div key={blog.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{blog.author}</span>
                          <span>{blog.category}</span>
                          <span>{blog.date}</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { setEditingItem(blog); setShowForm(true); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Blog Post"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this blog post?')) {
                              setBlogPosts(blogPosts.filter(b => b.id !== blog.id));
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Blog Post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {adminSection === 'quizzes' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Quiz Questions</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-6">
                {quizCategories.map(category => (
                  <div key={category.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg flex items-center space-x-2">
                        <span className="text-2xl">{category.icon}</span>
                        <span>{category.name}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {(quizQuestions[category.id] || []).length} questions
                        </span>
                      </h3>
                      <button
                        onClick={() => {
                          const question = prompt('Enter question:');
                          if (question) {
                            const option1 = prompt('Option 1:');
                            const option2 = prompt('Option 2:');
                            const option3 = prompt('Option 3:');
                            const option4 = prompt('Option 4:');
                            const correct = parseInt(prompt('Correct option (0-3):'));
                            const explanation = prompt('Explanation:');
                            
                            if (option1 && option2 && option3 && option4 && explanation && correct >= 0 && correct <= 3) {
                              const newQuestion = {
                                question,
                                options: [option1, option2, option3, option4],
                                correct,
                                explanation
                              };
                              
                              setQuizQuestions({
                                ...quizQuestions,
                                [category.id]: [...(quizQuestions[category.id] || []), newQuestion]
                              });
                            }
                          }
                        }}
                        className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition flex items-center space-x-1"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Question</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(quizQuestions[category.id] || []).map((question, index) => (
                        <div key={index} className="bg-white rounded p-3 border">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-2">
                                <span className="text-gray-500">Q{index + 1}:</span> {question.question}
                              </p>
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className={`p-1 rounded ${optIndex === question.correct ? 'bg-green-100 text-green-700 font-medium' : ''}`}>
                                    {String.fromCharCode(65 + optIndex)}: {option}
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                <strong>Explanation:</strong> {question.explanation}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this question?')) {
                                  setQuizQuestions({
                                    ...quizQuestions,
                                    [category.id]: quizQuestions[category.id].filter((_, i) => i !== index)
                                  });
                                }
                              }}
                              className="ml-3 p-1 text-red-600 hover:bg-red-50 rounded transition"
                              title="Delete Question"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admin Forms Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            {adminSection === 'lawyers' && (
              <LawyerForm 
                lawyer={editingItem}
                onSave={(data) => {
                  if (editingItem) {
                    setLawyers(lawyers.map(l => l.id === editingItem.id ? {...l, ...data} : l));
                  } else {
                    const newLawyer = {
                      ...data,
                      id: Math.max(...lawyers.map(l => l.id), 0) + 1
                    };
                    setLawyers([...lawyers, newLawyer]);
                  }
                  setShowForm(false);
                  setEditingItem(null);
                }}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
              />
            )}
            {adminSection === 'blogs' && (
              <BlogForm 
                blog={editingItem}
                onSave={(data) => {
                  if (editingItem) {
                    setBlogPosts(blogPosts.map(b => b.id === editingItem.id ? {...b, ...data} : b));
                  } else {
                    const newBlog = {
                      ...data,
                      id: Math.max(...blogPosts.map(b => b.id), 0) + 1,
                      date: new Date().toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    };
                    setBlogPosts([...blogPosts, newBlog]);
                  }
                  setShowForm(false);
                  setEditingItem(null);
                }}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );

  // HomePage component
  const HomePage = () => (
    <div className="min-h-screen">
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

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{lawyers.length}+</div>
              <div className="text-blue-100">Verified Lawyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {Object.values(quizQuestions).reduce((acc, questions) => acc + questions.length, 0)}+
              </div>
              <div className="text-blue-100">Quiz Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{blogPosts.length}+</div>
              <div className="text-blue-100">Legal Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{isAdmin ? '🔧' : '👥'}</div>
              <div className="text-blue-100">{isAdmin ? 'Admin Mode' : 'Happy Users'}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // LawyersPage
  const LawyersPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Qualified Lawyers</h1>
          <p className="text-gray-600">Connect with experienced legal professionals</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map(lawyer => (
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

  // QuizPage
  const QuizPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Test Your Legal Knowledge</h1>
          <p className="text-xl text-gray-600">Choose a category and challenge yourself</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {quizCategories.map(category => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-8 text-center">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{category.name}</h3>
              <p className="text-gray-600 mb-6">
                {(quizQuestions[category.id] || []).length} questions available
              </p>
              <button
                onClick={() => {
                  if (quizQuestions[category.id] && quizQuestions[category.id].length > 0) {
                    startQuiz(category.id);
                  } else {
                    alert('No questions available for this category yet!');
                  }
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BlogPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Legal Insights & Updates</h1>
          <p className="text-gray-600">Stay informed with expert legal analysis</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-gray-800 mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span>{post.date} • {post.readTime}</span>
              </div>
              <button 
                onClick={() => setSelectedBlog(post)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
              >
                Read Article
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'lawyers' && !selectedLawyer && <LawyersPage />}
      {currentPage === 'quiz' && <QuizPage />}
      {currentPage === 'blog' && !selectedBlog && <BlogPage />}
      {currentPage === 'admin' && isAdmin && <AdminDashboard />}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">Wakalatnama</span>
          </div>
          <p className="text-gray-400 mb-4">
            Your trusted legal partner for finding qualified lawyers and staying updated with Indian law.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>contact@wakalatnama.in</span>
            <span>+91-11-4567-8900</span>
            <span>New Delhi, India</span>
            {isAdmin && <span className="text-red-400">Admin Mode Active</span>}
          </div>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <p>&copy; 2024 Wakalatnama. All rights reserved. | Legal Services Platform for India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 
                
