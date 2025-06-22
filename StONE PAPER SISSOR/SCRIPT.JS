let userscore=0;
let compScore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userscorePara=document.querySelector("#ur-score");
const compscorePara=document.querySelector("#comp-score");
const genCompchoice=()=>{
    const options=["rock","paper","scissors"];
     const randInd=Math.floor(Math.random()*3);
     return options[randInd];

}
const drawgame=()=>{
    msg.innerText="Game was draw.Try again";
    msg.style.backgroundColor="#081b31";
}
const showWinner=(userWin,userchoice,Compchoice)=>{
if(userWin){
    userscore++;
    userscorePara.innerText=userscore;
    msg.innerText=`YOU WIN! Your ${userchoice} beats  ${Compchoice}`;
    msg.style.backgroundColor="green";
}else{
    compScore++;
    compscorePara.innerText=compScore;
    msg.innerText=`YOU LOSE ${Compchoice} beats your ${userchoice}`;
    msg.style.backgroundColor="red";
}
}
 const Playgame=(userchoice)=>{
        //Generate computer choice 
        const Compchoice=genCompchoice();

if(userchoice===Compchoice){
            drawgame();
} else {
    let userWin=true;
    if(userchoice==="rock"){
     userWin=Compchoice==="paper"?false:true;
    }else if(userchoice==="paper"){
        userWin=Compchoice==="scissors"?false:true;
    } else {
    userWin=Compchoice==="rock"?false:true;
    }
    showWinner(userWin,userchoice,Compchoice);
   }
 };
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute("id")
        Playgame(userchoice);
    });
});