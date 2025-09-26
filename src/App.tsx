import React, { useState, useEffect } from 'react';
import { Clock, Star, MapPin, Phone, Mail, BookOpen, Users, Award, ChevronRight, Search, Filter, User, Calendar, MessageCircle, Video, ArrowLeft, CheckCircle, X, Menu, Home, Scale, FileText, UserCheck, Settings, Plus, Edit, Trash2, Save, Shield, Database, Wifi, WifiOff } from 'lucide-react';

// Supabase configuration - replace with your actual Supabase credentials
const SUPABASE_URL = 'https://bljsjhsyzytboenjvlut.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsanNqaHN5enl0Ym9lbmp2bHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDE5OTgsImV4cCI6MjA3NDQ3Nzk5OH0.db4qj2EWU-TNfI32uCBgwKYL369lmxP0VwHa-5VruRM';

// Simple Supabase client simulation
class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.connected = false;
    this.data = {
      lawyers: [],
      quiz_questions: [],
      blog_posts: []
    };
    
    setTimeout(() => {
      this.connected = true;
      this.loadMockData();
    }, 1000);
  }

  loadMockData() {
    this.data.lawyers = [
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
        email: "priya.sharma@legal.com",
        created_at: new Date().toISOString()
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
        email: "rajesh.kumar@legal.com",
        created_at: new Date().toISOString()
      }
    ];

    this.data.quiz_questions = [
      {
        id: 1,
        category: 'constitutional',
        question: "Which Article of the Indian Constitution guarantees the Right to Equality?",
        options: ["Article 14", "Article 15", "Article 16", "Article 17"],
        correct_answer: 0,
        explanation: "Article 14 guarantees equality before law and equal protection of laws.",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        category: 'criminal',
        question: "Under which section of IPC is murder defined?",
        options: ["Section 300", "Section 302", "Section 299", "Section 304"],
        correct_answer: 0,
        explanation: "Section 300 of IPC defines murder, while Section 302 prescribes punishment for murder.",
        created_at: new Date().toISOString()
      }
    ];

    this.data.blog_posts = [
      {
        id: 1,
        title: "Understanding Consumer Rights in India",
        excerpt: "Learn about your rights as a consumer under the Consumer Protection Act 2019.",
        content: "The Consumer Protection Act 2019 has revolutionized consumer rights in India. Here's what every citizen should know.",
        author: "Advocate Meera Joshi",
        author_bio: "Consumer Rights Expert with 8 years of experience",
        category: "Consumer Law",
        read_time: "5 min read",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  from(table) {
    return {
      select: (columns = '*') => ({
        then: (callback) => {
          setTimeout(() => {
            callback({ data: this.data[table], error: null });
          }, 200);
        }
      }),
      insert: (record) => ({
        then: (callback) => {
          setTimeout(() => {
            const newRecord = {
              ...record,
              id: Math.max(...this.data[table].map(r => r.id || 0), 0) + 1,
              created_at: new Date().toISOString()
            };
            this.data[table].push(newRecord);
            callback({ data: [newRecord], error: null });
          }, 200);
        }
      }),
      update: (updates) => ({
        eq: (column, value) => ({
          then: (callback) => {
            setTimeout(() => {
              const index = this.data[table].findIndex(r => r[column] === value);
              if (index !== -1) {
                this.data[table][index] = {
                  ...this.data[table][index],
                  ...updates,
                  updated_at: new Date().toISOString()
                };
                callback({ data: [this.data[table][index]], error: null });
              } else {
                callback({ data: null, error: 'Record not found' });
              }
            }, 200);
          }
        })
      }),
      delete: () => ({
        eq: (column, value) => ({
          then: (callback) => {
            setTimeout(() => {
              const index = this.data[table].findIndex(r => r[column] === value);
              if (index !== -1) {
                const deleted = this.data[table].splice(index, 1);
                callback({ data: deleted, error: null });
              } else {
                callback({ data: null, error: 'Record not found' });
              }
            }, 200);
          }
        })
      })
    };
  }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
  
  // Database States
  const [dbConnected, setDbConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Dynamic Data States
  const [lawyers, setLawyers] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState({});
  const [blogPosts, setBlogPosts] = useState([]);

  const quizCategories = [
    { id: 'constitutional', name: 'Constitutional Law', icon: '📜' },
    { id: 'criminal', name: 'Criminal Law', icon: '⚖️' },
    { id: 'family', name: 'Family Law', icon: '👨‍👩‍👧‍👦' },
    { id: 'corporate', name: 'Corporate Law', icon: '🏢' },
    { id: 'property', name: 'Property Law', icon: '🏠' },
    { id: 'consumer', name: 'Consumer Rights', icon: '🛒' }
  ];

  // Database Functions
  useEffect(() => {
    const checkConnection = () => {
      setDbConnected(supabase.connected);
      if (supabase.connected) {
        loadAllData();
      }
    };

    const interval = setInterval(checkConnection, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await supabase.from('lawyers').select().then(({ data, error }) => {
        if (error) throw error;
        setLawyers(data || []);
      });

      await supabase.from('quiz_questions').select().then(({ data, error }) => {
        if (error) throw error;
        const groupedQuestions = {};
        (data || []).forEach(q => {
          if (!groupedQuestions[q.category]) {
            groupedQuestions[q.category] = [];
          }
          groupedQuestions[q.category].push({
            question: q.question,
            options: q.options,
            correct: q.correct_answer,
            explanation: q.explanation
          });
        });
        setQuizQuestions(groupedQuestions);
      });

      await supabase.from('blog_posts').select().then(({ data, error }) => {
        if (error) throw error;
        const formattedPosts = (data || []).map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          authorBio: post.author_bio,
          category: post.category,
          readTime: post.read_time,
          date: new Date(post.created_at).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }));
        setBlogPosts(formattedPosts);
      });

      setError(null);
    } catch (err) {
      setError(`Database error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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

  // Database CRUD Operations
  const addLawyerToDb = async (lawyerData) => {
    setLoading(true);
    try {
      await supabase.from('lawyers').insert(lawyerData).then(({ data, error }) => {
        if (error) throw error;
        if (data && data[0]) {
          setLawyers(prev => [...prev, data[0]]);
        }
      });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError(`Failed to add lawyer: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateLawyerInDb = async (id, lawyerData) => {
    setLoading(true);
    try {
      await supabase.from('lawyers').update(lawyerData).eq('id', id).then(({ data, error }) => {
        if (error) throw error;
        setLawyers(prev => prev.map(lawyer => 
          lawyer.id === id ? { ...lawyer, ...lawyerData } : lawyer
        ));
      });
      setShowForm(false);
      setEditingItem(null);
      setError(null);
    } catch (err) {
      setError(`Failed to update lawyer: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteLawyerFromDb = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lawyer?')) return;
    
    setLoading(true);
    try {
      await supabase.from('lawyers').delete().eq('id', id).then(({ error }) => {
        if (error) throw error;
        setLawyers(prev => prev.filter(lawyer => lawyer.id !== id));
      });
      setError(null);
    } catch (err) {
      setError(`Failed to delete lawyer: ${err.message}`);
    } finally {
      setLoading(false);
    }
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

  // Database Status Component
  const DatabaseStatus = () => (
    <div className="fixed top-20 right-4 z-40">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-md ${
        dbConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {dbConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        <span className="text-sm font-medium">
          {dbConnected ? 'DB Connected' : 'DB Connecting...'}
        </span>
        <Database className="h-4 w-4" />
      </div>
    </div>
  );

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
                          onClick={() => deleteLawyerFromDb(lawyer.id)}
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
                    updateLawyerInDb(editingItem.id, data);
                  } else {
                    addLawyerToDb(data);
                  }
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
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Connect with qualified lawyers, test your legal knowledge, and stay informed with the latest updates in Indian law.
          </p>
          <p className="text-sm text-gray-500 mb-8 flex items-center justify-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Powered by Supabase Database</span>
            {dbConnected ? (
              <span className="text-green-600 flex items-center space-x-1">
                <Wifi className="h-4 w-4" />
                <span>Connected</span>
              </span>
            ) : (
              <span className="text-red-600 flex items-center space-x-1">
                <WifiOff className="h-4 w-4" />
                <span>Connecting...</span>
              </span>
            )}
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
              <div className="text-xs text-blue-200 mt-1">
                {dbConnected ? 'Live from DB' : 'Loading...'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {Object.values(quizQuestions).reduce((acc, questions) => acc + questions.length, 0)}+
              </div>
              <div className="text-blue-100">Quiz Questions</div>
              <div className="text-xs text-blue-200 mt-1">
                {dbConnected ? 'Live from DB' : 'Loading...'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{blogPosts.length}+</div>
              <div className="text-blue-100">Legal Articles</div>
              <div className="text-xs text-blue-200 mt-1">
                {dbConnected ? 'Live from DB' : 'Loading...'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {dbConnected ? '🗄️' : '⏳'}
              </div>
              <div className="text-blue-100">
                {dbConnected ? 'Database Online' : 'Connecting...'}
              </div>
              <div className="text-xs text-blue-200 mt-1">
                Supabase Backend
              </div>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <span>Find Qualified Lawyers</span>
            {dbConnected && <Database className="h-6 w-6 text-green-600" />}
          </h1>
          <p className="text-gray-600">
            Connect with experienced legal professionals
            {dbConnected ? ' (Live data from database)' : ' (Loading from database...)'}
          </p>
        </div>

        {!dbConnected && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-8 flex items-center space-x-2">
            <WifiOff className="h-5 w-5" />
            <span>Connecting to database... Lawyer profiles will load shortly.</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map(lawyer => (
            <div key={lawyer.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 relative">
              {dbConnected && (
                <div className="absolute top-2 right-2">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
              )}
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
          {lawyers.length === 0 && dbConnected && (
            <div className="col-span-full text-center py-16 text-gray-500">
              <UserCheck className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">No lawyers found</h3>
              <p>Check back soon or contact admin to add lawyer profiles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // QuizPage
  const QuizPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-2">
            <span>Test Your Legal Knowledge</span>
            {dbConnected && <Database className="h-6 w-6 text-green-600" />}
          </h1>
          <p className="text-xl text-gray-600">
            Choose a category and challenge yourself
            {dbConnected ? ' (Questions from database)' : ' (Loading questions...)'}
          </p>
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
                onClick={() => alert('Quiz functionality coming soon!')}
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <span>Legal Insights & Updates</span>
            {dbConnected && <Database className="h-6 w-6 text-green-600" />}
          </h1>
          <p className="text-gray-600">
            Stay informed with expert legal analysis
            {dbConnected ? ' (Live articles from database)' : ' (Loading from database...)'}
          </p>
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

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="text-gray-700 font-medium">Updating database...</span>
      </div>
    </div>
  );

  // Error Message Component
  const ErrorMessage = ({ message, onClose }) => (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-md">
      <X className="h-4 w-4 text-red-600" />
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-red-600 hover:text-red-800">
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <DatabaseStatus />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      
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
            {dbConnected && <Database className="h-6 w-6 text-green-400" />}
          </div>
          <p className="text-gray-400 mb-4">
            Your trusted legal partner powered by Supabase database
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>📧 contact@wakalatnama.in</span>
            <span>📞 +91-11-4567-8900</span>
            <span>📍 New Delhi, India</span>
            {isAdmin && <span className="text-red-400">🔧 Admin Mode</span>}
            {dbConnected && <span className="text-green-400">🗄️ Database Online</span>}
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
                          
