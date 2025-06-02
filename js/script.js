/**
 * Script principal para o site da Barbearia Sudeo PP
 * Implementa funcionalidades interativas e dinâmicas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    initMobileMenu();
    
    // Slider de Depoimentos
    initTestimonialsSlider();
    
    // Tabs de Categorias (Serviços e Galeria)
    initCategoryTabs();
    
    // Galeria com Modal
    initGallery();
    
    // FAQ Accordion
    initFaqAccordion();
    
    // Formulários
    initForms();
    
    // Contador de Números
    initCounters();
    
    // Mapa de Localização
    initMap();
});

/**
 * Inicializa o menu mobile
 */
// js/script.js

// Seleciona os elementos
const menuMobile = document.querySelector('.menu-mobile');
const menu = document.querySelector('.menu');

// Quando clicar no ícone
menuMobile.addEventListener('click', () => {
  menu.classList.toggle('active');
});

    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuMobile.classList.remove('active');
            menuMobile.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    document.querySelector('.menu-mobile').addEventListener('click', function () {
        // Alterna a classe 'open' para o ícone do hambúrguer e o menu
        this.classList.toggle('open');
        document.querySelector('.menu').classList.toggle('open');
    });
    

/**
 * Inicializa o slider de depoimentos
 */
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slider && prevBtn && nextBtn) {
        const testimonials = slider.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        // Esconder todos os depoimentos exceto o primeiro
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Função para mostrar o depoimento atual
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            testimonials[index].style.display = 'block';
        }
        
        // Evento para o botão anterior
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = testimonials.length - 1;
            }
            showTestimonial(currentIndex);
        });
        
        // Evento para o botão próximo
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= testimonials.length) {
                currentIndex = 0;
            }
            showTestimonial(currentIndex);
        });
        
        // Rotação automática a cada 5 segundos
        setInterval(function() {
            currentIndex++;
            if (currentIndex >= testimonials.length) {
                currentIndex = 0;
            }
            showTestimonial(currentIndex);
        }, 5000);
    }
}

/**
 * Inicializa as abas de categorias (serviços e galeria)
 */
