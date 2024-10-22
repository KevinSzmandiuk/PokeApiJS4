document.getElementById('BidPokemon').addEventListener('click', async () => {
    const id = document.getElementById('pokemonId').value;
    const container = document.getElementById('container');
    container.innerHTML = '';

    if (!id) {
        container.innerHTML = '<p>Ingrese un número válido.</p>';
        return;
    }

    const pokemonId = parseInt(id);
    
    if (isNaN(pokemonId) || pokemonId <= 0) {
        container.innerHTML = '<p>Ingrese un número positivo válido.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('No se encontró al Pokemon solicitado');
        }
        
        const data = await response.json();
        const { name, types, height, weight, sprites } = data;
        
        const typeNames = types.map(type => type.type.name).join(', ');
        const card = `
            <div class="card">
                <h2>${name}</h2>
                <p>Tipo(s): ${typeNames}</p>
                <p>Altura: ${(height / 10).toFixed(2)} m</p>
                <p>Peso: ${(weight / 10).toFixed(2)} kg</p>
                <img src="${sprites.front_default}" alt="${name}" />
            </div>
        `;
        
        container.innerHTML = card;

    } catch (error) {
        container.innerHTML = `<p>${error.message}</p>`;
    }
});