const canvas = document.getElementById("roller");
const context = canvas.getContext("2d",{alpha:false});
const button = document.getElementById("roller-button");

context.imageSmoothingEnabled = false;

const SIZE = canvas.width;
const ROLLS = 35;
const OPPOSUM_COUNT = 9;
const ROLL_RATE = 30;

const image = document.getElementById("moods");

const renderOpposum = index => {
    context.drawImage(image,index*SIZE,0,SIZE,SIZE,0,0,SIZE,SIZE);
};

const delay = duration => {
    return new Promise(resolve=>{
        setTimeout(resolve,duration);
    });
};

function disableClick() {
    button.onclick = null;
}
function enableClick() {
    button.onclick = () => {
        disableClick();
        roll();
    };
}
let lastOffset = 0;
async function roll() {

    let offset = Math.floor(Math.random() * OPPOSUM_COUNT);
    if(offset === lastOffset) offset += 1;
    lastOffset = offset;

    for(let rolls = 0;rolls < ROLLS;rolls++) {
        const index = (rolls + offset) % OPPOSUM_COUNT;
        renderOpposum(index);
        await delay(ROLL_RATE);
    }

    enableClick();
}

document.body.onload = () => {
    enableClick();
};