function initCategoryTabs() {
    // Tabs de Serviços
    const serviceTabs = document.querySelectorAll('.service-categories .category-tab');
    const serviceCategories = document.querySelectorAll('.service-category');
    
    if (serviceTabs.length > 0 && serviceCategories.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover classe active de todas as tabs
                serviceTabs.forEach(t => t.classList.remove('active'));
                
                // Adicionar classe active à tab clicada
                this.classList.add('active');
                
                // Mostrar categoria correspondente
                const category = this.getAttribute('data-category');
                
                serviceCategories.forEach(cat => {
                    cat.classList.remove('active');
                    if (cat.id === category) {
                        cat.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Tabs de Galeria
    const galleryTabs = document.querySelectorAll('.gallery-categories .category-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryTabs.length > 0 && galleryItems.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover classe active de todas as tabs
                galleryTabs.forEach(t => t.classList.remove('active'));
                
                // Adicionar classe active à tab clicada
                this.classList.add('active');
                
                // Filtrar itens da galeria
                const category = this.getAttribute('data-category');
                
                galleryItems.forEach(item => {
                    if (category === 'todos') {
                        item.style.display = 'block';
                    } else if (item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Inicializa a galeria com modal
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    
    if (galleryItems.length > 0 && modal) {
        const modalImg = modal.querySelector('img');
        const modalCaption = modal.querySelector('.modal-caption');
        const modalClose = modal.querySelector('.modal-close');
        const modalPrev = modal.querySelector('.modal-prev');
        const modalNext = modal.querySelector('.modal-next');
        
        let currentIndex = 0;
        const visibleItems = [];
        
        // Função para abrir o modal
        function openModal(index) {
            // Atualizar array de itens visíveis
            visibleItems.length = 0;
            galleryItems.forEach((item, idx) => {
                if (item.style.display !== 'none') {
                    visibleItems.push(idx);
                }
            });
            
            currentIndex = visibleItems.indexOf(index);
            
            // Obter dados do item atual
            const currentItem = galleryItems[visibleItems[currentIndex]];
            const imgSrc = currentItem.querySelector('.gallery-image').style.backgroundImage.replace('url("', '').replace('")', '');
            const caption = currentItem.querySelector('h3').textContent;
            const photographer = currentItem.querySelector('p').textContent;
            
            // Atualizar modal
            modalImg.src = imgSrc;
            modalCaption.textContent = caption + ' - ' + photographer;
            
            // Mostrar modal
            modal.style.display = 'flex';
            
            // Desabilitar scroll da página
            document.body.style.overflow = 'hidden';
        }
        
        // Função para fechar o modal
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Função para navegar para o item anterior
        function prevItem() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = visibleItems.length - 1;
            }
            
            const currentItem = galleryItems[visibleItems[currentIndex]];
            const imgSrc = currentItem.querySelector('.gallery-image').style.backgroundImage.replace('url("', '').replace('")', '');
            const caption = currentItem.querySelector('h3').textContent;
            const photographer = currentItem.querySelector('p').textContent;
            
            modalImg.src = imgSrc;
            modalCaption.textContent = caption + ' - ' + photographer;
        }
        
        // Função para navegar para o próximo item
        function nextItem() {
            currentIndex++;
            if (currentIndex >= visibleItems.length) {
                currentIndex = 0;
            }
            
            const currentItem = galleryItems[visibleItems[currentIndex]];
            const imgSrc = currentItem.querySelector('.gallery-image').style.backgroundImage.replace('url("', '').replace('")', '');
            const caption = currentItem.querySelector('h3').textContent;
            const photographer = currentItem.querySelector('p').textContent;
            
            modalImg.src = imgSrc;
            modalCaption.textContent = caption + ' - ' + photographer;
        }
        
        // Adicionar eventos aos itens da galeria
        galleryItems.forEach((item, index) => {
            const zoomBtn = item.querySelector('.gallery-zoom');
            
            zoomBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(index);
            });
        });
        
        // Eventos do modal
        modalClose.addEventListener('click', closeModal);
        modalPrev.addEventListener('click', prevItem);
        modalNext.addEventListener('click', nextItem);
        
        // Fechar modal ao clicar fora da imagem
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Navegação com teclado
        document.addEventListener('keydown', function(e) {
            if (modal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowLeft') {
                    prevItem();
                } else if (e.key === 'ArrowRight') {
                    nextItem();
                }
            }
        });
    }
}

/**
 * Inicializa o accordion de perguntas frequentes
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', function() {
                // Fechar outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.display = 'none';
                        otherItem.querySelector('.faq-toggle').innerHTML = '<i class="fas fa-plus"></i>';
                    }
                });
                
                // Alternar estado do item atual
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.display = 'block';
                    toggle.innerHTML = '<i class="fas fa-minus"></i>';
                } else {
                    answer.style.display = 'none';
                    toggle.innerHTML = '<i class="fas fa-plus"></i>';
                }
            });
        });
        
        // Abrir o primeiro item por padrão
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
            faqItems[0].querySelector('.faq-answer').style.display = 'block';
            faqItems[0].querySelector('.faq-toggle').innerHTML = '<i class="fas fa-minus"></i>';
        }
    }
}

/**
 * Inicializa os formulários
 */
function initForms() {
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            if (validateForm(contactForm)) {
                // Simulação de envio
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(function() {
                    // Resetar formulário
                    contactForm.reset();
                    
                    // Restaurar botão
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensagem';
                    
                    // Mostrar mensagem de sucesso
                    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                }, 1500);
            }
        });
    }
    
    // Formulário de Cadastro
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            if (validateForm(registerForm)) {
                // Validar senha e confirmação
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                if (password !== confirmPassword) {
                    alert('As senhas não coincidem. Por favor, verifique.');
                    return;
                }
                
                // Simulação de envio
                const submitBtn = registerForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Cadastrando...';
                
                setTimeout(function() {
                    // Resetar formulário
                    registerForm.reset();
                    
                    // Restaurar botão
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Cadastrar';
                    
                    // Mostrar mensagem de sucesso
                    alert('Cadastro realizado com sucesso! Você receberá um e-mail de confirmação em breve.');
                    
                    // Redirecionar para a página inicial
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }
    
    // Formulário de Newsletter (footer)
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                
                if (emailInput.value.trim() === '') {
                    alert('Por favor, informe seu e-mail.');
                    return;
                }
                
                // Simulação de envio
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    // Resetar formulário
                    form.reset();
                    
                    // Restaurar botão
                    submitBtn.disabled = false;
                    
                    // Mostrar mensagem de sucesso
                    alert('Inscrição realizada com sucesso! Você receberá nossas novidades em breve.');
                }, 1000);
            });
        });
    }
}

