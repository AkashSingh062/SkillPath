document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const monthSelect = document.getElementById('skills_progress_month_select_c4d5b');
    const heatmapGrid = document.getElementById('skills_progress_heatmap_d6e2f');
    const activeDaysElement = document.getElementById('skills_progress_active_days_t7u8v');
    const streakElement = document.getElementById('skills_progress_streak_z1a2b');
    
    // Sample data - in production, this would come from your backend
    // Format: [year][month][day] = level (0-4)
    const sampleData = generateSampleData();
    
    // Set current date for initial display
    const currentDate = new Date();
    monthSelect.value = currentDate.getMonth();
    
    // Generate initial heatmap
    generateHeatmap(currentDate.getFullYear(), currentDate.getMonth());
    
    // Event listener for month change
    monthSelect.addEventListener('change', function() {
        const selectedMonth = parseInt(this.value);
        const selectedYear = currentDate.getFullYear();
        
        // Fade out
        heatmapGrid.classList.add('fade');
        
        // Wait for fade out animation to complete
        setTimeout(() => {
            // Generate new heatmap
            generateHeatmap(selectedYear, selectedMonth);
            
            // Fade in
            heatmapGrid.classList.remove('fade');
        }, 300);
    });
    
    // Function to generate the heatmap for a specific month
    function generateHeatmap(year, month) {
        // Clear existing grid
        heatmapGrid.innerHTML = '';
        
        // Get days in month and first day of month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        
        // Add empty cells for days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'skills_progress_day_cell_j5k6l';
            emptyCell.style.visibility = 'hidden';
            heatmapGrid.appendChild(emptyCell);
        }
        
        // Add cells for each day of the month
        let activeDays = 0;
        let currentStreak = 0;
        let maxStreak = 0;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'skills_progress_day_cell_j5k6l';
            
            // Get activity level for this day (0-4)
            const activityLevel = getActivityLevel(year, month, day);
            
            // Add appropriate level class
            if (activityLevel > 0) {
                cell.classList.add(`skills_progress_level_${activityLevel}_${getLevelClass(activityLevel)}`);
                activeDays++;
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                cell.classList.add('skills_progress_level_0_k9l0m');
                currentStreak = 0;
            }
            
            // Add tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skills_progress_day_tooltip_m7n8o';
            tooltip.textContent = `${getMonthName(month)} ${day}: ${getLevelDescription(activityLevel)}`;
            cell.appendChild(tooltip);
            
            // Add to grid
            heatmapGrid.appendChild(cell);
            
            // Add click event to cell
            cell.addEventListener('click', function() {
                // Here you could add functionality to log activity for a day
                // For demo purposes, we'll just cycle through levels
                const newLevel = (activityLevel + 1) % 5;
                updateActivityLevel(year, month, day, newLevel);
                regenerateHeatmap();
            });
        }
        
        // Update stats
        activeDaysElement.textContent = activeDays;
        streakElement.textContent = maxStreak;
    }
    
    // Function to get activity level from data
    function getActivityLevel(year, month, day) {
        if (sampleData[year] && 
            sampleData[year][month] && 
            sampleData[year][month][day] !== undefined) {
            return sampleData[year][month][day];
        }
        return 0;
    }
    
    // Function to update activity level in data
    function updateActivityLevel(year, month, day, level) {
        // Initialize objects if they don't exist
        if (!sampleData[year]) sampleData[year] = {};
        if (!sampleData[year][month]) sampleData[year][month] = {};
        
        // Set the value
        sampleData[year][month][day] = level;
    }
    
    // Function to regenerate current heatmap
    function regenerateHeatmap() {
        const month = parseInt(monthSelect.value);
        const year = currentDate.getFullYear();
        
        // Fade out
        heatmapGrid.classList.add('fade');
        
        // Wait for fade out animation to complete
        setTimeout(() => {
            // Generate new heatmap
            generateHeatmap(year, month);
            
            // Fade in
            heatmapGrid.classList.remove('fade');
        }, 300);
    }
    
    // Helper function to get month name
    function getMonthName(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month];
    }
    
    // Helper function to get level class suffix
    function getLevelClass(level) {
        const suffixes = ['k9l0m', 'q3r4s', 't5u6v', 'w7x8y', 'z9a0b'];
        return suffixes[level] || suffixes[0];
    }
    
    // Helper function to get description for activity level
    function getLevelDescription(level) {
        const descriptions = [
            'No activity',
            'Low activity',
            'Medium activity',
            'High activity',
            'Intense activity'
        ];
        return descriptions[level] || descriptions[0];
    }
    
    // Function to generate sample data
    function generateSampleData() {
        const data = {};
        const currentYear = currentDate.getFullYear();
        
        // Create data structure
        data[currentYear] = {};
        
        // Fill with random data for the whole year
        for (let month = 0; month < 12; month++) {
            data[currentYear][month] = {};
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                // Create patterns instead of completely random data
                if (day % 7 === 0) {
                    // Sundays are often high activity
                    data[currentYear][month][day] = Math.floor(Math.random() * 2) + 3; // 3-4
                } else if (day % 7 === 6) {
                    // Saturdays are medium to high
                    data[currentYear][month][day] = Math.floor(Math.random() * 2) + 2; // 2-3
                } else if (day % 3 === 0) {
                    // Every third day has some activity
                    data[currentYear][month][day] = Math.floor(Math.random() * 3) + 1; // 1-3
                } else {
                    // Other days are random
                    data[currentYear][month][day] = Math.floor(Math.random() * 5); // 0-4
                }
            }
        }
        
        // Create a streak pattern in the current month
        const currentMonth = currentDate.getMonth();
        let streakStart = Math.floor(Math.random() * 15) + 1; // Start streak between day 1-15
        let streakLength = Math.floor(Math.random() * 7) + 5; // Streak length 5-11 days
        
        for (let i = 0; i < streakLength; i++) {
            const day = streakStart + i;
            if (day <= new Date(currentYear, currentMonth + 1, 0).getDate()) {
                data[currentYear][currentMonth][day] = Math.floor(Math.random() * 2) + 3; // 3-4
            }
        }
        
        return data;
    }
});