// Footer links toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleLinksBtn = document.querySelector('.toggle-links');
    const linksList = document.querySelector('.links-list');
    
    if (toggleLinksBtn && linksList) {
        toggleLinksBtn.addEventListener('click', function() {
            linksList.classList.toggle('active');
            
            // Change icon based on state
            const icon = toggleLinksBtn.querySelector('i');
            if (linksList.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // Certificates modal
    const showCertificatesBtn = document.querySelector('.show-certificates');
    const certificatesModal = document.querySelector('.certificates-modal');
    const closeCertificatesBtn = document.querySelector('.close-certificates');
    
    if (showCertificatesBtn && certificatesModal) {
        showCertificatesBtn.addEventListener('click', function() {
            certificatesModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    if (closeCertificatesBtn && certificatesModal) {
        closeCertificatesBtn.addEventListener('click', function() {
            certificatesModal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === certificatesModal) {
                certificatesModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && certificatesModal.style.display === 'block') {
                certificatesModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});