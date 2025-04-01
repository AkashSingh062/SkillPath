// DOM Elements
const profileSection = document.getElementById('profile-section');
const resultsSection = document.getElementById('results-section');
const profileForm = document.getElementById('profile-form');
const coursesContainer = document.getElementById('courses-container');
const roadmapContainer = document.getElementById('roadmap-container');
const userProfileName = document.getElementById('user-profile-name');
const userProfileGoal = document.getElementById('user-profile-goal');
const backToProfileBtn = document.getElementById('back-to-profile');
const savePathBtn = document.getElementById('save-path');
const successNotification = document.getElementById('success-notification');
const difficultyFilter = document.getElementById('difficulty-filter');
const durationFilter = document.getElementById('duration-filter');
const costFilter = document.getElementById('cost-filter');
const viewToggleBtns = document.querySelectorAll('.view-btn');

// Course database (in production, this would come from an API)
const courseData = [
    {
        id: 1,
        title: "HTML & CSS Fundamentals",
        description: "Learn the foundational technologies for web development and create your first website.",
        icon: "fa-code",
        difficulty: "beginner",
        duration: "short",
        durationText: "8 hours",
        price: "free",
        priceText: "Free",
        badge: "Starter",
        link: "#",
        category: "Web Development",
        skills: ["HTML", "CSS"],
        relatedCareers: ["Frontend Developer", "Full Stack Developer", "UI/UX Designer"],
        order: 1,
    },
    {
        id: 2,
        title: "JavaScript Essentials",
        description: "Master the basics of JavaScript programming and DOM manipulation.",
        icon: "fa-js",
        difficulty: "beginner",
        duration: "medium",
        durationText: "18 hours",
        price: "free",
        priceText: "Free",
        badge: "Essential",
        link: "#",
        category: "Web Development",
        skills: ["JavaScript"],
        relatedCareers: ["Frontend Developer", "Full Stack Developer", "Web Developer"],
        order: 2,
    },
    {
        id: 3,
        title: "Responsive Web Design",
        description: "Create websites that look great on any device with media queries and flexible layouts.",
        icon: "fa-mobile-alt",
        difficulty: "intermediate",
        duration: "medium",
        durationText: "15 hours",
        price: "free",
        priceText: "Free",
        badge: "",
        link: "#",
        category: "Web Development",
        skills: ["HTML", "CSS"],
        relatedCareers: ["Frontend Developer", "UI/UX Designer"],
        order: 2,
    },
    {
        id: 4,
        title: "Frontend Frameworks - React",
        description: "Build modern, reactive user interfaces with React, the popular JavaScript library.",
        icon: "fa-react",
        difficulty: "intermediate",
        duration: "long",
        durationText: "40 hours",
        price: "paid",
        priceText: "$49.99",
        badge: "Hot",
        link: "#",
        category: "Web Development",
        skills: ["JavaScript", "React"],
        relatedCareers: ["Frontend Developer", "Full Stack Developer"],
        order: 3,
    },
    {
        id: 5,
        title: "Backend with Node.js",
        description: "Create scalable backend applications with JavaScript using Node.js and Express.",
        icon: "fa-server",
        difficulty: "intermediate",
        duration: "long",
        durationText: "35 hours",
        price: "paid",
        priceText: "$59.99",
        badge: "",
        link: "#",
        category: "Web Development",
        skills: ["JavaScript", "Node.js"],
        relatedCareers: ["Backend Developer", "Full Stack Developer"],
        order: 3,
    },
    {
        id: 6,
        title: "Python for Beginners",
        description: "Learn the basics of Python programming to kickstart your coding journey.",
        icon: "fa-python",
        difficulty: "beginner",
        duration: "medium",
        durationText: "20 hours",
        price: "free",
        priceText: "Free",
        badge: "Popular",
        link: "#",
        category: "Programming",
        skills: ["Python"],
        relatedCareers: ["Data Scientist", "Machine Learning Engineer", "Backend Developer"],
        order: 1,
    },
    {
        id: 7,
        title: "Data Analysis with Python",
        description: "Learn to analyze and visualize data using Python's powerful libraries.",
        icon: "fa-chart-bar",
        difficulty: "intermediate",
        duration: "medium",
        durationText: "25 hours",
        price: "paid",
        priceText: "$39.99",
        badge: "",
        link: "#",
        category: "Data Science",
        skills: ["Python", "Data Analysis"],
        relatedCareers: ["Data Scientist", "Data Analyst"],
        order: 2,
    },
    {
        id: 8,
        title: "Machine Learning Fundamentals",
        description: "Build your first machine learning models and understand the core concepts.",
        icon: "fa-robot",
        difficulty: "advanced",
        duration: "long",
        durationText: "45 hours",
        price: "paid",
        priceText: "$69.99",
        badge: "Advanced",
        link: "#",
        category: "Data Science",
        skills: ["Python", "Machine Learning"],
        relatedCareers: ["Data Scientist", "Machine Learning Engineer"],
        order: 3,
    },
    {
        id: 9,
        title: "UI/UX Design Principles",
        description: "Learn essential design principles for creating user-friendly interfaces.",
        icon: "fa-pencil-ruler",
        difficulty: "beginner",
        duration: "medium",
        durationText: "15 hours",
        price: "free",
        priceText: "Free",
        badge: "",
        link: "#",
        category: "Design",
        skills: ["UI/UX Design"],
        relatedCareers: ["UI/UX Designer", "Frontend Developer"],
        order: 1,
    },
    {
        id: 10,
        title: "Mobile App Development with React Native",
        description: "Build cross-platform mobile apps using your React knowledge.",
        icon: "fa-mobile-screen",
        difficulty: "intermediate",
        duration: "long",
        durationText: "30 hours",
        price: "paid",
        priceText: "$49.99",
        badge: "",
        link: "#",
        category: "Mobile Development",
        skills: ["JavaScript", "React"],
        relatedCareers: ["Mobile App Developer", "Frontend Developer"],
        order: 2,
    },
    {
        id: 11,
        title: "Cloud Computing Fundamentals",
        description: "Learn the basics of cloud infrastructure and deployment.",
        icon: "fa-cloud",
        difficulty: "intermediate",
        duration: "medium",
        durationText: "20 hours",
        price: "free",
        priceText: "Free",
        badge: "",
        link: "#",
        category: "Cloud Computing",
        skills: ["Cloud Computing"],
        relatedCareers: ["DevOps Engineer", "Cloud Architect"],
        order: 1,
    },
    {
        id: 12,
        title: "Cybersecurity Basics",
        description: "Learn essential security practices to protect apps and data.",
        icon: "fa-shield-alt",
        difficulty: "beginner",
        duration: "medium",
        durationText: "18 hours",
        price: "free",
        priceText: "Free",
        badge: "",
        link: "#",
        category: "Security",
        skills: ["Cybersecurity"],
        relatedCareers: ["Cybersecurity Specialist", "DevOps Engineer"],
        order: 1,
    },
    {
        id: 13,
        title: "Game Development with Unity",
        description: "Create your first game with the Unity game engine.",
        icon: "fa-gamepad",
        difficulty: "intermediate",
        duration: "long",
        durationText: "40 hours",
        price: "paid",
        priceText: "$59.99",
        badge: "",
        link: "#",
        category: "Game Development",
        skills: ["Game Development"],
        relatedCareers: ["Game Developer"],
        order: 2,
    },
    {
        id: 14,
        title: "Database Design and SQL",
        description: "Learn to design and query relational databases with SQL.",
        icon: "fa-database",
        difficulty: "intermediate",
        duration: "medium",
        durationText: "25 hours",
        price: "free",
        priceText: "Free",
        badge: "",
        link: "#",
        category: "Database",
        skills: ["SQL", "Database"],
        relatedCareers: ["Backend Developer", "Full Stack Developer", "Data Analyst"],
        order: 2,
    },
    {
        id: 15,
        title: "Advanced JavaScript Patterns",
        description: "Master advanced JavaScript concepts and design patterns.",
        icon: "fa-js",
        difficulty: "advanced",
        duration: "medium",
        durationText: "22 hours",
        price: "paid",
        priceText: "$39.99",
        badge: "",
        link: "#",
        category: "Web Development",
        skills: ["JavaScript"],
        relatedCareers: ["Frontend Developer", "Full Stack Developer"],
        order: 4,
    }
];

