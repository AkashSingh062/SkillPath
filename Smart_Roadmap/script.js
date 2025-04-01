// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme');
        // Save preference to local storage
        localStorage.setItem('darkMode', themeSwitch.checked);
    });

    // Load theme preference from local storage
    if (localStorage.getItem('darkMode') === 'true') {
        themeSwitch.checked = true;
        document.body.classList.add('dark-theme');
    }

    // Navigation Active Link
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('section');

    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }

    // Event listener for scroll to update active nav link
    window.addEventListener('scroll', updateActiveNavLink);

    // Navigation Click Handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.querySelector('a').getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Roadmap Modal Functionality
    const roadmapCards = document.querySelectorAll('.view-roadmap-btn');
    const roadmapModal = document.getElementById('roadmap-modal');
    const closeModal = document.querySelector('.close-modal');

    roadmapCards.forEach(card => {
        card.addEventListener('click', function() {
            roadmapModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function() {
        roadmapModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === roadmapModal) {
            roadmapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Course Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            courseCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Roadmap Milestone Completion
    const milestoneCheckboxes = document.querySelectorAll('.timeline-item input[type="checkbox"]');
    
    milestoneCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const timelineItem = this.closest('.timeline-item');
            
            if (this.checked) {
                timelineItem.classList.add('completed');
                timelineItem.classList.remove('active');
                
                // Find next uncompleted milestone and set it as active
                const nextTimelineItem = findNextUncompletedMilestone();
                if (nextTimelineItem) {
                    nextTimelineItem.classList.add('active');
                }
                
                // Update progress
                updateProgress();
                
                // Save to local storage
                saveMilestoneProgress();
            } else {
                timelineItem.classList.remove('completed');
                
                // Update progress
                updateProgress();
                
                // Save to local storage
                saveMilestoneProgress();
            }
        });
        
        // Load saved state from local storage
        loadMilestoneProgress();
    });

    // Function to find next uncompleted milestone
    function findNextUncompletedMilestone() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        for (let item of timelineItems) {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                return item;
            }
        }
        return null;
    }

    // Function to update progress circle
    function updateProgress() {
        const totalMilestones = milestoneCheckboxes.length;
        let completedMilestones = 0;
        
        milestoneCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                completedMilestones++;
            }
        });
        
        const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);
        
        // Update the progress circle
        const circleProgress = document.querySelector('.circle');
        const percentageText = document.querySelector('.percentage');
        
        if (circleProgress && percentageText) {
            circleProgress.setAttribute('stroke-dasharray', `${progressPercentage}, 100`);
            percentageText.textContent = `${progressPercentage}%`;
            
            // Update completed milestones text
            const progressDetails = document.querySelector('.progress-details p:first-child');
            if (progressDetails) {
                progressDetails.innerHTML = `<strong>Completed:</strong> ${completedMilestones} milestones`;
            }
        }
    }

    // Function to save milestone progress to local storage
    function saveMilestoneProgress() {
        const progress = {};
        
        milestoneCheckboxes.forEach(checkbox => {
            progress[checkbox.id] = checkbox.checked;
        });
        
        localStorage.setItem('milestoneProgress', JSON.stringify(progress));
    }

    // Function to load milestone progress from local storage
    function loadMilestoneProgress() {
        const savedProgress = JSON.parse(localStorage.getItem('milestoneProgress'));
        
        if (savedProgress) {
            milestoneCheckboxes.forEach(checkbox => {
                if (savedProgress[checkbox.id]) {
                    checkbox.checked = true;
                    checkbox.closest('.timeline-item').classList.add('completed');
                }
            });
            
            // Update the active milestone
            const activeItem = findNextUncompletedMilestone();
            if (activeItem) {
                activeItem.classList.add('active');
            }
            
            // Update progress visualization
            updateProgress();
        }
    }

    // Industry Filter for Roadmaps
    const industryFilter = document.getElementById('industry-filter');
    const roadmapCards = document.querySelectorAll('.roadmap-card');
    
    industryFilter.addEventListener('change', function() {
        const selectedIndustry = this.value;
        
        roadmapCards.forEach(card => {
            if (selectedIndustry === 'all' || card.getAttribute('data-industry') === selectedIndustry) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Resources Button Functionality
    const resourcesBtns = document.querySelectorAll('.resources-btn');
    
    resourcesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // This would open a resources panel or modal in a real app
            alert('Resources would open here in the full application.');
        });
    });

    // Initialize progress on page load
    updateProgress();

    // Animations for UI elements
    const animatedElements = document.querySelectorAll('.dashboard-card, .roadmap-card, .course-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Show notification count
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        // Create notification badge
        const badge = document.createElement('span');
        badge.className = 'notification-badge';
        badge.textContent = '3';
        notificationBtn.appendChild(badge);
        
        notificationBtn.addEventListener('click', function() {
            alert('Notifications panel would open here in the full application.');
        });
    }

    // User data persistence
    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if (userData) {
            // Set user name
            const userNameElements = document.querySelectorAll('.user-name');
            userNameElements.forEach(el => {
                el.textContent = userData.name || 'User';
            });
            
            // Update skill bars if data exists
            if (userData.skills) {
                const skillBars = document.querySelectorAll('.skill-bar');
                
                userData.skills.forEach((skill, index) => {
                    if (skillBars[index]) {
                        const progressBar = skillBars[index].querySelector('.skill-progress-bar');
                        const percentText = skillBars[index].querySelector('.skill-info span:last-child');
                        
                        if (progressBar && percentText) {
                            progressBar.style.width = `${skill.level}%`;
                            percentText.textContent = `${skill.level}%`;
                        }
                    }
                });
            }
        }
    }
    
    // Initialize user data
    loadUserData();
    
    // If no user data exists, create demo data
    if (!localStorage.getItem('userData')) {
        const demoUserData = {
            name: 'Alex',
            skills: [
                { name: 'HTML & CSS', level: 90 },
                { name: 'JavaScript', level: 75 },
                { name: 'React', level: 50 },
                { name: 'Node.js', level: 40 }
            ]
        };
        
        localStorage.setItem('userData', JSON.stringify(demoUserData));
        loadUserData();
    }

    // Career insights animation
    function animateInsights() {
        const insights = document.querySelectorAll('.insight-item');
        
        insights.forEach((insight, index) => {
            setTimeout(() => {
                insight.classList.add('show');
            }, index * 300);
        });
    }
    
    // Run animations after a short delay
    setTimeout(animateInsights, 500);

    // Add CSS for animations (could be in the CSS file but adding here for completeness)
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .dashboard-card, .roadmap-card, .course-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .insight-item {
            opacity: 0;
            transform: translateX(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .insight-item.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .notification-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: var(--danger-color);
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Roadmap modal styles */
        .roadmap-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .roadmap-modal-content {
            background-color: var(--bg-primary);
            border-radius: 8px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            position: relative;
            box-shadow: var(--card-shadow);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-secondary);
        }
        
        .timeline-item.completed .timeline-marker {
            background-color: var(--success-color);
        }
        
        .timeline-item.active .timeline-marker {
            background-color: var(--primary-color);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(67, 97, 238, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(67, 97, 238, 0);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Apply responsive styles
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth < 768) {
            document.querySelector('.app-container').style.gridTemplateColumns = '60px 1fr';
            document.querySelectorAll('.nav-links li a span, .logo h2').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelector('.sidebar').style.width = '60px';
            document.querySelector('.main-content').style.marginLeft = '60px';
        } else {
            document.querySelector('.app-container').style.gridTemplateColumns = 'var(--sidebar-width) 1fr';
            document.querySelectorAll('.nav-links li a span, .logo h2').forEach(el => {
                el.style.display = 'inline';
            });
            document.querySelector('.sidebar').style.width = 'var(--sidebar-width)';
            document.querySelector('.main-content').style.marginLeft = '0';
        }
    }
    
    // Initial call and event listener for responsive layout
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);

    // Fix naming conflict with roadmapCards
    const roadmapCardElements = document.querySelectorAll('.roadmap-card');
    // Function already defined correctly above for industryFilter
});