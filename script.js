document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('code-input');
    const highlightedCode = document.getElementById('highlighted-code');
    const languageSelect = document.getElementById('language');
    const themeSelect = document.getElementById('theme');
    const backgroundSelect = document.getElementById('background');
    const downloadBtn = document.getElementById('download-btn');
    const copyBtn = document.getElementById('copy-btn');
    const preview = document.getElementById('preview');

    codeInput.addEventListener('input', updatePreview);
    languageSelect.addEventListener('change', updatePreview);
    themeSelect.addEventListener('change', updateTheme);
    backgroundSelect.addEventListener('change', updateBackground);
    downloadBtn.addEventListener('click', downloadImage);
    copyBtn.addEventListener('click', copyToClipboard);

    function updatePreview() {
        const code = codeInput.value;
        const language = languageSelect.value;
        
        if (code.trim() === '') {
            highlightedCode.innerHTML = '<span class="token comment">// Your code will appear here</span>';
            return;
        }
        
        highlightedCode.className = `language-${language}`;
        highlightedCode.textContent = code;
        
        if (typeof Prism !== 'undefined') {
            Prism.highlightElement(highlightedCode);
        }
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
        if (typeof html2canvas === 'undefined') {
            alert('html2canvas library not loaded');
            return;
        }
        
        html2canvas(preview, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'codesnap.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        }).catch(err => {
            console.error('Error generating image:', err);
            alert('Failed to generate image');
        });
    }

    function updateBackground() {
        const bg = backgroundSelect.value;
        const codePreview = document.querySelector('.code-preview');
        
        switch(bg) {
            case 'gradient1':
                codePreview.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                break;
            case 'gradient2':
                codePreview.style.background = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)';
                break;
            case 'gradient3':
                codePreview.style.background = 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)';
                break;
            case 'solid':
                codePreview.style.background = '#2d3748';
                break;
        }
    }

    function copyToClipboard() {
        if (typeof html2canvas === 'undefined') {
            alert('html2canvas library not loaded');
            return;
        }
        
        html2canvas(preview, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            canvas.toBlob(blob => {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy to clipboard:', err);
                    alert('Failed to copy to clipboard');
                });
            }, 'image/png');
        }).catch(err => {
            console.error('Error generating image:', err);
            alert('Failed to generate image');
        });
    }

    codeInput.value = `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;
    
    updatePreview();
});