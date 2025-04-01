// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

// Mock data for job market trends
const jobTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Technology',
            data: [1200, 1300, 1400, 1500, 1700, 1900],
            borderColor: '#4361ee',
            backgroundColor: 'rgba(67, 97, 238, 0.1)',
            tension: 0.4
        },
        {
            label: 'Finance',
            data: [950, 1000, 1050, 1100, 1150, 1200],
            borderColor: '#3a0ca3',
            backgroundColor: 'rgba(58, 12, 163, 0.1)',
            tension: 0.4
        },
        {
            label: 'Healthcare',
            data: [800, 850, 900, 1000, 1100, 1250],
            borderColor: '#4cc9f0',
            backgroundColor: 'rgba(76, 201, 240, 0.1)',
            tension: 0.4
        },
        {
            label: 'Marketing',
            data: [700, 750, 800, 850, 900, 950],
            borderColor: '#f72585',
            backgroundColor: 'rgba(247, 37, 133, 0.1)',
            tension: 0.4
        },
        {
            label: 'Education',
            data: [500, 550, 600, 650, 700, 750],
            borderColor: '#7209b7',
            backgroundColor: 'rgba(114, 9, 183, 0.1)',
            tension: 0.4
        }
    ]
};

// Mock data for in-demand skills
const skillsData = {
    tech: [
        { name: 'Machine Learning', demand: 'high', value: 85 },
        { name: 'React', demand: 'high', value: 82 },
        { name: 'Cloud Computing', demand: 'high', value: 80 },
        { name: 'Data Science', demand: 'high', value: 78 },
        { name: 'Cybersecurity', demand: 'high', value: 75 }
    ],
    finance: [
        { name: 'Financial Analysis', demand: 'high', value: 80 },
        { name: 'Risk Management', demand: 'high', value: 75 },
        { name: 'Blockchain', demand: 'medium', value: 65 },
        { name: 'Investment Banking', demand: 'medium', value: 60 },
        { name: 'Financial Modeling', demand: 'medium', value: 55 }
    ],
    healthcare: [
        { name: 'Telehealth', demand: 'high', value: 85 },
        { name: 'Healthcare Informatics', demand: 'high', value: 80 },
        { name: 'Electronic Medical Records', demand: 'medium', value: 70 },
        { name: 'Clinical Research', demand: 'medium', value: 65 },
        { name: 'Patient Care', demand: 'medium', value: 60 }
    ],
    marketing: [
        { name: 'Digital Marketing', demand: 'high', value: 85 },
        { name: 'Social Media Marketing', demand: 'high', value: 80 },
        { name: 'Content Creation', demand: 'high', value: 75 },
        { name: 'SEO', demand: 'medium', value: 70 },
        { name: 'Email Marketing', demand: 'medium', value: 65 }
    ],
    education: [
        { name: 'Online Teaching', demand: 'high', value: 85 },
        { name: 'Educational Technology', demand: 'high', value: 80 },
        { name: 'Curriculum Development', demand: 'medium', value: 70 },
        { name: 'Student Counseling', demand: 'medium', value: 65 },
        { name: 'Special Education', demand: 'medium', value: 60 }
    ]
};

// Mock data for industry breakdown
const industryData = {
    labels: ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Education'],
    datasets: [{
        label: 'Job Opportunities',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
            '#4361ee',
            '#3a0ca3',
            '#4cc9f0',
            '#f72585',
            '#7209b7'
        ],
        borderWidth: 1
    }]
};

