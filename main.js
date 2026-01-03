// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load and display blog preview
function loadBlogPosts() {
    const blogPreview = document.getElementById('blogPreview');
    if (!blogPreview) return;

    const saved = localStorage.getItem('cemassage_posts');
    
    if (saved) {
        try {
            const posts = JSON.parse(saved);
            
            if (posts.length === 0) {
                showEmptyBlogPreview();
                return;
            }

            // Sort by date and get latest 3
            const latestPosts = posts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);

            blogPreview.innerHTML = latestPosts.map(post => `
                <a href="/pages/blog/post.html?slug=${post.slug}" class="blog-preview-card">
                    <div class="blog-preview-image">
                        ${post.image && post.image !== 'images/default-post.jpg'
                            ? `<img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy">`
                            : '<span>✨</span>'
                        }
                    </div>
                    <div class="blog-preview-content">
                        <div class="blog-preview-meta">
                            <span class="blog-preview-category">${escapeHtml(post.category)}</span>
                            <span>${formatDate(post.date)}</span>
                        </div>
                        <h3>${escapeHtml(post.title)}</h3>
                        <p class="blog-preview-excerpt">${escapeHtml(post.excerpt)}</p>
                    </div>
                </a>
            `).join('');

        } catch (e) {
            console.error('Error loading blog posts:', e);
            showEmptyBlogPreview();
        }
    } else {
        showEmptyBlogPreview();
    }
}

function showEmptyBlogPreview() {
    const blogPreview = document.getElementById('blogPreview');
    if (blogPreview) {
        blogPreview.innerHTML = `
            <div class="empty-blog-preview">
                <p>No blog posts yet. Check back soon!</p>
            </div>
        `;
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Contact form handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Here you would typically send to a backend
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and price cards
document.querySelectorAll('.service-card, .price-card, .info-card, .blog-preview-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Load blog posts on page load
loadBlogPosts();

console.log('CE Massage website loaded successfully');