/**
 * Valida um formulário
 * @param {HTMLFormElement} form - O formulário a ser validado
 * @returns {boolean} - Retorna true se o formulário for válido
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            field.classList.add('invalid');
            isValid = false;
            
            // Adicionar evento para remover classe invalid ao digitar
            field.addEventListener('input', function() {
                field.classList.remove('invalid');
            }, { once: true });
        } else {
            field.classList.remove('invalid');
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
    
    return isValid;
}

/**
 * Inicializa os contadores de números
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    let count = 0;
                    const duration = 2000; // 2 segundos
                    const interval = Math.floor(duration / target);
                    
                    const timer = setInterval(function() {
                        count++;
                        counter.textContent = count;
                        
                        if (count >= target) {
                            clearInterval(timer);
                        }
                    }, interval);
                    
                    // Parar de observar após iniciar a contagem
                    observer.unobserve(counter);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

/**
 * Inicializa o mapa de localização
 */
/**
 * Inicializa o mapa de localização
 */
function initMap() {
    // Esta função será chamada pelo callback do Google Maps API
    window.initMap = function() {
        const mapElement = document.getElementById('map');
        
        if (mapElement) {
            // Endereço exato da barbearia
            const barberShopAddress = "Av. Saul Elkind, 4054 - sala 3 - Vivi Xavier, Londrina - PR, 86082-000";
            
            // Coordenadas iniciais para Londrina (serão atualizadas pela geocodificação)
            const initialLocation = { lat: -23.3044524, lng: -51.1695824 };
            
            // Criar mapa
            const map = new google.maps.Map(mapElement, {
                center: initialLocation,
                zoom: 17,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true
            });
            
            // Criar geocoder para obter coordenadas precisas do endereço
            const geocoder = new google.maps.Geocoder();
            
            // Geocodificar o endereço para obter coordenadas precisas
            geocoder.geocode({ 'address': barberShopAddress }, function(results, status) {
                if (status === 'OK') {
                    // Centralizar mapa nas coordenadas obtidas
                    map.setCenter(results[0].geometry.location);
                    
                    // Adicionar marcador na posição correta
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: 'Sudeo PP Barbearia',
                        animation: google.maps.Animation.DROP
                    });
                    
                    // Adicionar janela de informações
                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div class="map-info-window">
                                <h3>Sudeo PP Barbearia</h3>
                                <p>Av. Saul Elkind, 4054 - sala 3 - Vivi Xavier</p>
                                <p>Londrina - PR, 86082-000</p>
                                <p>Seg-Sáb: 9h às 20h</p>
                                <a href="tel:+551199999888">(11) 99999-8888</a>
                            </div>
                        `
                    });
                    
                    // Abrir janela de informações ao clicar no marcador
                    marker.addListener('click', function() {
                        infoWindow.open(map, marker);
                    });
                    
                    // Abrir janela de informações por padrão
                    infoWindow.open(map, marker);
                } else {
                    // Em caso de erro na geocodificação, usar coordenadas fixas
                    console.error('Geocode falhou devido a: ' + status);
                    
                    // Coordenadas fixas para o endereço (backup)
                    const fixedLocation = { lat: -23.2724, lng: -51.1341 };
                    
                    // Centralizar mapa nas coordenadas fixas
                    map.setCenter(fixedLocation);
                    
                    // Adicionar marcador na posição fixa
                    const marker = new google.maps.Marker({
                        map: map,
                        position: fixedLocation,
                        title: 'Sudeo PP Barbearia'
                    });
                    
                    // Adicionar janela de informações
                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div class="map-info-window">
                                <h3>Sudeo PP Barbearia</h3>
                                <p>Av. Saul Elkind, 4054 - sala 3 - Vivi Xavier</p>
                                <p>Londrina - PR, 86082-000</p>
                                <p>Seg-Sáb: 9h às 20h</p>
                                <a href="tel:+551199999888">(11) 99999-8888</a>
                            </div>
                        `
                    });
                    
                    // Abrir janela de informações ao clicar no marcador
                    marker.addListener('click', function() {
                        infoWindow.open(map, marker);
                    });
                    
                    // Abrir janela de informações por padrão
                    infoWindow.open(map, marker);
                }
            });
        }
    };
}



/**
 * Máscara para campos de formulário
 */
function initInputMasks() {
    // CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');
            }
            
            e.target.value = value;
        });
    }
    
    // Telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    if (phoneInputs.length > 0) {
        phoneInputs.forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 11) {
                    value = value.slice(0, 11);
                }
                
                if (value.length > 10) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
                } else if (value.length > 2) {
                    value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
                } else if (value.length > 0) {
                    value = value.replace(/^(\d{0,2}).*/, '($1');
                }
                
                e.target.value = value;
            });
        });
    }
    
    // CEP
    const zipCodeInput = document.getElementById('zipCode');
    if (zipCodeInput) {
        zipCodeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 8) {
                value = value.slice(0, 8);
            }
            
            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
            }
            
            e.target.value = value;
        });
    }
}

// Inicializar máscaras de input quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initInputMasks);