// User profile data
let userProfile = {
    name: "",
    skills: [],
    interests: [],
    careerGoal: "",
    timeCommitment: ""
};

// Current recommendations
let recommendedCourses = [];

// Initialize application
function init() {
    loadFromLocalStorage();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    profileForm.addEventListener('submit', handleFormSubmit);
    backToProfileBtn.addEventListener('click', navigateToProfile);
    savePathBtn.addEventListener('click', savePathToLocalStorage);
    
    // View toggle buttons
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewType = btn.getAttribute('data-view');
            toggleView(viewType);
        });
    });
    
    // Filter change events
    difficultyFilter.addEventListener('change', applyFilters);
    durationFilter.addEventListener('change', applyFilters);
    costFilter.addEventListener('change', applyFilters);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Collect form data
    const nameInput = document.getElementById('name');
    const careerGoalInput = document.getElementById('career-goal');
    const timeCommitmentInput = document.getElementById('time-commitment');
    
    // Get skills
    const skillCheckboxes = document.querySelectorAll('input[id^="skill-"]:checked');
    const skills = Array.from(skillCheckboxes).map(cb => cb.value);
    
    // Get interests
    const interestCheckboxes = document.querySelectorAll('input[id^="interest-"]:checked');
    const interests = Array.from(interestCheckboxes).map(cb => cb.value);
    
    // Update user profile
    userProfile = {
        name: nameInput.value,
        skills: skills,
        interests: interests,
        careerGoal: careerGoalInput.value,
        timeCommitment: timeCommitmentInput.value
    };
    
    // Generate recommendations
    generateRecommendations();
    
    // Navigate to results section
    navigateToResults();
}

