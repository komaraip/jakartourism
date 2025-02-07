function showModal(placeData) {
    const place = JSON.parse(placeData);
    const modal = document.getElementById('placeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalRating = document.getElementById('modalRating');

    modalTitle.textContent = place.name;
    modalCategory.textContent = place.category;
    modalDescription.textContent = place.desc;
    modalPrice.textContent = `💰 ${Number(place.price).toLocaleString()} IDR`;
    modalRating.textContent = `⭐ ${Number(place.rating).toFixed(1)}`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('placeModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('placeModal');
    if (event.target == modal) {
        closeModal();
    }
}