document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DE ELEMENTOS ---
    const uploadContainer = document.getElementById('upload-container');
    const manualEntryContainer = document.getElementById('manual-entry-container');
    const showUploadBtn = document.getElementById('show-upload-btn');
    const showManualBtn = document.getElementById('show-manual-btn');

    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const previewArea = document.getElementById('preview-area');
    const imagePreview = document.getElementById('image-preview');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const submitFileBtn = document.getElementById('submit-file-btn');

    const manualForm = document.getElementById('manual-form');

    // --- FUNÇÕES ---

    // Função para mostrar a área de upload
    function showUploadView() {
        uploadContainer.classList.remove('hidden');
        manualEntryContainer.classList.add('hidden');
        showUploadBtn.classList.add('active');
        showManualBtn.classList.remove('active');
    }

    // Função para mostrar a área de entrada manual
    function showManualView() {
        uploadContainer.classList.add('hidden');
        manualEntryContainer.classList.remove('hidden');
        showUploadBtn.classList.remove('active');
        showManualBtn.classList.add('active');
    }

    // Função para processar o arquivo selecionado
    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                uploadArea.classList.add('hidden');
                previewArea.classList.remove('hidden');
            };

            reader.readAsDataURL(file);
        } else if (file && file.type === 'application/pdf') {
            imagePreview.src = '../../assets/logo.png'; // Placeholder
            alert(`Arquivo PDF "${file.name}" selecionado.`);
            uploadArea.classList.add('hidden');
            previewArea.classList.remove('hidden');
        } else {
            alert('Por favor, selecione um arquivo de imagem (JPG, PNG) ou PDF.');
        }
    }

    // Função para resetar a visualização de upload
    function resetUploadView() {
        fileInput.value = '';
        previewArea.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        imagePreview.src = '#';
    }

    // --- EVENT LISTENERS ---

    // Toggle entre as visualizações
    showUploadBtn.addEventListener('click', showUploadView);
    showManualBtn.addEventListener('click', showManualView);

    // --- Lógica de Upload ---
    uploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

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

    removeFileBtn.addEventListener('click', resetUploadView);

    submitFileBtn.addEventListener('click', () => {
        alert('Conta enviada para cadastro! (Simulação)');
        resetUploadView();
    });

    // --- Lógica de Entrada Manual ---
    manualForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o envio real do formulário

        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const dueDate = document.getElementById('due-date').value;
        const category = document.getElementById('category').value;

        // Simulação de cadastro
        alert(`Conta cadastrada manualmente:\nDescrição: ${description}\nValor: R$ ${amount}\nData de Vencimento: ${dueDate}\nCategoria: ${category}`);

        // Limpa o formulário
        manualForm.reset();
    });
});
