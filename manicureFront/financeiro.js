        function addContent() {
        
        const newParagraph = document.createElement("p");
        newParagraph.textContent = "Este é um novo conteúdo adicionado à div.";
        
        
        document.getElementById("contentDiv").appendChild(newParagraph);
    }

 