// Generate course recommendations based on user profile
function generateRecommendations() {
    // Reset recommended courses
    recommendedCourses = [];
    
    // Simple recommendation algorithm
    // 1. Start with courses related to career goal
    const careerRelatedCourses = courseData.filter(course => 
        course.relatedCareers.includes(userProfile.careerGoal)
    );
    
    // 2. Add courses related to interests that aren't already added
    const interestRelatedCourses = courseData.filter(course => {
        const isInterestRelated = userProfile.interests.some(interest => 
            course.category === interest || course.skills.includes(interest)
        );
        const alreadyAdded = careerRelatedCourses.some(c => c.id === course.id);
        return isInterestRelated && !alreadyAdded;
    });
    
    // Combine and sort recommendations
    recommendedCourses = [...careerRelatedCourses, ...interestRelatedCourses];
    
    // Sort by order (roadmap sequence)
    recommendedCourses.sort((a, b) => a.order - b.order);
    
    // Remove courses where skills are already known (if user has skills)
    if (userProfile.skills.length) {
        recommendedCourses = recommendedCourses.filter(course => {
            // Keep courses where at least one skill is not in user's skillset
            return course.skills.some(skill => !userProfile.skills.includes(skill));
        });
    }
    
    // Limit based on time commitment
    const timeCommitmentLimits = {
        "Minimal (0-5 hrs/week)": 3,
        "Part-time (5-10 hrs/week)": 5,
        "Dedicated (10-20 hrs/week)": 8,
        "Full-time (20+ hrs/week)": 15
    };
    
    const limitCourses = timeCommitmentLimits[userProfile.timeCommitment] || 5;
    recommendedCourses = recommendedCourses.slice(0, limitCourses);
    
    // Render recommendations
    renderCourseCards();
    renderRoadmap();
}

// Render course cards
function renderCourseCards() {
    // Clear existing cards
    coursesContainer.innerHTML = '';
    
    // If no recommendations
    if (recommendedCourses.length === 0) {
        coursesContainer.innerHTML = `
            <div class="no-results">
                <p>No courses match your current profile and filters. Try adjusting your interests or filters.</p>
            </div>
        `;
        return;
    }
    
    // Get template
    const template = document.getElementById('course-card-template');
    
    // Create card for each recommended course
    recommendedCourses.forEach(course => {
        // Clone template
        const card = template.content.cloneNode(true);
        
        // Set card content
        card.querySelector('.course-title').textContent = course.title;
        card.querySelector('.course-description').textContent = course.description;
        card.querySelector('.difficulty-text').textContent = capitalizeFirstLetter(course.difficulty);
        card.querySelector('.duration-text').textContent = course.durationText;
        
        // Set icon
        const iconElement = card.querySelector('.course-icon i');
        iconElement.className = '';
        iconElement.classList.add('fas', course.icon);
        
        // Set price
        const priceElement = card.querySelector('.price-text');
        priceElement.textContent = course.priceText;
        priceElement.classList.add(course.price);
        
        // Set badge
        const badgeElement = card.querySelector('.course-badge');
        if (course.badge) {
            badgeElement.textContent = course.badge;
        } else {
            badgeElement.style.display = 'none';
        }
        
        // Set link
        card.querySelector('.course-link').href = course.link;
        
        // Add card to container
        coursesContainer.appendChild(card);
    });
}

