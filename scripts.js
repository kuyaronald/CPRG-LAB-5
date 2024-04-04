async function fetchAgentInfo() {
    const apiUrl = 'https://valorant-api.com/v1/agents';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching agent information:', error);
        return [];
    }
}


async function displayAgentCards() {
    const agents = await fetchAgentInfo();

    if (agents) {
        const container = document.getElementById('agent-cards');
        container.innerHTML = '';

        agents.forEach(agent => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-agent', agent.displayName);

            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${agent.displayName}</h5>
                    <p class="card-text">${agent.description}</p>
                    <img src="${agent.fullPortrait}" class="card-img-top" alt="${agent.displayName}">
                </div>
            `;

            container.appendChild(card);
        });
    }
}

async function populateSelectionTool() {
    const agents = await fetchAgentInfo();
    const select = document.getElementById('agent-select');

    if (agents) {
        agents.forEach(agent => {
            const option = document.createElement('option');
            option.value = agent.displayName;
            option.textContent = agent.displayName;
            select.appendChild(option);
        });
    }
}

function confirmSelection() {
    const selectedAgent = document.getElementById('agent-select').value;
    if (selectedAgent) {
        displayAgentCard(selectedAgent);
        document.getElementById('reset-button').style.display = 'inline-block';
    } else {
        alert('Please select an agent.');
    }
}


function displayAgentCard(selectedAgent) {
    const agents = document.querySelectorAll('.card');

    agents.forEach(agent => {
        if (selectedAgent === '' || agent.getAttribute('data-agent') === selectedAgent) {
            agent.style.display = 'block';
        } else {
            agent.style.display = 'none';
        }
    });
}

function resetSelection() {
    const select = document.getElementById('agent-select');
    select.value = '';
    displayAgentCards();
    document.getElementById('reset-button').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    displayAgentCards();
    populateSelectionTool();

    const confirmButton = document.getElementById('confirm-button');
    confirmButton.addEventListener('click', confirmSelection);

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetSelection);

    resetButton.style.display = 'none';
});



