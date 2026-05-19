const tamagotchi = {
    nombre: "Patoso",
    avatar: "./img/normal.jpg", 
    estados: {
        normal: "./img/normal.jpg",      
        duchar: "./img/duchar.jpg",      
        alimentar: "./img/comer.jpg",    
        jugar: "./img/jugar.jpg",        
        dormir: "./img/dormir.jpg",      
        reprender: "./img/llorar.jpg",    
        acariciar: "./img/acariciar.jpg"     
    },
    felicidad: 1,
    salud: 1,
    limpieza: 1,
    energia: 1,
    descripcion: "Patoso es un patito al que le encanta comer y jugar, pero odia que lo obliguen a dormir."
};

// Переменные для таймеров картинки и имени
let avatarTimer = null;
let nameTimer = null;


const game = {
     render() {
        const container = document.getElementById('stats-container');
       
        const nameEl = document.getElementById('pet-name');
        if (nameEl) nameEl.innerText = tamagotchi.nombre;

        const descEl = document.getElementById('pet-description');
        if (descEl && tamagotchi.descripcion) {
            const textoCompleto = tamagotchi.descripcion;
            const primeraLetra = textoCompleto.charAt(0);
            const restoDelTexto = textoCompleto.slice(1);
          
            descEl.innerHTML = `<span class="fancy-letter">${primeraLetra}</span>${restoDelTexto}`;
        }
        
        const avatarImg = document.getElementById('pet-avatar');
        if (avatarImg) {
            avatarImg.src = tamagotchi.avatar;
        }
                
        const stats = [
            { key: 'felicidad', label: 'FELICIDAD' },
            { key: 'salud', label: 'SALUD' },
            { key: 'limpieza', label: 'LIMPIEZA' },
            { key: 'energia', label: 'ENERGIA' }
        ];

        if (container) {
            container.innerHTML = stats.map(s => `
                <div class="stat-row">
                    <span class="stat-label">${s.label}:</span>
                    <span class="stars">${"☀️".repeat(tamagotchi[s.key])}</span>
                </div>
            `).join('');
        }
     },

   
    clamp(value) {
         return Math.max(0, Math.min(10, value));
    },

    cambiarAvatarTemporal(nuevoEstado) {
        // 1. ЛОГИКА КАРТИНКИ
        if (avatarTimer) clearTimeout(avatarTimer);
        tamagotchi.avatar = tamagotchi.estados[nuevoEstado];
        this.render();

        avatarTimer = setTimeout(() => {
            tamagotchi.avatar = tamagotchi.estados.normal;
            this.render();
        }, 10000);

        // 2. МАГИЯ ВРАЩЕНИЯ ИМЕНИ (Добавлено сюда)
        const nameEl = document.getElementById('pet-name');
        if (nameEl) {
            // Если имя уже крутится (например, от быстрого клика), сбрасываем старую анимацию
            nameEl.classList.remove('spin-animation');
            if (nameTimer) clearTimeout(nameTimer);
            
            // Форсируем перезапуск анимации браузером (триггер перерисовки)
            void nameEl.offsetWidth; 
            
            // Запускаем вращение
            nameEl.classList.add('spin-animation');

            // Через 600 миллисекунд (время вращения) убираем класс
            nameTimer = setTimeout(() => {
                nameEl.classList.remove('spin-animation');
            }, 300);
        }
    },

    alimentar() {
        tamagotchi.felicidad = this.clamp(tamagotchi.felicidad + 2);
        tamagotchi.salud = this.clamp(tamagotchi.salud + 5);
        tamagotchi.limpieza = this.clamp(tamagotchi.limpieza - 1);
        tamagotchi.energia = this.clamp(tamagotchi.energia + 3);
        
        this.cambiarAvatarTemporal('alimentar');
    },

    jugar() {
        tamagotchi.felicidad = this.clamp(tamagotchi.felicidad + 2);
        tamagotchi.salud = this.clamp(tamagotchi.salud + 1);
        tamagotchi.limpieza = this.clamp(tamagotchi.limpieza - 2);
        tamagotchi.energia = this.clamp(tamagotchi.energia - 3);
        
        this.cambiarAvatarTemporal('jugar');
    },

    duchar() {
        tamagotchi.limpieza = 10;
        tamagotchi.felicidad = this.clamp(tamagotchi.felicidad - 1);
        
        this.cambiarAvatarTemporal('duchar');
    },

    dormir() {
        tamagotchi.energia = 10;
        tamagotchi.felicidad = this.clamp(tamagotchi.felicidad - 3);
        
        this.cambiarAvatarTemporal('dormir');
    },

    reprender() {
        tamagotchi.felicidad = this.clamp(tamagotchi.felicidad - 2);
        
        this.cambiarAvatarTemporal('reprender');
    },

    acariciar() {
        tamagotchi.felicidad = this.clamp(tamagotchi.felicidad + 1);
        
        this.cambiarAvatarTemporal('acariciar');
    }
};

game.render();