// Mock data for recommended courses
const coursesData = {
    tech: [
        { title: 'Machine Learning Fundamentals', provider: 'Tech Academy', skills: ['Python', 'Statistics', 'ML Algorithms'], icon: '🤖' },
        { title: 'Full-Stack React Development', provider: 'Code Masters', skills: ['React', 'Node.js', 'MongoDB'], icon: '⚛️' },
        { title: 'AWS Cloud Practitioner', provider: 'Cloud Experts', skills: ['AWS', 'Cloud Architecture', 'DevOps'], icon: '☁️' },
        { title: 'Cybersecurity Essentials', provider: 'Security Institute', skills: ['Network Security', 'Ethical Hacking'], icon: '🔒' }
    ],
    finance: [
        { title: 'Financial Analysis Masterclass', provider: 'Finance Academy', skills: ['Excel', 'Financial Modeling', 'Valuation'], icon: '📊' },
        { title: 'Risk Management & Compliance', provider: 'Banking Institute', skills: ['Risk Assessment', 'Compliance'], icon: '⚠️' },
        { title: 'Blockchain for Finance', provider: 'FinTech School', skills: ['Blockchain', 'Cryptocurrency'], icon: '🔗' }
    ],
    healthcare: [
        { title: 'Telehealth Implementation', provider: 'Healthcare Institute', skills: ['Telehealth', 'Patient Care'], icon: '🏥' },
        { title: 'Healthcare Informatics', provider: 'Medical Tech Academy', skills: ['Data Analysis', 'Healthcare IT'], icon: '💊' },
        { title: 'Electronic Medical Records', provider: 'MedTech Solutions', skills: ['EMR Systems', 'HIPAA'], icon: '📄' }
    ],
    marketing: [
        { title: 'Digital Marketing Strategy', provider: 'Marketing Institute', skills: ['Digital Marketing', 'Strategy'], icon: '📱' },
        { title: 'Social Media Management', provider: 'Content Academy', skills: ['Social Media', 'Analytics'], icon: '📲' },
        { title: 'Content Creation Masterclass', provider: 'Creative Academy', skills: ['Content Writing', 'SEO'], icon: '✍️' }
    ],
    education: [
        { title: 'Online Teaching Essentials', provider: 'Edu Academy', skills: ['Remote Teaching', 'Digital Tools'], icon: '🎓' },
        { title: 'Educational Technology', provider: 'EdTech Institute', skills: ['EdTech', 'Learning Management'], icon: '📚' },
        { title: 'Curriculum Design', provider: 'Curriculum Experts', skills: ['Instructional Design', 'Assessment'], icon: '📝' }
    ]
};

// Mock job listings data
const jobListingsData = {
    tech: [
        { title: 'Senior Machine Learning Engineer', company: 'AI Innovations', location: 'Remote', salary: '$140,000 - $180,000', skills: ['Python', 'TensorFlow', 'Machine Learning'] },
        { title: 'Full Stack Developer', company: 'Tech Solutions', location: 'San Francisco, CA', salary: '$120,000 - $150,000', skills: ['React', 'Node.js', 'MongoDB'] },
        { title: 'Cloud Security Architect', company: 'CloudSafe Inc', location: 'Seattle, WA', salary: '$160,000 - $190,000', skills: ['AWS', 'Security', 'DevOps'] }
    ],
    finance: [
        { title: 'Financial Analyst', company: 'Global Banking', location: 'New York, NY', salary: '$90,000 - $110,000', skills: ['Financial Modeling', 'Excel', 'Valuation'] },
        { title: 'Risk Manager', company: 'Finance Partners', location: 'Chicago, IL', salary: '$100,000 - $130,000', skills: ['Risk Assessment', 'Compliance', 'Banking'] },
        { title: 'Blockchain Developer', company: 'FinTech Innovators', location: 'Miami, FL', salary: '$130,000 - $160,000', skills: ['Blockchain', 'Smart Contracts', 'Cryptocurrency'] }
    ],
    healthcare: [
        { title: 'Telehealth Coordinator', company: 'Health Connect', location: 'Boston, MA', salary: '$80,000 - $100,000', skills: ['Telehealth', 'Patient Care', 'Healthcare IT'] },
        { title: 'Healthcare Data Scientist', company: 'MedData Analytics', location: 'Remote', salary: '$110,000 - $140,000', skills: ['Data Science', 'Healthcare', 'Python'] },
        { title: 'EMR Implementation Specialist', company: 'Medical Systems', location: 'Houston, TX', salary: '$90,000 - $115,000', skills: ['EMR Systems', 'Healthcare IT', 'Project Management'] }
    ],
    marketing: [
        { title: 'Digital Marketing Manager', company: 'Brand Builders', location: 'Los Angeles, CA', salary: '$85,000 - $110,000', skills: ['Digital Marketing', 'Analytics', 'Campaign Management'] },
        { title: 'Social Media Strategist', company: 'Social Connect', location: 'Remote', salary: '$70,000 - $90,000', skills: ['Social Media', 'Content Creation', 'Analytics'] },
        { title: 'SEO Specialist', company: 'Search Optimizers', location: 'Austin, TX', salary: '$75,000 - $95,000', skills: ['SEO', 'Content Strategy', 'Analytics'] }
    ],
    education: [
        { title: 'Online Learning Designer', company: 'EdTech Solutions', location: 'Remote', salary: '$70,000 - $90,000', skills: ['Instructional Design', 'E-Learning', 'LMS'] },
        { title: 'Educational Technology Specialist', company: 'Learning Innovations', location: 'Portland, OR', salary: '$75,000 - $95,000', skills: ['EdTech', 'Technology Integration', 'Training'] },
        { title: 'Curriculum Developer', company: 'Educational Resources', location: 'Denver, CO', salary: '$65,000 - $85,000', skills: ['Curriculum Design', 'Assessment', 'Content Creation'] }
    ]
};

