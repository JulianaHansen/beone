document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DE ELEMENTOS ---
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const previewArea = document.getElementById('preview-area');
    const imagePreview = document.getElementById('image-preview');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const submitFileBtn = document.getElementById('submit-file-btn');

    // --- FUNÇÕES ---

    // Função para processar o arquivo selecionado
    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                // Troca a visualização
                uploadArea.classList.add('hidden');
                previewArea.classList.remove('hidden');
            };

            reader.readAsDataURL(file);
        } else if (file && file.type === 'application/pdf') {
            // Para PDFs, não podemos mostrar uma pré-visualização de imagem
            // Mostramos um ícone e o nome do arquivo
            imagePreview.src = '../../assets/logo.png'; // Usando o logo como placeholder
            alert(`Arquivo PDF "${file.name}" selecionado. A pré-visualização não está disponível para PDFs.`);
            uploadArea.classList.add('hidden');
            previewArea.classList.remove('hidden');
        } else {
            alert('Por favor, selecione um arquivo de imagem (JPG, PNG) ou PDF.');
        }
    }

    // Função para resetar a visualização
    function resetView() {
        fileInput.value = ''; // Limpa o input
        previewArea.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        imagePreview.src = '#';
    }

    // --- EVENT LISTENERS ---

    // Abrir seletor de arquivo ao clicar na área ou no botão
    uploadArea.addEventListener('click', () => fileInput.click());

    // Lidar com o arquivo selecionado
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Lógica de Drag and Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Botão para trocar/remover o arquivo
    removeFileBtn.addEventListener('click', resetView);

    // Botão de envio (simulação)
    submitFileBtn.addEventListener('click', () => {
        alert('Conta enviada para cadastro! (Simulação)');
        // Aqui iria a lógica de upload para o servidor
        resetView(); // Limpa a tela após o envio
    });
});
