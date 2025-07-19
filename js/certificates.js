// Certificates Management
document.addEventListener('DOMContentLoaded', function() {
    // This function will load certificates from a JSON file
    // You can update the JSON file whenever you get new certificates
    loadCertificates();
});

// Function to load certificates from JSON
function loadCertificates() {
    // Path to the certificates JSON file
    const certificatesPath = 'data/certificates.json';
    
    // Fetch the certificates data
    fetch(certificatesPath)
        .then(response => {
            // Check if the file exists
            if (!response.ok) {
                console.log('Certificates file not found. Using default certificates.');
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // If we have data from the JSON file, render the certificates
                renderCertificates(data);
            }
        })
        .catch(error => {
            console.log('Error loading certificates:', error);
        });
}

// Function to render certificates
function renderCertificates(certificates) {
    const certificatesGrid = document.querySelector('.certificates-grid');
    
    // If we found the certificates grid
    if (certificatesGrid) {
        // Clear existing certificates (except the "Add Certificate" card)
        const addCertificateCard = certificatesGrid.querySelector('.add-certificate');
        certificatesGrid.innerHTML = '';
        
        // Add each certificate from the JSON data
        certificates.forEach(cert => {
            const certificateCard = createCertificateCard(cert);
            certificatesGrid.appendChild(certificateCard);
        });
        
        // Add the "Add Certificate" card back
        if (addCertificateCard) {
            certificatesGrid.appendChild(addCertificateCard);
        } else {
            // Create a new "Add Certificate" card if it doesn't exist
            const newAddCard = document.createElement('div');
            newAddCard.className = 'add-certificate';
            newAddCard.innerHTML = `
                <i class="fas fa-certificate"></i>
                <h3>More Coming Soon</h3>
                <p>I'm continuously learning and earning new certifications to enhance my skills and expertise.</p>
            `;
            certificatesGrid.appendChild(newAddCard);
        }
    }
}

// Function to create a certificate card
function createCertificateCard(cert) {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    
    card.innerHTML = `
        <div class="certificate-img">
            <img src="${cert.image}" alt="${cert.title}">
        </div>
        <div class="certificate-content">
            <h3>${cert.title}</h3>
            <span class="issuer">${cert.issuer}</span>
            <span class="date">Issued: ${cert.date}</span>
            <p>${cert.description}</p>
            <a href="${cert.link}" class="btn" ${cert.link ? '' : 'style="display:none;"'}>View Certificate</a>
        </div>
    `;
    
    return card;
}

// Function to add a new certificate (for future use)
function addNewCertificate(certificateData) {
    // Fetch existing certificates
    fetch('data/certificates.json')
        .then(response => response.json())
        .then(data => {
            // Add the new certificate
            data.push(certificateData);
            
            // Save the updated certificates
            saveCertificates(data);
            
            // Refresh the certificates display
            renderCertificates(data);
        })
        .catch(error => {
            console.log('Error adding certificate:', error);
        });
}

// This function would require server-side code to actually save the file
// For now, it's just a placeholder
function saveCertificates(certificates) {
    console.log('Saving certificates:', certificates);
    // In a real implementation, this would send the data to a server endpoint
    // that would save it to the certificates.json file
}