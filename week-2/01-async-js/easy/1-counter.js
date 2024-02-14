// ## Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second

function counter(t){
    i=1;
    const intervalId = setInterval(()=>{
        console.log(`${i} seconds up`);
        i++;
    },i*1000);
    setTimeout(() => {
        clearInterval(intervalId);
        console.log("time up!");
    },(t+1)*1000);
}

counter(5);