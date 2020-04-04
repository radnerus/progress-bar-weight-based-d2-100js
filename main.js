const checkboxElements = document.querySelectorAll('input[type=checkbox]');
const progressBar = document.querySelector('#progress-bar');
const progressPercentageEle = document.querySelector('#progress-percentage');
const progressEle = document.querySelector('#progress');

const checkboxIdValueMap = {};

let totalWeight = 0;
let progress = 0;
let progressPercentage = 0;

progressPercentageEle.innerText = progressPercentage + " %";

checkboxElements.forEach(node => {
    const weight = node.attributes['weight'].value;
    checkboxIdValueMap[node.id] = { checked: node.checked, weight: +(weight) }; totalWeight = totalWeight + +(weight)
});

let interval;

const handleClick = (event) => {
    if (interval) {
        clearInterval(interval);
    }
    const currentElement = checkboxIdValueMap[event.id];
    currentElement.checked = event.checked;

    if (event.checked) {
        progress += currentElement.weight;
    } else {
        progress -= currentElement.weight
    }

    progressPercentage = (progress / totalWeight * 100).toFixed(2);

    const progressBarWidth = parseFloat(progressBar.offsetWidth) || 0;
    const widthOfProgress = Math.floor(progressPercentage / 100 * progressBarWidth);


    const initialWidth = parseFloat(progressEle.style.width) || 0;
    const toIncrement = widthOfProgress - initialWidth;
    const steps = toIncrement / 25;

    interval = setInterval(() => {
        progressEle.style.width = (parseFloat(progressEle.style.width) || 0) + steps + "px";

        const percentage = ((parseFloat(progressEle.style.width)) / progressBarWidth * 100).toFixed(2);
        progressPercentageEle.innerText = percentage + " %";
        checkboxElements.forEach(e => e.disabled = true);

        if ((toIncrement > 0 && Number(percentage) >= Number(progressPercentage)) || (toIncrement < 0 && Number(percentage) <= Number(progressPercentage)) || Math.floor(percentage) <= 0 || Math.ceil >= 100) {
            progressPercentageEle.innerText = progressPercentage + " %";

            checkboxElements.forEach(e => e.disabled = false);
            clearInterval(interval);
        }
    }, 20);

}
