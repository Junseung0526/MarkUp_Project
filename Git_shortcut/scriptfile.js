const commands = document.querySelectorAll('td:first-child');
commands.forEach(command => {
    command.addEventListener('click', () => {
        const description = command.nextElementSibling.textContent;
        const utterance = new SpeechSynthesisUtterance(description);
        speechSynthesis.speak(utterance);
    });
});