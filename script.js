document.addEventListener('DOMContentLoaded', function() {
    const countDownDate = new Date("July 9, 2025 13:00:00").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "IT'S TIMEEEEEE!";
        }
    }, 1000);

    const quoteCards = document.querySelectorAll('.quote-carousel .quote-card');
    const prevButton = document.querySelector('.prev-quote');
    const nextButton = document.querySelector('.next-quote');
    let currentQuoteIndex = 0;
    let isAnimating = false;

    function navigateQuotes(direction) {
        if (isAnimating) return;

        let prevIndex = currentQuoteIndex;

        currentQuoteIndex += direction;

        if (currentQuoteIndex >= quoteCards.length) {
            currentQuoteIndex = 0;
        } else if (currentQuoteIndex < 0) {
            currentQuoteIndex = quoteCards.length - 1;
        }

        quoteCards[prevIndex].classList.remove('active');

        quoteCards.forEach((card, i) => {
            if (i !== currentQuoteIndex) {
                card.style.transform = `translateX(${i < currentQuoteIndex ? '-100%' : '100%'})`;
                card.classList.remove('active');
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
            }
        });

        quoteCards[currentQuoteIndex].style.transform = `translateX(0%)`;
        quoteCards[currentQuoteIndex].style.opacity = '1';
        quoteCards[currentQuoteIndex].style.pointerEvents = 'auto';
        quoteCards[currentQuoteIndex].classList.add('active');

        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, 100);
    }

    if (quoteCards.length > 0) {
        quoteCards[0].classList.add('active');
        for (let i = 1; i < quoteCards.length; i++) {
            quoteCards[i].style.transform = 'translateX(100%)';
            quoteCards[i].style.opacity = '0';
            quoteCards[i].style.pointerEvents = 'none';
        }
    }

    prevButton.addEventListener('click', () => navigateQuotes(-1));
    nextButton.addEventListener('click', () => navigateQuotes(1));
});