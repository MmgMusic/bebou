document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const passwordButton = document.getElementById('password-button');
    const passwordMessage = document.getElementById('password-message');
    const passwordContainer = document.getElementById('password-container');
    const contentContainer = document.getElementById('content-container');
    
    const riddles = [
        {
            input: document.getElementById('riddle1-input'),
            checkButton: document.getElementById('riddle1-check'),
            message: document.getElementById('riddle1-message'),
            unlockedTextElement: document.getElementById('riddle1-unlocked-text'),
            koreanTextContainer: document.querySelector('.riddle-section:nth-of-type(1) .korean-text-container'),
            correctAnswer: 'majangdong hanu 1++',
            syllables: ['ma', 'jang', 'dong', 'han', 'u', '1++']
        },
        {
            input: document.getElementById('riddle2-input'),
            checkButton: document.getElementById('riddle2-check'),
            message: document.getElementById('riddle2-message'),
            unlockedTextElement: document.getElementById('riddle2-unlocked-text'),
            koreanTextContainer: document.querySelector('.riddle-section:nth-of-type(2) .korean-text-container'),
            correctAnswer: 'hangaram hanjeongsik',
            syllables: ['han', 'ga', 'ram', 'han', 'jeong', 'sik']
        }
    ];
    
    const giftReveal = document.getElementById('gift-reveal');
    let solvedRiddles = 0;

    // Password logic
    passwordButton.addEventListener('click', () => {
        const password = passwordInput.value.toLowerCase();
        if (password === 'cadeau') {
            passwordContainer.classList.add('hidden');
            contentContainer.classList.remove('hidden');
            setupRiddles();
        } else {
            passwordMessage.textContent = 'Mauvais mot de passe. Réessaie !';
            passwordMessage.classList.add('incorrect');
            passwordMessage.classList.remove('correct');
        }
    });

    function setupRiddles() {
        riddles.forEach(riddle => {
            const unlockedSyllables = new Set();
            
            // Live validation on input
            riddle.input.addEventListener('input', () => {
                const userGuess = riddle.input.value.toLowerCase().trim();
                
                riddle.syllables.forEach(syllable => {
                    if (userGuess.includes(syllable)) {
                        unlockedSyllables.add(syllable);
                    }
                });
                
                let displayText = riddle.syllables.map(syllable => {
                    if (unlockedSyllables.has(syllable)) {
                        return syllable;
                    } else if (syllable === '1++') {
                        return '1++';
                    } else if (syllable.length <= 2) {
                        return '__';
                    } else {
                        return '______';
                    }
                }).join(' ');
                
                riddle.unlockedTextElement.textContent = displayText;
            });

            // Final answer check
            riddle.checkButton.addEventListener('click', () => {
                const guess = riddle.input.value.toLowerCase().trim();
                
                if (guess === riddle.correctAnswer) {
                    riddle.message.textContent = 'Bravo ! C\'est la bonne réponse !';
                    riddle.message.classList.add('correct');
                    riddle.message.classList.remove('incorrect');
                    riddle.input.disabled = true;
                    riddle.checkButton.disabled = true;
                    riddle.unlockedTextElement.textContent = riddle.correctAnswer;
                    solvedRiddles++;
                    checkCompletion();
                } else {
                    riddle.message.textContent = 'Mauvaise réponse. Réessaie !';
                    riddle.message.classList.add('incorrect');
                    riddle.message.classList.remove('correct');
                }
            });
        });
    }

    function checkCompletion() {
        if (solvedRiddles === riddles.length) {
            giftReveal.classList.remove('hidden');
        }
    }
});