// Initialize charts
function initCharts() {
    // Job Trends Chart
    const jobTrendsCtx = document.getElementById('job-trends-chart').getContext('2d');
    const jobTrendsChart = new Chart(jobTrendsCtx, {
        type: 'line',
        data: jobTrendsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Number of Jobs'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month (2025)'
                    }
                }
            }
        }
    });

    // Skills Chart (using current filter)
    updateSkillsChart('all');

    // Industry Chart
    const industryCtx = document.getElementById('industry-chart').getContext('2d');
    const industryChart = new Chart(industryCtx, {
        type: 'doughnut',
        data: industryData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    return {
        jobTrendsChart,
        industryChart
    };
}

// Update skills chart based on industry filter
function updateSkillsChart(industry) {
    let skillsToShow = [];
    
    if (industry === 'all') {
        // Combine top 3 skills from each industry
        const industries = Object.keys(skillsData);
        industries.forEach(ind => {
            skillsToShow = [...skillsToShow, ...skillsData[ind].slice(0, 3)];
        });
    } else {
        skillsToShow = skillsData[industry] || skillsData.tech;
    }

    // Sort by value in descending order
    skillsToShow.sort((a, b) => b.value - a.value);
    
    // Take top 8 skills
    skillsToShow = skillsToShow.slice(0, 8);

    // Update chart
    const skillsCtx = document.getElementById('skills-chart').getContext('2d');
    
    // If chart already exists, destroy it
    if (window.skillsChart) {
        window.skillsChart.destroy();
    }
    
    window.skillsChart = new Chart(skillsCtx, {
        type: 'bar',
        data: {
            labels: skillsToShow.map(skill => skill.name),
            datasets: [{
                label: 'Demand Score',
                data: skillsToShow.map(skill => skill.value),
                backgroundColor: '#4361ee',
                borderColor: '#3a0ca3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Demand Score (0-100)'
                    }
                }
            }
        }
    });

    // Update skills list
    const skillsList = document.getElementById('top-skills-list');
    skillsList.innerHTML = '';
    
    skillsToShow.slice(0, 5).forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <span class="skill-demand ${skill.demand}">${skill.demand.toUpperCase()}</span>
        `;
        
        skillsList.appendChild(skillItem);
    });
}

// Update recommended courses based on industry
function updateCourses(industry) {
    let coursesToShow = [];
    
    if (industry === 'all') {
        // Get top courses from each industry
        const industries = Object.keys(coursesData);
        industries.forEach(ind => {
            coursesToShow = [...coursesToShow, ...coursesData[ind].slice(0, 2)];
        });
    } else {
        coursesToShow = coursesData[industry] || coursesData.tech;
    }
    
    // Limit to 6 courses
    coursesToShow = coursesToShow.slice(0, 6);
    
    // Update courses container
    const coursesContainer = document.getElementById('recommended-courses');
    coursesContainer.innerHTML = '';
    
    coursesToShow.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class="course-image">${course.icon}</div>
            <div class="course-info">
                <div class="course-title">${course.title}</div>
                <div class="course-provider">${course.provider}</div>
                <div class="course-skills">
                    ${course.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        
        coursesContainer.appendChild(courseCard);
    });
}

// Update job listings based on industry
function updateJobListings(industry) {
    let jobsToShow = [];
    
    if (industry === 'all') {
        // Get jobs from each industry
        const industries = Object.keys(jobListingsData);
        industries.forEach(ind => {
            jobsToShow = [...jobsToShow, ...jobListingsData[ind].slice(0, 1)];
        });
    } else {
        jobsToShow = jobListingsData[industry] || jobListingsData.tech;
    }
    
    // Update job listings container
    const jobListingsContainer = document.getElementById('job-listings');
    jobListingsContainer.innerHTML = '';
    
    jobsToShow.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        
        jobCard.innerHTML = `
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company}</div>
            <div class="job-details">
                <span>${job.location}</span>
                <span>${job.salary}</span>
            </div>
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        jobListingsContainer.appendChild(jobCard);
    });
}

// Handle industry filter change
document.getElementById('industry-filter').addEventListener('change', function() {
    const selectedIndustry = this.value;
    updateSkillsChart(selectedIndustry);
    updateCourses(selectedIndustry);
    updateJobListings(selectedIndustry);
});

// Handle search functionality
document.getElementById('search-btn').addEventListener('click', function() {
    performSearch();
});

