const resetForm=()=>{
    document.getElementById("bill-form").reset();
    document.getElementById("people-number-from").reset();
    document.querySelector('.custom-tip').value="";//input tag
    document.getElementById("tip").innerText="0";
    document.getElementById("total").innerText="0";
}
function setError(message,target,outline){
    target.innerText=message;
    outline.classList.add("error");
}
const validations={
    bill:(value)=>{
        const num=Number(value);
        const billError=document.getElementById("error-bill");
        const errorDivBill=document.querySelector("#bill-form div");
        if(isNaN(num)){
            setError("It should be a number",billError,errorDivBill);
            return false;
        }
        errorDivBill.classList.remove("error");
        billError.innerText="";
        return true;
    },
    people:(value)=>{
        const peopleError=document.getElementById("error-people");
        const errorDivPeople=document.querySelector("#people-number-from div");
        if(Number(value) <= 0 || value.trim() === ""){
            setError("Can't be zero",peopleError,errorDivPeople);
            return false;
        }else if(isNaN(Number(value))){
            setError("It should be a number",peopleError,errorDivPeople);
            return false;
        }
        errorDivPeople.classList.remove("error");
        peopleError.innerText="";
        return true;
    }
}
function isDataValid(key,value,validations){
    return validations[key](value);
}
function calculateTipAmount(bill,tip,people){
    let tipAmount=(Number(bill)*tip)/100;
    document.getElementById("tip").innerText=`${(tipAmount/people).toFixed(2)}`;
    return tipAmount;
}
function calculateTotal(bill,tipAmount,people){
    let total=Number(bill) + tipAmount;
    document.getElementById("total").innerText=`${(total/people).toFixed(2)}`;
}
const tipButton=document.querySelectorAll(".tip");
tipButton.forEach(button=>{
    button.addEventListener('click',(e)=>{
        let tipButtonValue=e.target.innerText.trim();
        tipButtonValue = parseFloat(tipButtonValue.replace("%", ""));
        const billInput=document.getElementById("bill-input").value;
        const peopleInput=document.getElementById("people-input").value;
        let isBillValid=isDataValid("bill",billInput,validations);
        let isPeopleVaid=isDataValid("people",peopleInput,validations);
        if( isBillValid && isPeopleVaid){
            let tipAmount=calculateTipAmount(billInput,tipButtonValue,peopleInput);
            calculateTotal(billInput,tipAmount,peopleInput);
        }
    
    
    })
})
document.querySelector(".custom-tip").addEventListener('input',(e)=>{
    let tipButtonValue=parseFloat(e.target.value.replace("%", ""));
    if (isNaN(tipButtonValue)) return; 
    const billInput=document.getElementById("bill-input").value;
    const peopleInput=document.getElementById("people-input").value;
    if(isDataValid("bill",billInput,validations) && (isDataValid("people",peopleInput,validations))){
        let tipAmount=calculateTipAmount(billInput,tipButtonValue,peopleInput);
        calculateTotal(billInput,tipAmount,peopleInput);
    }


})