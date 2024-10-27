document.addEventListener("DOMContentLoaded", () => {
    // URL da API
    const apiUrl = "https://manicure-projetodeextensao.onrender.com/api/endpoint"; // Altere para o seu endpoint real

    // Função para fazer o fetch
    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            const data = await response.json(); // Ou response.text() se a resposta não for JSON

            // Manipule os dados conforme necessário
            console.log(data);
            // Por exemplo, exiba os dados na página
            displayData(data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    // Função para exibir os dados na página
    const displayData = (data) => {
        const mainContent = document.querySelector('.main-content');
        const dataList = document.createElement('ul');

        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name; // Altere 'name' para a propriedade desejada
            dataList.appendChild(listItem);
        });

        mainContent.appendChild(dataList);
    };

    // Chama a função fetchData
    fetchData();
});