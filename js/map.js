// Map initialization and functionality
let map;
let markers = [];
let chiajnaMarker;

// Chiajna location
const chiajna = {
    lat: 44.4242,
    lng: 26.0015,
    name: "My Apartment in Chiajna"
};

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    setupMapControls();
});

function initMap() {
    // Create map centered on Bucharest
    map = L.map('map').setView([44.4268, 26.1025], 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add Chiajna marker (home location)
    chiajnaMarker = L.marker([chiajna.lat, chiajna.lng], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);
    
    chiajnaMarker.bindPopup(`
        <div class="popup-title">🏠 ${chiajna.name}</div>
        <div class="popup-info">Start your commute from here!</div>
    `);
    
    // Add company markers
    addCompanyMarkers();
}

function addCompanyMarkers() {
    companies.forEach(company => {
        if (!company.location) return;
        
        // Determine marker color based on category
        let iconColor = 'blue';
        if (company.priority) {
            iconColor = 'red';
        } else if (company.categories.includes('short-commute')) {
            iconColor = 'orange';
        } else if (company.categories.includes('ai')) {
            iconColor = 'violet';
        }
        
        const marker = L.marker([company.location.lat, company.location.lng], {
            icon: L.icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }).addTo(map);
        
        // Build badges HTML
        let badges = '';
        if (company.priority) badges += '<span class="popup-badge badge-priority">⭐ TOP PRIORITY</span> ';
        if (company.categories.includes('short-commute')) badges += '<span class="popup-badge badge-short">📍 SHORT COMMUTE</span> ';
        if (company.ai) badges += '<span class="popup-badge badge-ai">🤖 AI/ML</span> ';
        
        // Bind popup
        marker.bindPopup(`
            <div class="popup-content">
                <div class="popup-title">${company.name}</div>
                <div class="popup-info">
                    <strong>Type:</strong> ${company.type}<br>
                    <strong>Size:</strong> ${company.size}<br>
                    <strong>Metro:</strong> ${company.metro}<br>
                    <strong>Commute:</strong> ${company.commute}<br>
                    <div style="margin-top: 8px;">${badges}</div>
                    <div style="margin-top: 8px;">
                        <a href="${company.careers}" target="_blank" class="popup-link">View Careers</a>
                    </div>
                </div>
            </div>
        `);
        
        marker.companyData = company;
        markers.push(marker);
    });
}

function setupMapControls() {
    // Filter dropdown
    const filterSelect = document.getElementById('map-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function(e) {
            filterMarkers(e.target.value);
        });
    }
    
    // Search box
    const searchInput = document.getElementById('map-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchCompanies(e.target.value);
        });
    }
}

function filterMarkers(filterValue) {
    markers.forEach(marker => {
        const company = marker.companyData;
        
        if (filterValue === 'all') {
            marker.addTo(map);
        } else if (company.categories.includes(filterValue)) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

function searchCompanies(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    markers.forEach(marker => {
        const company = marker.companyData;
        
        if (term === '' || company.name.toLowerCase().includes(term)) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

function resetMap() {
    // Reset view
    map.setView([44.4268, 26.1025], 12);
    
    // Reset filters
    const filterSelect = document.getElementById('map-filter');
    const searchInput = document.getElementById('map-search');
    
    if (filterSelect) filterSelect.value = 'all';
    if (searchInput) searchInput.value = '';
    
    // Show all markers
    markers.forEach(marker => marker.addTo(map));
}

function showChiajnaRoute() {
    // Get short commute companies
    const shortCommuteCompanies = companies.filter(c => 
        c.categories.includes('short-commute') && c.location
    );
    
    // Fit bounds to show Chiajna and short commute companies
    const bounds = L.latLngBounds([
        [chiajna.lat, chiajna.lng]
    ]);
    
    shortCommuteCompanies.forEach(company => {
        bounds.extend([company.location.lat, company.location.lng]);
    });
    
    map.fitBounds(bounds, {padding: [50, 50]});
    
    // Build alert message
    let message = '📍 Companies with SHORTEST COMMUTE from Chiajna:\n\n';
    shortCommuteCompanies
        .sort((a, b) => {
            const aTime = parseInt(a.commute);
            const bTime = parseInt(b.commute);
            return aTime - bTime;
        })
        .forEach((company, index) => {
            message += `${index + 1}. ${company.name} - ${company.commute}\n`;
        });
    message += '\n💡 TIP: Target these companies first for the best work-life balance!';
    
    alert(message);
}

// CSS for popup styling
const popupStyles = `
<style>
.popup-content {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-width: 250px;
}
.popup-title {
    font-size: 16px;
    font-weight: bold;
    color: #1F4E78;
    margin-bottom: 10px;
}
.popup-info {
    font-size: 13px;
    line-height: 1.6;
}
.popup-badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 600;
    margin: 2px;
}
.badge-priority {
    background: #ffe0e0;
    color: #C00000;
}
.badge-ai {
    background: #e8f4f8;
    color: #1F4E78;
}
.badge-short {
    background: #fff3cd;
    color: #856404;
}
.popup-link {
    display: inline-block;
    padding: 5px 10px;
    background: #1F4E78;
    color: white !important;
    text-decoration: none;
    border-radius: 3px;
    font-size: 12px;
    transition: background 0.3s;
}
.popup-link:hover {
    background: #2C5F8D;
}
</style>
`;

// Inject popup styles
document.head.insertAdjacentHTML('beforeend', popupStyles);
