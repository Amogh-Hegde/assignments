// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let count = 1;
function counter(t,callback){
    if(count>t){
        callback();
    }else{
        setTimeout(()=>{
            console.log(`${count} seconds up`);
            count++;
            counter(t,callback);
        },1000);
    }
}

counter(5,()=>{
    console.log("time up!");
});






































































