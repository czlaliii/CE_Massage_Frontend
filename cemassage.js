
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Köszönjük az üzeneted! Hamarosan felvesszük veled a kapcsolatot.');
            this.reset();
        });