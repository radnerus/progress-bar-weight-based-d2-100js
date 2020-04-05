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

    const progressBarWidth = progressBar.offsetWidth;
    const widthOfProgress = Math.floor(progressPercentage / 100 * progressBarWidth);


    const initialWidth = progressEle.offsetWidth;
    const toIncrement = widthOfProgress - initialWidth;
    const noOfSteps = 25;
    const steps = toIncrement / noOfSteps;
    let count = 0;

    interval = setInterval(() => {
        count++;
        progressEle.style.width = (progressEle.offsetWidth) + steps + "px";

        const percentage = ((parseFloat(progressEle.offsetWidth)) / progressBarWidth * 100).toFixed(2);
        progressPercentageEle.innerText = percentage + " %";
        checkboxElements.forEach(e => e.disabled = true);

        if ((toIncrement > 0 && Number(percentage) >= Number(progressPercentage)) || (toIncrement < 0 && Number(percentage) <= Number(progressPercentage)) || count === noOfSteps) {
            progressPercentageEle.innerText = progressPercentage + " %";
            progressEle.style.width = widthOfProgress + 'px';
            checkboxElements.forEach(e => e.disabled = false);
            clearInterval(interval);
        }
    }, 20);

}