// Render roadmap view
function renderRoadmap() {
    // Clear existing roadmap
    roadmapContainer.innerHTML = '';
    
    // If no recommendations
    if (recommendedCourses.length === 0) {
        roadmapContainer.innerHTML = `
            <div class="no-results">
                <p>No courses match your current profile and filters. Try adjusting your interests or filters.</p>
            </div>
        `;
        return;
    }
    
    // Order by roadmap sequence
    const orderedCourses = [...recommendedCourses].sort((a, b) => a.order - b.order);
    
    // Create roadmap items
    orderedCourses.forEach((course, index) => {
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'roadmap-item';
        
        roadmapItem.innerHTML = `
            <div class="roadmap-icon">
                <i class="fas ${course.icon}"></i>
            </div>
            <div class="roadmap-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="roadmap-details">
                    <span><i class="fas fa-signal"></i> ${capitalizeFirstLetter(course.difficulty)}</span>
                    <span><i class="fas fa-clock"></i> ${course.durationText}</span>
                    <span class="price-text ${course.price}">${course.priceText}</span>
                </div>
            </div>
        `;
        
        roadmapContainer.appendChild(roadmapItem);
    });
}

// Apply filters to recommendations
function applyFilters() {
    const difficulty = difficultyFilter.value;
    const duration = durationFilter.value;
    const cost = costFilter.value;
    
    // Get all cards
    const cards = document.querySelectorAll('.course-card');
    let visibleCount = 0;
    
    // Filter recommended courses
    let filteredCourses = recommendedCourses.filter(course => {
        const difficultyMatch = difficulty === 'all' || course.difficulty === difficulty;
        const durationMatch = duration === 'all' || course.duration === duration;
        const costMatch = cost === 'all' || course.price === cost;
        
        return difficultyMatch && durationMatch && costMatch;
    });
    
    // Update UI with filtered courses
    renderCourseCards();
    renderRoadmap();
}

// Navigate to results section
function navigateToResults() {
    profileSection.classList.remove('active-section');
    profileSection.classList.add('hidden-section');
    
    resultsSection.classList.remove('hidden-section');
    resultsSection.classList.add('active-section');
    
    // Update user profile display
    userProfileName.textContent = `Name: ${userProfile.name}`;
    userProfileGoal.textContent = `Career Goal: ${userProfile.careerGoal}`;
}

// Navigate back to profile section
function navigateToProfile() {
    resultsSection.classList.remove('active-section');
    resultsSection.classList.add('hidden-section');
    
    profileSection.classList.remove('hidden-section');
    profileSection.classList.add('active-section');
}

// Toggle between card and roadmap views
function toggleView(viewType) {
    // Update active button
    viewToggleBtns.forEach(btn => {
        if (btn.getAttribute('data-view') === viewType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Toggle view containers
    if (viewType === 'cards') {
        coursesContainer.classList.add('active-view');
        roadmapContainer.classList.remove('active-view');
    } else {
        coursesContainer.classList.remove('active-view');
        roadmapContainer.classList.add('active-view');
    }
}

// Save path to local storage
function savePathToLocalStorage() {
    const dataToSave = {
        userProfile: userProfile,
        recommendedCourses: recommendedCourses.map(course => course.id) // Save only IDs
    };
    
    localStorage.setItem('learningPathData', JSON.stringify(dataToSave));
    
    // Show notification
    successNotification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        successNotification.classList.remove('show');
    }, 3000);
}

// Load data from local storage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('learningPathData');
    
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            
            // Restore user profile
            if (parsedData.userProfile) {
                userProfile = parsedData.userProfile;
                
                // Set form values
                document.getElementById('name').value = userProfile.name;
                document.getElementById('career-goal').value = userProfile.careerGoal;
                document.getElementById('time-commitment').value = userProfile.timeCommitment;
                
                // Set checkboxes
                userProfile.skills.forEach(skill => {
                    const checkbox = document.getElementById(`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`);
                    if (checkbox) checkbox.checked = true;
                });
                
                userProfile.interests.forEach(interest => {
                    const checkbox = document.getElementById(`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`);
                    if (checkbox) checkbox.checked = true;
                });
            }
            
            // Restore recommended courses
            if (parsedData.recommendedCourses && Array.isArray(parsedData.recommendedCourses)) {
                recommendedCourses = parsedData.recommendedCourses.map(id => 
                    courseData.find(course => course.id === id)
                ).filter(Boolean);
                
                // If we have recommendations, navigate to results
                if (recommendedCourses.length > 0) {
                    renderCourseCards();
                    renderRoadmap();
                    navigateToResults();
                }
            }
        } catch (error) {
            console.error('Error loading data from local storage:', error);
        }
    }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize application
document.addEventListener('DOMContentLoaded', init);