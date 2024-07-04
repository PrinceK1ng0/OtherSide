document.addEventListener('DOMContentLoaded', () => {
    // Obtém elementos do DOM
    const classSelect = document.getElementById('class');
    const originSelect = document.getElementById('origin');
    const strengthInput = document.getElementById('strength');
    const dexterityInput = document.getElementById('dexterity');
    const perceptionInput = document.getElementById('perception');
    const intelligenceInput = document.getElementById('intelligence');
    const charismaInput = document.getElementById('charisma');
    const constitutionInput = document.getElementById('constitution');
    const resistanceInput = document.getElementById('resistance');
    const skillsList = document.getElementById('skills-list');
    const inventoryItemsContainer = document.getElementById('inventory-items');
    const xpInitialInput = document.getElementById('xp-initial');
    const xpTotalInput = document.getElementById('xp-total');
    const levelInput = document.getElementById('level');
    const xpNextInput = document.getElementById('xp-next');
    const specialSkillsDescriptionInput = document.getElementById('special-skills-description');
    const attributes = [strengthInput, dexterityInput, perceptionInput, intelligenceInput, charismaInput, constitutionInput, resistanceInput];

    // Função para atualizar atributos e perícias
    function updateAttributes() {
        const strength = parseInt(strengthInput.value, 10) || 0;
        const dexterity = parseInt(dexterityInput.value, 10) || 0;
        const perception = parseInt(perceptionInput.value, 10) || 0;
        const intelligence = parseInt(intelligenceInput.value, 10) || 0;
        const charisma = parseInt(charismaInput.value, 10) || 0;
        const constitution = parseInt(constitutionInput.value, 10) || 0;
        const resistance = parseInt(resistanceInput.value, 10) || 0;

        // Calcule automaticamente os atributos secundários
        const defense = constitution + resistance;
        const evasion = dexterity + perception;

        // Atualize o DOM com os valores calculados
        document.getElementById('defense').textContent = `Defesa: ${defense}`;
        document.getElementById('evasion').textContent = `Esquiva: ${evasion}`;
    }

    // Função para atualizar habilidades com base na classe e origem
    function updateSkills() {
        const classValue = classSelect.value;
        const originValue = originSelect.value;

        // Limpar lista de habilidades
        skillsList.innerHTML = '';

        const classSkills = {
            atleta: [
                { name: "Corrida", type: "Obrigatória" },
                { name: "Levantamento de Peso", type: "Obrigatória" },
                { name: "Escalada", type: "Opcional" },
                { name: "Natação", type: "Opcional" }
            ],
            nerd: [
                { name: "Computação", type: "Obrigatória" },
                { name: "Análise Crítica", type: "Obrigatória" },
                { name: "Conhecimento Técnico", type: "Opcional" },
                { name: "Estratégia", type: "Opcional" }
            ],
            popular: [
                { name: "Comunicação", type: "Obrigatória" },
                { name: "Liderança", type: "Obrigatória" },
                { name: "Entrosamento Social", type: "Opcional" },
                { name: "Carisma", type: "Opcional" }
            ],
            artista: [
                { name: "Arte", type: "Obrigatória" },
                { name: "Performance", type: "Obrigatória" },
                { name: "Improvisação", type: "Opcional" },
                { name: "Estudo de Arte", type: "Opcional" }
            ],
            explorador: [
                { name: "Sobrevivência", type: "Obrigatória" },
                { name: "Navegação", type: "Obrigatória" },
                { name: "Exploração", type: "Opcional" },
                { name: "Identificação de Rastreio", type: "Opcional" }
            ],
            medico: [
                { name: "Primeiros Socorros", type: "Obrigatória" },
                { name: "Diagnóstico", type: "Obrigatória" },
                { name: "Tratamento Avançado", type: "Opcional" },
                { name: "Pesquisa Médica", type: "Opcional" }
            ],
            caçador: [
                { name: "Rastreamento", type: "Obrigatória" },
                { name: "Táticas de Combate", type: "Obrigatória" },
                { name: "Identificação de Monstros", type: "Opcional" },
                { name: "Armadilhas", type: "Opcional" }
            ]
        };

        const originSkills = {
            'estudante-ciencias': [
                { name: "Pesquisa Científica", type: "Obrigatória" },
                { name: "Experimentos", type: "Obrigatória" },
                { name: "Análise de Dados", type: "Opcional" },
                { name: "Teoria Avançada", type: "Opcional" }
            ],
            'atleta-escolar': [
                { name: "Treinamento Físico", type: "Obrigatória" },
                { name: "Estratégia Esportiva", type: "Obrigatória" },
                { name: "Técnica Avançada", type: "Opcional" },
                { name: "Nutrição Esportiva", type: "Opcional" }
            ],
            'membro-clube-debate': [
                { name: "Debate", type: "Obrigatória" },
                { name: "Retórica", type: "Obrigatória" },
                { name: "Análise Argumentativa", type: "Opcional" },
                { name: "Pesquisas de Tese", type: "Opcional" }
            ],
            'desenvolvedor-jogos': [
                { name: "Programação", type: "Obrigatória" },
                { name: "Design de Jogos", type: "Obrigatória" },
                { name: "Testes de Software", type: "Opcional" },
                { name: "Criação de Narrativas", type: "Opcional" }
            ],
            'jovem-investigador': [
                { name: "Investigação", type: "Obrigatória" },
                { name: "Análise de Evidências", type: "Obrigatória" },
                { name: "Entrevistas", type: "Opcional" },
                { name: "Resolução de Enigmas", type: "Opcional" }
            ],
            'criador-conteudo': [
                { name: "Criação de Conteúdo", type: "Obrigatória" },
                { name: "Edição de Vídeo", type: "Obrigatória" },
                { name: "Gestão de Redes Sociais", type: "Opcional" },
                { name: "Design Gráfico", type: "Opcional" }
            ]
        };

        const skillsToShow = new Set([...classSkills[classValue], ...originSkills[originValue]]);

        skillsToShow.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill';
            skillDiv.innerHTML = `<label>${skill.name}:</label> <input type="number" min="0" max="10" value="0">`;
            skillsList.appendChild(skillDiv);
        });
    }

    // Função para validar pontos distribuídos
    function validatePoints() {
        const maxPoints = 10;
        let totalPoints = 0;
        attributes.forEach(attr => {
            totalPoints += parseInt(attr.value, 10) || 0;
        });

        if (totalPoints > maxPoints) {
            alert('A soma total dos pontos distribuídos não pode exceder 10.');
            return false;
        }

        return true;
    }

    // Função para calcular XP e nível
    function calculateXP() {
        const xpInitial = parseInt(xpInitialInput.value, 10) || 0;
        const xpTotal = parseInt(xpTotalInput.value, 10) || 0;
        const level = Math.floor(xpTotal / 100) + 1; // Exemplo: cada 100 XP aumenta um nível

        levelInput.value = level;
        xpNextInput.value = (level * 100) - xpTotal; // XP necessário para o próximo nível
    }

    // Função para salvar ficha
    function saveCharacter(event) {
        event.preventDefault();

        if (!validatePoints()) {
            return;
        }

        const character = {
            name: document.getElementById('name').value,
            class: classSelect.value,
            origin: originSelect.value,
            birthdate: document.getElementById('birthdate').value,
            age: document.getElementById('age').value,
            sex: document.getElementById('sex').value,
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            description: document.getElementById('description').value,
            attributes: {
                strength: strengthInput.value,
                dexterity: dexterityInput.value,
                perception: perceptionInput.value,
                intelligence: intelligenceInput.value,
                charisma: charismaInput.value,
                constitution: constitutionInput.value,
                resistance: resistanceInput.value
            },
            skills: getSkills(),
            inventory: getInventoryItems(),
            xpInitial: xpInitialInput.value,
            xpTotal: xpTotalInput.value,
            level: levelInput.value,
            xpNext: xpNextInput.value,
            specialSkillsDescription: specialSkillsDescriptionInput.value
        };

        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        const editIndex = localStorage.getItem('editIndex');

        if (editIndex !== null) {
            characters[editIndex] = character; // Atualizar ficha existente
        } else {
            characters.push(character); // Adicionar nova ficha
        }

        localStorage.setItem('characters', JSON.stringify(characters));
        alert('Ficha salva com sucesso!');
    }

    // Função para carregar ficha
    function loadCharacter() {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        const editIndex = localStorage.getItem('editIndex');

        if (editIndex !== null && characters[editIndex]) {
            const char = characters[editIndex];
            document.getElementById('name').value = char.name;
            classSelect.value = char.class;
            originSelect.value = char.origin;
            document.getElementById('birthdate').value = char.birthdate;
            document.getElementById('age').value = char.age;
            document.getElementById('sex').value = char.sex;
            document.getElementById('height').value = char.height;
            document.getElementById('weight').value = char.weight;
            document.getElementById('description').value = char.description;

            strengthInput.value = char.attributes.strength;
            dexterityInput.value = char.attributes.dexterity;
            perceptionInput.value = char.attributes.perception;
            intelligenceInput.value = char.attributes.intelligence;
            charismaInput.value = char.attributes.charisma;
            constitutionInput.value = char.attributes.constitution;
            resistanceInput.value = char.attributes.resistance;

            setSkills(char.skills);
            setInventoryItems(char.inventory);

            xpInitialInput.value = char.xpInitial;
            xpTotalInput.value = char.xpTotal;
            levelInput.value = char.level;
            xpNextInput.value = char.xpNext;
            specialSkillsDescriptionInput.value = char.specialSkillsDescription;

            updateAttributes();
            updateSkills();
            calculateXP();
            
            localStorage.removeItem('editIndex'); // Remove o índice de edição após o carregamento
        }
    }

    // Função para obter habilidades do DOM
    function getSkills() {
        const skills = [];
        const skillInputs = skillsList.querySelectorAll('input');
        skillInputs.forEach(input => {
            skills.push({ name: input.previousElementSibling.textContent, value: input.value });
        });
        return skills;
    }

    // Função para definir habilidades no DOM
    function setSkills(skills) {
        skillsList.innerHTML = '';
        skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill';
            skillDiv.innerHTML = `<label>${skill.name}:</label> <input type="number" min="0" max="10" value="${skill.value}">`;
            skillsList.appendChild(skillDiv);
        });
    }

    // Função para obter itens do inventário do DOM
    function getInventoryItems() {
        const items = [];
        const itemInputs = inventoryItemsContainer.querySelectorAll('input');
        itemInputs.forEach(input => {
            items.push(input.value);
        });
        return items;
    }

    // Função para definir itens do inventário no DOM
    function setInventoryItems(items) {
        inventoryItemsContainer.innerHTML = '';
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            itemDiv.innerHTML = `<input type="text" value="${item}">`;
            inventoryItemsContainer.appendChild(itemDiv);
        });
    }

    // Event listeners
    classSelect.addEventListener('change', updateSkills);
    originSelect.addEventListener('change', updateSkills);
    attributes.forEach(attr => attr.addEventListener('input', () => {
        if (validatePoints()) {
            updateAttributes();
        }
    }));
    xpInitialInput.addEventListener('input', calculateXP);
    xpTotalInput.addEventListener('input', calculateXP);
    document.getElementById('character-form').addEventListener('submit', saveCharacter);

    // Carregar ficha se disponível
    loadCharacter();
});
