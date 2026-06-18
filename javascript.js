// Seleciona elementos da modal
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

// Seleciona todas as imagens de produto
const productImages = document.querySelectorAll('.p1');

// Função para abrir a modal
function openModal(img) {
    const title = img.getAttribute('data-product');
    const description = img.getAttribute('data-description');
    const src = img.src;

    modalImage.src = src;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Desabilita scroll
}

// Função para fechar a modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Habilita scroll novamente
}

// Event listeners para as imagens de produto
productImages.forEach(img => {
    img.addEventListener('click', function() {
        openModal(this);
    });
});

// Event listener para fechar a modal
closeModalBtn.addEventListener('click', closeModal);

// Fechar modal quando clicar fora da janela de conteúdo
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Fechar modal com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Segunda parte do código
const items = Array.from(document.querySelectorAll('.item'));
let activeIndex = items.findIndex(item => item.classList.contains('active'));
if (activeIndex === -1) {
    activeIndex = 0;
    items[0]?.classList.add('active');
}

function updateItems(index) {
    items.forEach((item, idx) => {
        item.classList.remove('active', 'hidden');
        if (idx === index) {
            item.classList.add('active');
        } else if (idx === activeIndex) {
            item.classList.add('hidden');
        }
    });
    activeIndex = index;
}

function getNextIndex() {
    return (activeIndex + 1) % items.length;
}

function startSlideshow() {
    if (items.length <= 1) {
        return;
    }

    updateItems(getNextIndex());
    setInterval(() => {
        const nextIndex = getNextIndex();
        updateItems(nextIndex);
    }, 4000);
}

setTimeout(startSlideshow, 4000);
