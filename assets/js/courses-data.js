const COURSES_DATA = {
    'cyber-security': {
        title: 'Cyber Security Masterclass',
        icon: '⚔️',
        description: 'From foundation to advanced Red Teaming and SOC operations. Choose the path that fits your career goals in the security domain.',
        duration: '9/12/18 Months',
        level: 'Foundation to Professional',
        certification: 'Master Cyber Security Specialist',
        packages: [
            {
                id: 'foundation-9m',
                label: '9 Months (Foundation)',
                title: 'Advanced Offensive Security Foundation',
                duration: '9 Months',
                level: 'Foundation to Intermediate',
                certification: 'Offensive Security Certified Specialist',
                description: 'Take your first step into offensive security. Gain hands-on experience in analyzing security risks and identifying system weaknesses.',
                phases: [
                    { title: 'Module 1: Networking & Infrastructure', modules: ['OSI & TCP/IP Models', 'Common Protocols (TCP, UDP, DNS, ARP)', 'Packet Analysis with Wireshark', 'Network Troubleshooting'] },
                    { title: 'Module 2: Operating System Fundamentals', modules: ['Windows & Linux Architecture', 'Permissions & Process Management', 'Active Directory Basics', 'Authentication Concepts'] },
                    { title: 'Module 3: Reconnaissance & Enumeration', modules: ['OSINT Techniques', 'Network Scanning with Nmap', 'Service Enumeration', 'Information Gathering'] },
                    { title: 'Module 4: Web Application Security', modules: ['HTTP/HTTPS Fundamentals', 'SQL Injection & XSS Basics', 'File Inclusion (LFI/RFI)', 'API Security Concepts'] },
                    { title: 'Module 5: Exploitation & PrivEsc', modules: ['Password Attacks', 'Linux & Windows Privilege Escalation', 'Post-exploitation Concepts', 'Maintaining Access'] },
                    { title: 'Module 6: Security Methodology', modules: ['Penetration Testing Methodology', 'Vulnerability vs Exploit', 'Evidence Collection', 'Professional Reporting'] }
                ],
                tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Nikto', 'Burp Suite', 'Nmap'],
                projects: ['Web Vulnerability Discovery', 'Privilege Escalation Lab', 'Security Audit Report']
            },
            {
                id: 'pentester-12m',
                label: '12 Months (Pentester)',
                title: 'Advanced Penetration Tester',
                duration: '12 Months',
                level: 'Advanced',
                certification: 'Professional Penetration Tester (CPPT)',
                description: 'An elite program designed to build professional penetration testers. Master advanced network exploitation and Active Directory security.',
                phases: [
                    { title: 'Module 1: Advanced Scanning', modules: ['Advanced Nmap Techniques', 'SMB & SNMP Enumeration', 'Subdomain Discovery', 'Directory Brute-forcing'] },
                    { title: 'Module 2: Active Directory Attacks', modules: ['AD Structure & Components', 'Domain Group Policies', 'AD Enumeration Tools', 'Common AD Misconfigurations'] },
                    { title: 'Module 3: Intermediate Web Security', modules: ['OWASP Top 10 Deep Dive', 'Advanced SQLi Concepts', 'Session Vulnerabilities', 'File Upload Attacks', 'CSRF'] },
                    { title: 'Module 4: Exploitation Frameworks', modules: ['Metasploit Framework Deep Dive', 'Custom Payloads', 'Reverse Shell Mastery', 'Post-Exploitation Automation'] },
                    { title: 'Module 5: Scripting & Automation', modules: ['Bash Scripting for Testers', 'Python for Security Automation', 'Creating Custom Scanning Tools'] }
                ],
                tools: ['Metasploit', 'Burp Suite Pro', 'PowerView', 'BloodHound', 'Responder', 'Python', 'Impacket'],
                projects: ['Active Directory Lab Exploitation', 'Automated Recon Tool Development', 'Enterprise Pentest Simulation']
            },
            {
                id: 'specialist-18m',
                label: '18 Months (Specialist)',
                title: 'Cyber Security Specialist (Red + SOC)',
                duration: '18 Months',
                level: 'Professional',
                certification: 'Master Cyber Security Specialist (Red + SOC)',
                description: 'The ultimate masterclass combining Red Teaming (Offensive) and SOC Operations (Defensive) for 360-degree expertise.',
                phases: [
                    { title: 'Module 1: Red Team Concepts', modules: ['Red vs Blue vs Purple Teams', 'Attack Lifecycle (Lockheed Martin)', 'Advanced Lateral Movement', 'PrivEsc Review'] },
                    { title: 'Module 2: Advanced Web Security', modules: ['Logic Flow Vulnerabilities', 'API Security Testing', 'Authentication Bypass', 'Advanced Vulnerability Research'] },
                    { title: 'Module 3: SOC Operations', modules: ['SOC Roles & Responsibilities', 'Security Monitoring at Scale', 'Log Collection & Management'] },
                    { title: 'Module 4: SIEM Platforms', modules: ['Splunk & Elastic Stack (ELK)', 'Log Ingestion & Dashboards', 'Alert Monitoring', 'Detection Rule Creation'] },
                    { title: 'Module 5: Incident Response', modules: ['Threat Hunting Basics', 'Behavioral Detection', 'Endpoint Detection (EDR)', 'IR Lifecycle'] },
                    { title: 'Module 6: Simulation Labs', modules: ['Red vs Blue Simulations', 'Advanced Threat Hunting', 'Enterprise Incident Investigation'] }
                ],
                tools: ['Splunk', 'Elastic Stack', 'Cynet', 'Metasploit', 'Burp Suite', 'Kali Linux', 'EDR Tools', 'Snort'],
                projects: ['Securing Cloud Infrastructure', 'Automated Threat Detection Rules', 'Red vs Blue Team Simulation', 'Cryptanalysis & Hash Analysis']
            }
        ]
    },
    'offensive-security-foundation': {
        title: 'Advanced Offensive Security Foundation',
        icon: '🛡️',
        description: 'Take your first step into offensive security with this 9-month masterclass. Gain hands-on experience in analyzing security risks, identifying system weaknesses, and applying modern techniques to protect digital environments.',
        duration: '9 Months',
        level: 'Foundation to Intermediate',
        certification: 'Offensive Security Certified Specialist',
        objectives: [
            'Understand the foundations of cyber security and ethical hacking',
            'Learn professional methodology for security testing',
            'Master web application reconnaissance and vulnerability discovery',
            'Build strong practical knowledge and problem-solving skills'
        ],
        phases: [
            {
                title: 'Module 1: Networking & Infrastructure Fundamentals',
                modules: [
                    'OSI Model and TCP/IP Model',
                    'Understanding TCP, UDP, and common protocols',
                    'IPv4 addressing and subnetting basics',
                    'DNS, DHCP, ARP and their role in networks',
                    'Introduction to packet capture and network analysis',
                    'Basic network troubleshooting techniques',
                    'Packet analysis using Wireshark'
                ]
            },
            {
                title: 'Module 2: Operating System Fundamentals',
                modules: [
                    'Windows operating system architecture basics',
                    'Windows users, permissions and services',
                    'Introduction to Linux file system and permissions',
                    'Linux users, groups and process management',
                    'Introduction to Active Directory',
                    'Authentication concepts such as NTLM and Kerberos'
                ]
            },
            {
                title: 'Module 3: Reconnaissance & Enumeration',
                modules: [
                    'Introduction to OSINT (Open Source Intelligence)',
                    'Information gathering techniques',
                    'Network scanning fundamentals',
                    'Port scanning using Nmap',
                    'Service enumeration basics',
                    'Banner grabbing techniques'
                ]
            },
            {
                title: 'Module 4: Web Application Security',
                modules: [
                    'Understanding how the web works (HTTP/HTTPS)',
                    'Introduction to common web vulnerabilities',
                    'SQL Injection basics',
                    'Cross-Site Scripting (XSS) basics',
                    'File Inclusion vulnerabilities (LFI/RFI)',
                    'Introduction to API security concepts',
                    'Web testing using Burp Suite'
                ]
            },
            {
                title: 'Module 5: Exploitation & Privilege Escalation',
                modules: [
                    'Password attacks (dictionary and brute force concepts)',
                    'Introduction to Linux privilege escalation',
                    'Introduction to Windows privilege escalation',
                    'Post-exploitation concepts',
                    'Maintaining access concepts'
                ]
            },
            {
                title: 'Module 6: Security Testing Methodology',
                modules: [
                    'Introduction to penetration testing methodology',
                    'Vulnerability vs exploit understanding',
                    'Documentation and evidence collection',
                    'Writing a basic penetration testing report'
                ]
            }
        ],
        tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Nikto', 'Burp Suite', 'OWASP ZAP', 'Nmap'],
        projects: ['Web Application Vulnerability Discovery', 'Local Privilege Escalation Lab', 'Comprehensive Security Audit Report']
    },
    'advanced-penetration-tester': {
        title: 'Advanced Penetration Tester',
        icon: '🎯',
        description: 'An elite 12-month program designed to build professional penetration testers. Master advanced network exploitation, Active Directory security, and automated scanning using custom scripts.',
        duration: '12 Months',
        level: 'Advanced',
        certification: 'Professional Penetration Tester (CPPT)',
        objectives: [
            'Master advanced network scanning and enumeration techniques',
            'Deep dive into Active Directory exploitation and security',
            'Learn to automate security tasks with Bash and Python',
            'Develop professional penetration testing reports and evidence'
        ],
        phases: [
            {
                title: 'Module 1: Advanced Network Scanning & Enumeration',
                modules: [
                    'Advanced Nmap scanning techniques',
                    'SMB enumeration',
                    'SNMP enumeration',
                    'Web server enumeration',
                    'Directory and subdomain discovery'
                ]
            },
            {
                title: 'Module 2: Active Directory Basics for Attackers',
                modules: [
                    'Active Directory structure and components',
                    'Domain users, groups and policies',
                    'Introduction to AD enumeration tools',
                    'Understanding common AD misconfigurations'
                ]
            },
            {
                title: 'Module 3: Web Application Security (Intermediate)',
                modules: [
                    'OWASP Top 10 overview',
                    'Advanced SQL injection concepts',
                    'Authentication and session vulnerabilities',
                    'File upload vulnerabilities',
                    'Cross-site request forgery (CSRF)'
                ]
            },
            {
                title: 'Module 4: Exploitation Tools & Frameworks',
                modules: [
                    'Introduction to Metasploit Framework',
                    'Exploits and payloads',
                    'Reverse shell concepts',
                    'Post exploitation basics'
                ]
            },
            {
                title: 'Module 5: Scripting & Automation',
                modules: [
                    'Introduction to Bash scripting',
                    'Introduction to Python for security',
                    'Automating basic security tasks',
                    'Creating simple scanning scripts'
                ]
            }
        ],
        tools: ['Kali Linux', 'Metasploit', 'Burp Suite Professional', 'PowerView', 'BloodHound', 'Responder', 'Python', 'Impacket'],
        projects: ['Active Directory Lab Exploitation', 'Automated Reconnaissance Tool Development', 'Enterprise Network Penetration Test']
    },
    'cyber-security-specialist-red-soc': {
        title: 'Advanced Cyber Security Specialist (Red + SOC)',
        icon: '⚔️',
        description: 'The ultimate 18-month masterclass combining Red Teaming (Offensive) and SOC Operations (Defensive). Gain 360-degree security expertise to protect enterprise ecosystems.',
        duration: '18 Months',
        level: 'Professional (All-Rounder)',
        certification: 'Master Cyber Security Specialist (Red + SOC)',
        objectives: [
            'Gain expertise in Red Team concepts and attack lifecycles',
            'Master SIEM platforms and security monitoring at scale',
            'Learn incident response and behavioral threat hunting',
            'Build practical skills through enterprise-grade simulation labs'
        ],
        phases: [
            {
                title: 'Module 1: Red Team Concepts',
                modules: ['Red Team vs Blue Team vs Purple Team', 'Attack lifecycle overview', 'Lateral movement concepts', 'Privilege escalation review']
            },
            {
                title: 'Module 2: Advanced Web Security',
                modules: ['Advanced vulnerability discovery', 'API security testing', 'Authentication bypass concepts', 'Logic flows in web applications']
            },
            {
                title: 'Module 3: SOC Fundamentals',
                modules: ['What is a SOC', 'SOC roles and responsibilities', 'Security monitoring basics', 'Log collection and analysis']
            },
            {
                title: 'Module 4: SIEM Platforms',
                modules: ['Splunk', 'Elastic Stack', 'Log ingestion', 'Alert monitoring', 'Basic detection rules']
            },
            {
                title: 'Module 5: Incident Response',
                modules: ['Introduction to threat hunting', 'Behavioral detection concepts', 'Endpoint detection basics', 'Red vs Blue team simulation labs']
            },
            {
                title: 'Module 6: Threat Detection & Hunting',
                modules: ['Introduction to threat hunting', 'Behavioral detection concepts', 'Endpoint detection basics', 'Red vs Blue team simulation labs']
            }
        ],
        tools: ['Splunk', 'Elastic Stack (ELK)', 'Snort', 'Wireshark', 'Cynet', 'Metasploit', 'Burp Suite', 'Kali Linux', 'Endpoint Detection Tools', 'Spy Sweeper', 'Nikto'],
        projects: ['Securing Web Applications on Cloud Platforms', 'Network Mapping for Office Infrastructure', 'Automated Threat Detection Rules', 'Red vs Blue Team Simulation', 'Security Incident Investigation', 'Cryptanalysis password cracking and hash analysis']
    },
    'data-analytics-science': {
        title: 'Data Analytics & Science',
        icon: '📊',
        description: 'Start with Data Analytics and upgrade to Data Science. Master raw data manipulation and predictive ML models using Python and R.',
        duration: '2/4/6/8 Months',
        level: 'Intermediate/Professional',
        certification: 'Industry Recognized Certificate',
        packages: [
            {
                id: 'basic-2m',
                label: '2 Months (Basic)',
                title: 'Data Analytics — Basic Program',
                duration: '2 Months',
                level: 'Beginner',
                certification: 'Basic Analytics Certification',
                description: 'Master the fundamentals of data manipulation and visualization to jumpstart your analytics journey.',
                phases: [
                    { title: 'Module 1: Organize & Analyze Data', modules: ['Use formulas and tools to manage data effectively (Spreadsheets)', 'Interpreting data patterns', 'Data entry & cleaning basics'] },
                    { title: 'Module 2: Visualize Insights', modules: ['Create interactive dashboards', 'Business reporting from raw data', 'Visual storytelling basics'] },
                    { title: 'Module 3: Manage Data Efficiently', modules: ['Store and retrieve data with SQL', 'Structured data manipulation', 'Powerful database queries'] },
                    { title: 'Module 4: Analyze with Intelligence', modules: ['Data analysis with Python', 'Automation of repetitive tasks', 'Real-world problem solving'] },
                    { title: 'Module 5: Practical Analytics Project', modules: ['Hands-on analytics experience', 'Portfolio building', 'Capstone presentation'] }
                ],
                tools: ['Spreadsheets', 'SQL', 'Python', 'Power BI / Tableau'],
                projects: ['Personal Finance Dashboard', 'Retail Sales Analysis']
            },
            {
                id: 'professional-4m',
                label: '4 Months (Professional)',
                title: 'Data Analytics — Professional Program',
                duration: '4 Months',
                level: 'Intermediate',
                certification: 'Professional Analytics Certification',
                description: 'A comprehensive mid-level program focused on advanced statistical visuals and data processing techniques.',
                phases: [
                    { title: 'Module 1: Build Real Projects', modules: ['Apply concepts to hands-on projects', 'Build a practical experience portfolio', 'Strengthen your analytics profile'] },
                    { title: 'Module 2: Seaborn: Design Insightful Visuals', modules: ['Advanced statistical visualizations', 'Building attractive data stories', 'Customizing plot aesthetics'] },
                    { title: 'Module 3: Power Numerical Computing (NumPy)', modules: ['Fast mathematical operations', 'Array-based operations', 'Data processing efficiency'] },
                    { title: 'Module 4: Handle Data Smartly (Pandas)', modules: ['Clean and transform datasets', 'Analyze structured data efficiently', 'Handling missing information'] },
                    { title: 'Module 5: Matplotlib: Visualize Clearly', modules: ['Create charts and graphs', 'Fine-tuning visual insights', 'Representing data trends'] },
                    { title: 'Module 6: SQL: Power Your Data', modules: ['Query databases for real-world applications', 'Complex joins and aggregations', 'Database architecture basics'] },
                    { title: 'Module 7: Career Readiness', modules: ['Resume Building & ATS Optimization', 'LinkedIn & Naukri Profile Growth', 'Mock Interviews for Job Readiness'] },
                    { title: 'Module 8: Visualize Insights (BI Tools)', modules: ['Interactive dashboards in Power BI/Tableau', 'Business reports from raw data', 'Actionable intelligence reporting'] }
                ],
                tools: ['Python', 'SQL', 'NumPy', 'Pandas', 'Seaborn', 'Matplotlib', 'Tableau / Power BI'],
                projects: ['Customer Segmentation Analysis', 'Inventory Management System', 'Marketing Campaign Tracker']
            },
            {
                id: 'industrial-8m',
                label: '8 Months (Industrial)',
                title: 'Data Analytics — Industrial Program',
                duration: '8 Months',
                level: 'Advanced',
                certification: 'Industrial Data Analytics Specialist',
                description: 'The ultimate industrial-grade masterclass designed to produce top-tier data engineers and analysts. Includes cloud deployment and placement suite.',
                phases: [
                    { title: 'Module 1: LEARN. ANALYZE. DELIVER.', modules: ['Work on 2+ Real Projects', '1 Industry-Grade Project with real datasets', 'End-to-end data pipeline construction'] },
                    { title: 'Module 2: Power the Cloud (Azure)', modules: ['Deploy and manage applications', 'Microsoft Azure cloud services', 'Scaling data solutions in the cloud'] },
                    { title: 'Module 3: Transform & Visualize (Seaborn)', modules: ['Insightful statistical visualizations', 'Using TL libraries for data stories', 'Advanced Pandas integration'] },
                    { title: 'Module 4: Analyze & Visualize (Matplotlib)', modules: ['Process large datasets', 'Create meaningful visual insights', 'Visualizing complex relationships'] },
                    { title: 'Module 5: Compute with NumPy', modules: ['Fast numerical and array-based operations', 'Optimization for data analysis', 'Scientific computing fundamentals'] },
                    { title: 'Module 6: Analyze with Intelligence (Python)', modules: ['Automation and real-world problem-solving', 'Advanced data analysis techniques', 'Scripting for data engineering'] },
                    { title: 'Module 7: Manage Data Efficiently (SQL)', modules: ['Store, retrieve and manipulate structured data', 'Advanced database queries', 'Optimization for large scale data'] },
                    { title: 'Module 8: Understand the Numbers', modules: ['Statistical concepts for analysis', 'Making informed business decisions', 'Probability and hypothesis testing'] },
                    { title: 'Module 9: Visualize Business Insights (BI Tools)', modules: ['Interactive dashboards from actionable reports', 'Advanced Tableau/Power BI features', 'Executive-level reporting'] },
                    { title: 'Module 10: Career Excellence (Placement Suite)', modules: ['Professional Resume Building', 'Expert Mentorship Sessions', 'LinkedIn & Naukri Profile Optimization', 'Mock Interviews & Placement Support'] }
                ],
                tools: ['Azure Cloud', 'Python', 'SQL', 'NumPy', 'Pandas', 'Seaborn', 'Matplotlib', 'Tableau / Power BI', 'Expert Sessions'],
                projects: ['Global Market Analysis Pipeline', 'Cloud-Based Predictive Dashboard', 'Industrial Supply Chain Optimizer']
            }
        ]
    },
    'app-development': {
        title: 'App Development',
        icon: '📱',
        description: 'Build native and cross-platform mobile apps for iOS and Android using Flutter, Dart, and Firebase for scalable backends.',
        duration: '6 Months',
        level: 'All Levels',
        certification: 'Mobile Dev Certification',
        phases: [
            {
                title: 'Phase 1: Dart & Flutter Foundation',
                modules: ['Dart Programming Language', 'Flutter Architecture & Widgets', 'UI/UX Design for Mobile', 'State Management (Provider/Bloc)', 'Navigation & Routing', 'Local Data Storage']
            },
            {
                title: 'Phase 2: Advanced Features & Firebase',
                modules: ['Firebase Authentication', 'Cloud Firestore & Real-time DB', 'Push Notifications', 'API Integration (REST/GraphQL)', 'Camera & Location Services', 'Native Integration']
            },
            {
                title: 'Phase 3: Publishing & Industry Standards',
                modules: ['App Performance Optimization', 'Publishing to App Store/Play Store', 'Unit & Integration Testing', 'CI/CD for Mobile', 'Monetization Strategies', 'Live Portfolio App']
            }
        ]
    },
    'programming-java-python': {
        title: 'Programming (Java/Python)',
        icon: '☕',
        description: 'Master core and advanced programming concepts in Java or Python for enterprise applications and complex logic building.',
        duration: '5 Months',
        level: 'Beginner',
        certification: 'Language Expert Certificate',
        phases: [
            {
                title: 'Phase 1: Programming Fundamentals',
                modules: ['Logic Building & Algorithms', 'Data Types & Variables', 'Control Flow & Loops', 'Functions & Error Handling', 'Object Oriented Programming (OOP)', 'Data Structures (Arrays, Lists)']
            },
            {
                title: 'Phase 2: Advanced Language Concepts',
                modules: ['Multithreading & Concurrency', 'Exception Handling', 'IO Streams & Serialization', 'Generics & Collections', 'Database Connectivity (JDBC/SQLAlchemy)', 'Design Patterns']
            },
            {
                title: 'Phase 3: Frameworks & Real Projects',
                modules: ['Java Spring Boot / Python Django', 'RESTful API Development', 'Unit Testing (JUnit/PyTest)', 'Git & Version Control', 'Software Development Life Cycle', 'Final Desktop/Web Application']
            }
        ]
    },
    'ai-machine-learning': {
        title: 'AI & Machine Learning',
        icon: '🤖',
        description: 'Master the intelligence era. Start with core ML algorithms and advance to deep neural networks and Generative AI.',
        duration: '8/10/12 Months',
        level: 'Advanced',
        certification: 'AI Specialist Certification',
        phases: [
            {
                title: 'Phase 1: Mathematics & ML Basics',
                modules: ['Linear Algebra & Calculus', 'Statistical Modeling', 'Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning Basics', 'Feature Engineering']
            },
            {
                title: 'Phase 2: Deep Learning & Vision',
                modules: ['Neural Network Architectures', 'CNN for Image Processing', 'TensorFlow & PyTorch Basics', 'Object Detection & Tracking', 'Generative Adversarial Networks', 'Optimization Techniques']
            },
            {
                title: 'Phase 3: NLP & Generative AI',
                modules: ['Natural Language Processing (NLP)', 'Transformers & BERT', 'Large Language Models (LLMs)', 'Stable Diffusion & Midjourney Tech', 'AI Model Deployment', 'Industrial AI Project']
            }
        ]
    },
    'ai-python': {
        title: 'AI & Python',
        icon: '🐍',
        description: 'Master AI, Computer Vision, and NLP. Build production-grade AI systems from scratch using Python.',
        duration: '6 Months',
        level: 'Intermediate',
        certification: 'AI Developer Certification',
        phases: [
            {
                title: 'Phase 1: Core Python for AI',
                modules: ['Advanced Python Concepts', 'Data Structures for AI', 'Numpy & Pandas Mastery', 'Data Visualization', 'Efficient Coding Practices', 'Environment Setup']
            },
            {
                title: 'Phase 2: Machine Learning Applied',
                modules: ['Scikit-Learn Deep Dive', 'Regression & Classification', 'Clustering & Association', 'Dimensionality Reduction', 'Model Evaluation & Tuning', 'Kaggle Competition Practice']
            },
            {
                title: 'Phase 3: Deep Learning & Deployment',
                modules: ['Deep Learning with Keras', 'RNN & LSTM for Sequences', 'Model Quantization', 'FastAPI for AI Models', 'Docker for AI Apps', 'End-to-end AI Product']
            }
        ]
    },
    'digital-marketing': {
        title: 'Digital Marketing',
        icon: '📢',
        description: 'Master SEO, SEM, Social Media, and strategy to build high-converting online marketing campaigns.',
        duration: '3 Months',
        level: 'Beginner',
        certification: 'Marketing Professional Certificate',
        phases: [
            {
                title: 'Phase 1: SEO & Content Marketing',
                modules: ['On-Page SEO Optimization', 'Off-Page SEO & Backlinking', 'Keyword Research Strategies', 'Content Strategy & Writing', 'Google Search Console', 'Site Audit Techniques']
            },
            {
                title: 'Phase 2: Paid Ads & Social Media',
                modules: ['Google Ads (PPC/Display)', 'Facebook & Instagram Ads', 'LinkedIn Marketing', 'YouTube Marketing', 'Conversion Rate Optimization', 'Landing Page Design']
            },
            {
                title: 'Phase 3: Analytics & Strategy',
                modules: ['Google Analytics 4 (GA4)', 'Email Marketing Automation', 'ORM (Online Reputation)', 'Marketing Budget Planning', 'ROI Calculation', 'Digital Marketing Capstone']
            }
        ]
    },
    'full-stack-development': {
        title: 'Full Stack Development',
        icon: '🌐',
        description: 'Master end-to-end development. Choose from specialized paths: MERN, Java, or Python Full Stack with modern frameworks.',
        duration: '3-9 Months',
        level: 'Beginner to Professional',
        certification: 'Full Stack Excellence Certification',
        phases: [
            {
                title: 'Phase 1: Frontend Ecosystem',
                modules: ['HTML5 & Semantic Web', 'Advanced CSS3 & Animations', 'JavaScript Mastery (ES6+)', 'Tailwind CSS & Responsive Layouts', 'React.js Core Concepts', 'State Management & API Integration']
            },
            {
                title: 'Phase 2: Backend Architecture',
                modules: ['Node.js & Express / Django / Spring', 'RESTful API Design', 'Database Modeling (SQL & NoSQL)', 'Authentication & JWT', 'Server-side Logic & Security', 'Cloud Database Management']
            },
            {
                title: 'Phase 3: Deployment & DevOps',
                modules: ['Git & Collaborative Workflow', 'Docker Containerization', 'CI/CD Pipelines', 'Cloud Deployment (AWS/Vercel/Heroku)', 'Performance Optimization', 'Portfolio Production Project']
            }
        ]
    }
};
