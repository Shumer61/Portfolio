// ── MENU TOGGLE ──
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ── HEADER SCROLL + BACK TO TOP ──
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if(window.scrollY > 50){
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if(window.scrollY > 500){
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ── TYPING EFFECT ──
const phrases = [
    "Full Stack Developer",
    "IT Consultant",
    "Problem Solver",
    "Based in Nairobi 🇰🇪"
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let isPausing = false;

function type() {
    const current = phrases[phraseIndex];
    const typedText = document.getElementById('typed-text');

    if(isPausing){
        isPausing = false;
        setTimeout(type, 1500);
        return;
    }

    if(isDeleting){
        typedText.textContent = current.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typedText.textContent = current.substring(0, letterIndex + 1);
        letterIndex++;
    }

    if(!isDeleting && letterIndex === current.length){
        isPausing = true;
        isDeleting = true;
        setTimeout(type, 1800);
        return;
    }

    if(isDeleting && letterIndex === 0){
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
        return;
    }

    const speed = isDeleting ? 60 : 110;
    setTimeout(type, speed);
}

type();

// ── SCROLL REVEAL ──
const revealCards = document.querySelectorAll('.grid-card, .project-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting){
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

revealCards.forEach(card => observer.observe(card));

// ── CONTACT FORM ──
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.getElementById('form-success');

if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('submit-btn');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if(response.ok){
                contactForm.reset();
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            } else {
                btn.textContent = 'Send Message';
                btn.disabled = false;
                alert('Something went wrong. Please try again.');
            }
        } catch(error) {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            alert('Something went wrong. Please try again.');
        }
    });
}
// ── CODE PEEK ──
const peekPanel = document.getElementById('peekPanel');
const peekOverlay = document.getElementById('peekOverlay');
const peekClose = document.getElementById('peekClose');
const peekTitle = document.getElementById('peekTitle');
const peekDescription = document.getElementById('peekDescription');
const peekCode = document.getElementById('peekCode');

const peekContent = {
    about: {
        title: 'Hero Section',
        description: 'The hero uses CSS Flexbox to centre content horizontally and vertically. The typing effect cycles through phrases using a recursive setTimeout function — each call shows one more letter then schedules the next call, creating the illusion of typing.',
        code: `.about{
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Entrance animation */
@keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}

.about img{
    animation: fadeSlideUp 0.8s ease forwards;
}

.info-box{
    animation: fadeSlideUp 0.8s ease 0.2s forwards;
    opacity: 0;
}`
    },
    experience: {
        title: 'Experience Section',
        description: 'Cards use IntersectionObserver to detect when they enter the viewport. Each card starts invisible and shifted down 40px. When the observer fires, the visible class is added — triggering a CSS transition that fades and lifts each card into position with a staggered delay.',
        code: `const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting){
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

revealCards.forEach(card => observer.observe(card));`
    },
    projects: {
        title: 'Projects Section',
        description: 'Project cards use the same IntersectionObserver pattern as the experience cards. The grid uses CSS auto-fill to flow cards automatically based on screen width — no media queries needed for the column count.',
        code: `.project-grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card{
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.project-card.visible{
    opacity: 1;
    transform: translateY(0);
}`
    },
    'expense-tracker': {
    title: 'Expense Tracker',
    description: 'All expense routes are protected by JWT middleware. Every query filters by the logged-in user ID so data is fully isolated per user. The frontend is built in React with JWT tokens stored in localStorage for session persistence.',
    code: `router.get('/', protect, async (req, res) => {\n    const expenses = await Expense.find({ user: req.userId });\n    res.json(expenses);\n});`
},
'smartseason': {
    title: 'SmartSeason',
    description: 'Role-based access is handled by two separate middleware functions. protect verifies the JWT and attaches the full user to the request. adminOnly then checks the role. Field queries filter by assignedTo for agents so data isolation happens at the database level not just the UI.',
    code: `// two layers of access control
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
}

const adminOnly = (req, res, next) => {
    if(req.user.role !== 'admin') 
        return res.status(403).json({ message: 'Admin access required' })
    next()
}`
},

    contact: {
        title: 'Contact Form',
        description: 'The form intercepts the default submit behaviour using e.preventDefault(). It then sends the data to Formspree in the background using the fetch API with async/await. If the response is successful the form hides and a success message appears — the user never leaves the portfolio.',
        code: `contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if(response.ok){
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
    }
});`
    }
};

function openPeek(section){
    const content = peekContent[section];
    peekTitle.textContent = content.title;
    peekDescription.textContent = content.description;
    peekCode.textContent = content.code;
    peekPanel.classList.add('active');
    peekOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePeek(){
    peekPanel.classList.remove('active');
    peekOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.peek-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        openPeek(section);
    });
});

peekClose.addEventListener('click', closePeek);
peekOverlay.addEventListener('click', closePeek);

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closePeek();
});