document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('code-input');
    const highlightedCode = document.getElementById('highlighted-code');
    const languageSelect = document.getElementById('language');
    const themeSelect = document.getElementById('theme');
    const downloadBtn = document.getElementById('download-btn');
    const preview = document.getElementById('preview');

    codeInput.addEventListener('input', updatePreview);
    languageSelect.addEventListener('change', updatePreview);
    themeSelect.addEventListener('change', updateTheme);
    downloadBtn.addEventListener('click', downloadImage);

    function updatePreview() {
        const code = codeInput.value;
        if (code.trim() === '') {
            highlightedCode.textContent = '// Your code will appear here';
            return;
        }
        
        highlightedCode.textContent = code;
    }

    function updateTheme() {
        const theme = themeSelect.value;
        const codePreview = document.querySelector('.code-preview');
        
        codePreview.className = 'code-preview';
        codePreview.classList.add(`theme-${theme}`);
        
        switch(theme) {
            case 'github':
                codePreview.style.background = '#f6f8fa';
                highlightedCode.style.color = '#24292e';
                break;
            case 'dracula':
                codePreview.style.background = '#282a36';
                highlightedCode.style.color = '#f8f8f2';
                break;
            default:
                codePreview.style.background = '#2d3748';
                highlightedCode.style.color = '#e2e8f0';
        }
    }

    function downloadImage() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = preview.offsetWidth;
        canvas.height = preview.offsetHeight;
        
        ctx.fillStyle = getComputedStyle(preview).backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#333';
        ctx.font = '14px Consolas, Monaco, monospace';
        
        const lines = highlightedCode.textContent.split('\n');
        lines.forEach((line, index) => {
            ctx.fillText(line, 20, 50 + (index * 20));
        });
        
        const link = document.createElement('a');
        link.download = 'codesnap.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    codeInput.value = `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;
    
    updatePreview();
});