document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Search implementation
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        return;
    }
    
    // Simple search to filter skills
    let matchedSkills = [];
    let matchedIndustry = null;
    
    // Check if search matches an industry
    const industries = ['tech', 'finance', 'healthcare', 'marketing', 'education'];
    const industryNames = ['technology', 'finance', 'healthcare', 'marketing', 'education'];
    
    industryNames.forEach((name, index) => {
        if (name.toLowerCase().includes(searchTerm)) {
            matchedIndustry = industries[index];
        }
    });
    
    // If an industry was matched, select it in the dropdown
    if (matchedIndustry) {
        document.getElementById('industry-filter').value = matchedIndustry;
        updateSkillsChart(matchedIndustry);
        updateCourses(matchedIndustry);
        updateJobListings(matchedIndustry);
        return;
    }
    
    // Search for skill matches
    Object.keys(skillsData).forEach(industry => {
        skillsData[industry].forEach(skill => {
            if (skill.name.toLowerCase().includes(searchTerm)) {
                matchedSkills.push(skill);
            }
        });
    });
    
    // If we found matches, update the skills chart with just those matches
    if (matchedSkills.length > 0) {
        updateSkillsChartWithCustomData(matchedSkills);
        
        // Find courses related to matched skills
        let relatedCourses = [];
        Object.keys(coursesData).forEach(industry => {
            coursesData[industry].forEach(course => {
                const skillMatches = course.skills.some(skill => 
                    skill.toLowerCase().includes(searchTerm) || 
                    matchedSkills.some(s => s.name.toLowerCase().includes(skill.toLowerCase()))
                );
                
                if (skillMatches || course.title.toLowerCase().includes(searchTerm)) {
                    relatedCourses.push(course);
                }
            });
        });
        
        // Update courses with related content
        updateCoursesWithCustomData(relatedCourses);
        
        // Find related jobs
        let relatedJobs = [];
        Object.keys(jobListingsData).forEach(industry => {
            jobListingsData[industry].forEach(job => {
                const skillMatches = job.skills.some(skill => 
                    skill.toLowerCase().includes(searchTerm) || 
                    matchedSkills.some(s => s.name.toLowerCase().includes(skill.toLowerCase()))
                );
                
                if (skillMatches || job.title.toLowerCase().includes(searchTerm)) {
                    relatedJobs.push(job);
                }
            });
        });
        
        // Update job listings with related content
        updateJobsWithCustomData(relatedJobs);
    }
}

// Update skills chart with custom data (for search results)
function updateSkillsChartWithCustomData(skills) {
    // Sort by value in descending order
    skills.sort((a, b) => b.value - a.value);
    
    // Take top 8 skills
    const skillsToShow = skills.slice(0, 8);
    
    // Update chart
    const skillsCtx = document.getElementById('skills-chart').getContext('2d');
    
    // If chart already exists, destroy it
    if (window.skillsChart) {
        window.skillsChart.destroy();
    }
    
    window.skillsChart = new Chart(skillsCtx, {
        type: 'bar',
        data: {
            labels: skillsToShow.map(skill => skill.name),
            datasets: [{
                label: 'Demand Score',
                data: skillsToShow.map(skill => skill.value),
                backgroundColor: '#4361ee',
                borderColor: '#3a0ca3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Demand Score (0-100)'
                    }
                }
            }
        }
    });
    
    // Update skills list
    const skillsList = document.getElementById('top-skills-list');
    skillsList.innerHTML = '';
    
    skillsToShow.slice(0, 5).forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <span class="skill-demand ${skill.demand}">${skill.demand.toUpperCase()}</span>
        `;
        
        skillsList.appendChild(skillItem);
    });
}

// Update courses with custom data (for search results)
function updateCoursesWithCustomData(courses) {
    // Limit to 6 courses
    const coursesToShow = courses.slice(0, 6);
    
    // Update courses container
    const coursesContainer = document.getElementById('recommended-courses');
    coursesContainer.innerHTML = '';
    
    if (coursesToShow.length === 0) {
        coursesContainer.innerHTML = '<p>No matching courses found. Try a different search term.</p>';
        return;
    }
    
    coursesToShow.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class="course-image">${course.icon}</div>
            <div class="course-info">
                <div class="course-title">${course.title}</div>
                <div class="course-provider">${course.provider}</div>
                <div class="course-skills">
                    ${course.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        
        coursesContainer.appendChild(courseCard);
    });
}

// Update jobs with custom data (for search results)
function updateJobsWithCustomData(jobs) {
    // Update job listings container
    const jobListingsContainer = document.getElementById('job-listings');
    jobListingsContainer.innerHTML = '';
    
    if (jobs.length === 0) {
        jobListingsContainer.innerHTML = '<p>No matching job listings found. Try a different search term.</p>';
        return;
    }
    
    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        
        jobCard.innerHTML = `
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company}</div>
            <div class="job-details">
                <span>${job.location}</span>
                <span>${job.salary}</span>
            </div>
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        jobListingsContainer.appendChild(jobCard);
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    updateCourses('all');
    updateJobListings('all');
    
    // Add animations for a more dynamic feel
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});