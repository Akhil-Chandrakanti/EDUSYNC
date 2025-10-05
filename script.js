document.addEventListener('DOMContentLoaded', () => {

    const appContainer = document.getElementById('app-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const loginButtons = document.querySelectorAll('.login-btn');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const userTypeSelect = document.getElementById('userType');
    const studentFields = document.querySelector('.student-fields');
    const teacherFields = document.querySelector('.teacher-fields');
    const messageModal = document.getElementById('messageModal');
    const messageText = document.getElementById('messageText');
    const messageOkBtn = document.getElementById('messageOkBtn');

    // --- Dummy Data (Simulating a database) ---
    const users = {
        students: [
            { id: 'S101', password: 'password123', name: 'Alice', assignments: [
                { id: 'A001', title: 'Math Homework', status: 'Submitted', grade: null },
                { id: 'A002', title: 'History Essay', status: 'Graded', grade: 95 },
            ]},
            { id: 'S102', password: 'password123', name: 'Bob', assignments: [
                { id: 'A003', title: 'Math Homework', status: 'Not Submitted', grade: null },
                { id: 'A004', title: 'History Essay', status: 'Graded', grade: 88 },
            ]},
        ],
        teachers: [
            { id: 'T201', password: 'teacherpass', name: 'Mr. Smith', students: ['S101', 'S102'] },
        ]
    };

    // --- Main Content Rendering ---
    function renderHomePage() {
        appContainer.innerHTML = `
            <section id="hero">
                <div class="container">
                    <h1>Streamline Your Academic Life with EDUSYNC</h1>
                    <p class="subtitle">A centralized platform that simplifies academic tasks, improves teacher-student interaction, and enables transparent performance tracking.</p>
                    <a href="#" class="btn primary-btn login-btn">Get Started</a>
                </div>
            </section>

            <section id="highlights">
                <div class="container">
                    <h2>Key Highlights</h2>
                    <div class="highlight-grid">
                        <div class="highlight-card">
                            <h3><i class="fas fa-desktop"></i> Centralized Platform</h3>
                            <p>One place to manage academic tasks, assignments, and resources.</p>
                        </div>
                        <div class="highlight-card">
                            <h3><i class="fas fa-comments"></i> Improved Interaction</h3>
                            <p>Enhances communication and collaboration through structured tools.</p>
                        </div>
                        <div class="highlight-card">
                            <h3><i class="fas fa-chart-line"></i> Transparent Tracking</h3>
                            <p>Provides clear insights into student progress, grades, and feedback.</p>
                        </div>
                        <div class="highlight-card">
                            <h3><i class="fas fa-clock"></i> Efficiency & Accuracy</h3>
                            <p>Saves time, reduces manual errors, and supports a smooth workflow.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features">
                <div class="container">
                    <h2>Features</h2>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <i class="fas fa-chalkboard-teacher"></i>
                            <h3>Course Management</h3>
                            <p>Add, update, and track courses effortlessly, keeping everything organized.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-cogs"></i>
                            <h3>Teacher Dashboards</h3>
                            <p>Get performance insights and manage your classes with ease.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-user-graduate"></i>
                            <h3>Student Progress</h3>
                            <p>Students can track their own performance and stay on top of their goals.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-clipboard-check"></i>
                            <h3>Assignment Submission</h3>
                            <p>A simple, seamless way to submit and grade assignments.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-chart-bar"></i>
                            <h3>Analytics & Reporting</h3>
                            <p>Transparent evaluation with powerful analytics and custom reports.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-bell"></i>
                            <h3>Notifications</h3>
                            <p>Never miss a deadline with real-time notifications and reminders.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="innovate">
                <div class="container">
                    <h2>Innovate & Create</h2>
                    <div class="innovate-content">
                        <div class="innovate-text">
                            <p>EDUSYNC isn't just a platform—it's a launchpad for your ideas. We provide tools to help you take ownership of your learning journey, from collaborative projects to personalized portfolios.</p>
                            <ul class="innovate-list">
                                <li><i class="fas fa-lightbulb"></i> Project-Based Learning Modules</li>
                                <li><i class="fas fa-users-cog"></i> Collaborative Workspaces</li>
                                <li><i class="fas fa-book-reader"></i> Personalized Learning Paths</li>
                                <li><i class="fas fa-cloud-upload-alt"></i> Digital Portfolio Creation</li>
                            </ul>
                        </div>
                        <div class="innovate-image">
                            <img src="https://source.unsplash.com/600x400/?student,innovation" alt="Students innovating together">
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials">
                <div class="container">
                    <h2>What Students Are Saying</h2>
                    <div class="testimonial-grid">
                        <div class="testimonial-card">
                            <p class="quote">"EDUSYNC has made managing my classes so much easier. The progress tracking feature keeps me motivated and on top of my game."</p>
                            <p class="author">- Jane Doe, University Student</p>
                        </div>
                        <div class="testimonial-card">
                            <p class="quote">"The collaboration tools are a game-changer! My group projects are so much more organized and efficient now."</p>
                            <p class="author">- John Smith, High School Student</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        // Reattach event listeners after content is rendered
        attachEventListeners();
    }

    function renderStudentDashboard(student) {
        appContainer.innerHTML = `
            <div class="dashboard-container">
                <h1>Welcome, ${student.name}!</h1>
                <h2>Your Assignments</h2>
                <div class="assignment-list">
                    ${student.assignments.map(assignment => `
                        <div class="assignment-card">
                            <h3>${assignment.title}</h3>
                            <p>Status: <strong>${assignment.status}</strong></p>
                            <p>Grade: <strong>${assignment.grade !== null ? assignment.grade : 'N/A'}</strong></p>
                            ${assignment.status !== 'Graded' ? `<button class="btn primary-btn submit-btn" data-assignment-id="${assignment.id}">Submit</button>` : ''}
                        </div>
                    `).join('')}
                </div>
                <button class="btn primary-btn" id="logoutBtn">Logout</button>
            </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.querySelectorAll('.submit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                showCustomMessage('Assignment submitted. This is a simulation.');
            });
        });
    }

    function renderTeacherDashboard(teacher) {
        appContainer.innerHTML = `
            <div class="dashboard-container">
                <h1>Welcome, ${teacher.name}!</h1>
                <h2>Student Assignments</h2>
                <div class="teacher-dashboard-list">
                    ${users.students.map(student => `
                        <div class="student-card">
                            <h3>${student.name} (${student.id})</h3>
                            <ul>
                                ${student.assignments.map(assignment => `
                                    <li>
                                        ${assignment.title} - Status: ${assignment.status} - Grade: ${assignment.grade !== null ? assignment.grade : 'N/A'}
                                        ${assignment.status === 'Submitted' ? `<button class="btn primary-btn grade-btn" data-student-id="${student.id}" data-assignment-id="${assignment.id}">Grade</button>` : ''}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                <button class="btn primary-btn" id="logoutBtn">Logout</button>
            </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.querySelectorAll('.grade-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const studentId = e.target.dataset.studentId;
                const assignmentId = e.target.dataset.assignmentId;
                showCustomMessage('The grading interface would open here. This is a simulation.');
            });
        });
    }

    // --- Custom Message Box ---
    function showCustomMessage(message) {
        messageText.textContent = message;
        messageModal.style.display = 'flex';
        messageOkBtn.focus();
    }

    function hideCustomMessage() {
        messageModal.style.display = 'none';
    }
    messageModal.addEventListener('click', (e) => {
        if (e.target.id === 'messageModal' || e.target.classList.contains('close-btn') || e.target.id === 'messageOkBtn') {
            hideCustomMessage();
        }
    });

    // --- Event Handlers ---
    function attachEventListeners() {
        // Attach event listeners for login buttons
        document.querySelectorAll('.login-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                loginModal.style.display = 'flex';
            });
        });
    }

    function handleLogout() {
        // A simple way to "logout" by reloading the page
        window.location.reload();
    }

    // --- Login Form Logic ---
    const closeLoginModal = () => loginModal.style.display = 'none';

    document.querySelectorAll('#loginModal .close-btn').forEach(btn => {
        btn.addEventListener('click', closeLoginModal);
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            closeLoginModal();
        }
    });

    userTypeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'student') {
            studentFields.style.display = 'block';
            teacherFields.style.display = 'none';
        } else {
            studentFields.style.display = 'none';
            teacherFields.style.display = 'block';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userType = userTypeSelect.value;
        const password = document.getElementById('password').value;
        let user;

        if (userType === 'student') {
            const studentId = document.getElementById('studentId').value;
            user = users.students.find(s => s.id === studentId && s.password === password);
            if (user) {
                closeLoginModal();
                renderStudentDashboard(user);
            } else {
                showCustomMessage('Invalid Student ID or password.');
            }
        } else if (userType === 'teacher') {
            const teacherId = document.getElementById('teacherId').value;
            user = users.teachers.find(t => t.id === teacherId && t.password === password);
            if (user) {
                closeLoginModal();
                renderTeacherDashboard(user);
            } else {
                showCustomMessage('Invalid Teacher ID or password.');
            }
        }
    });

    // Initial render of the home page
    renderHomePage();
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});