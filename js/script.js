document.addEventListener('DOMContentLoaded', function() {
    // Tabs de busca na página inicial
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                
                // Remover classe active de todas as tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Adicionar classe active na tab clicada
                tab.classList.add('active');
                
                // Esconder todos os conteúdos
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Mostrar o conteúdo correspondente
                document.getElementById(`${target}-tab`).classList.add('active');
            });
        });
    }

    // Formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulação de login (em um sistema real, isso seria feito via API)
            if (email && password) {
                // Redirecionar para o painel após login
                window.location.href = 'painel.html';
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Formulário de cadastro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Validação básica
            if (!nome || !sobrenome || !email || !telefone || !password || !confirmPassword) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem.');
                return;
            }
            
            if (!terms) {
                alert('Você precisa aceitar os termos e condições.');
                return;
            }
            
            // Simulação de cadastro (em um sistema real, isso seria feito via API)
            window.location.href = 'painel.html';
        });
    }

    // Logout
    const logoutButtons = document.querySelectorAll('#logout, #sidebar-logout');
    if (logoutButtons.length > 0) {
        logoutButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Simulação de logout (em um sistema real, isso seria feito via API)
                window.location.href = 'index.html';
            });
        });
    }

    // Filtro de reservas
    const filterReservas = document.getElementById('filter-reservas');
    if (filterReservas) {
        filterReservas.addEventListener('change', function() {
            const value = this.value;
            const reservationCards = document.querySelectorAll('.reservation-card');
            
            reservationCards.forEach(card => {
                if (value === 'todas') {
                    card.style.display = 'block';
                } else if (value === 'ativas' && card.classList.contains('active')) {
                    card.style.display = 'block';
                } else if (value === 'passadas' && card.classList.contains('past')) {
                    card.style.display = 'block';
                } else if (value === 'canceladas' && card.classList.contains('canceled')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Formulário de perfil
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Informações pessoais atualizadas com sucesso!');
        });
    }

    // Formulário de endereço
    const addressForm = document.getElementById('address-form');
    if (addressForm) {
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Endereço atualizado com sucesso!');
        });
    }

    // Formulário de senha
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (newPassword !== confirmNewPassword) {
                alert('As senhas não coincidem.');
                return;
            }
            
            alert('Senha alterada com sucesso!');
            passwordForm.reset();
        });
    }

    // Botões de cancelar reserva
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    if (cancelButtons.length > 0) {
        cancelButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
                    const card = this.closest('.reservation-card');
                    card.classList.remove('active');
                    card.classList.add('canceled');
                    
                    const statusSpan = card.querySelector('.status');
                    statusSpan.textContent = 'Cancelado';
                    statusSpan.className = 'status canceled';
                    
                    const actionsDiv = card.querySelector('.reservation-actions');
                    actionsDiv.innerHTML = `
                        <a href="#" class="btn-details">Ver Detalhes</a>
                        <a href="#" class="btn-rebook">Reservar Novamente</a>
                    `;
                }
            });
        });
    }

    // Inicializar datas nos formulários
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        dateInputs.forEach((input, index) => {
            if (index % 2 === 0) {
                // Data de ida/check-in
                input.value = formatDate(today);
                input.min = formatDate(today);
            } else {
                // Data de volta/check-out
                input.value = formatDate(tomorrow);
                input.min = formatDate(tomorrow);
            }
        });
    }
});