const lowerDivContainer=document.querySelector(".lower-div-container");
const lowerDivContainer2=document.querySelector(".lower-div-container2");
const navbarBorder=document.querySelector(".navbar-border");
const product=document.getElementById("product");
const industries=document.getElementById("industries");
const templates=document.getElementById("templates");
const dropdownproductbutton=document.getElementById("dropdown-product-button");
const dropdownindustriesbutton=document.getElementById("dropdown-industries-button");
const productMobileDiv=document.getElementById("product-mobile-div");
const industriesMobileDiv=document.getElementById("industries-mobile-div");
const checkbox=document.getElementById("check");
const pricingDiv=document.getElementById("pricing-div-id");
const plansContainer1=document.getElementById("plans-container-1");
const plansContainer2=document.getElementById("plans-container-2");
const faqDivItems=document.querySelectorAll("#faqDivItems");
const faqPara=document.querySelectorAll("#faqPara");
const faqDropdownImg=document.querySelectorAll(".faq-dropdown-img");
/*Navbar js */

/*Scroll js */
document.addEventListener("scroll",function(){

    if(scrollY>=25)
        {
            lowerDivContainer.classList.add("lower-div-translateUp");
            lowerDivContainer.classList.remove("lower-div-translateDown");
            lowerDivContainer2.classList.add("lower-div-container2-heightAnimation");
            navbarBorder.classList.add("navbar-border-collapse");
            navbarBorder.classList.remove("navbar-border-uncollapse");
        }

    else {
        lowerDivContainer.classList.remove("lower-div-translateUp");
        lowerDivContainer.classList.add("lower-div-translateDown");
        lowerDivContainer2.classList.remove("lower-div-container2-heightAnimation");
        navbarBorder.classList.add("navbar-border-uncollapse");
        navbarBorder.classList.remove("navbar-border-collapse");
        
    }
})
/*Hover effect js */
function appearProduct(){
    product.classList.remove("hide");
}
function disappearProduct(){
    product.classList.add("hide");
}
function appearIndustries(){
    industries.classList.remove("hide");
}
function disappearIndustries(){
    industries.classList.add("hide");
}
function appearTemplates(){
    templates.classList.remove("hide");
}
function disappearTemplates(){
    templates.classList.add("hide");
}
var checkButton=0;
dropdownproductbutton.addEventListener("click",function(){

    if(checkButton==0)
    {
       productMobileDiv.style.display="block";
       dropdownproductbutton.classList.add("rotateButtonToup");
       dropdownproductbutton.classList.remove("rotateButtonTodown");
       checkButton++;
    }
    else {
          productMobileDiv.style.display="none";
          dropdownproductbutton.classList.add("rotateButtonTodown");
          dropdownproductbutton.classList.remove("rotateButtonToup");
          checkButton--;
    }
})
var checkButton2=0;
dropdownindustriesbutton.addEventListener("click",function(){

    if(checkButton2==0)
    {
       industriesMobileDiv.style.display="block";
       dropdownindustriesbutton.classList.add("rotateButtonToup");
       dropdownindustriesbutton.classList.remove("rotateButtonTodown");
       checkButton2++;
    }
    else {
          industriesMobileDiv.style.display="none";
          dropdownindustriesbutton.classList.add("rotateButtonTodown");
          dropdownindustriesbutton.classList.remove("rotateButtonToup");
          checkButton2--;
    }
})

//when we click on toggle switch between month and year to change we can do this also else by using display:none and display:block can also be done.

/*Toggle switch plans switch between month and year*/
// checkbox.addEventListener("click",replacefun);
// function replacefun(){
//     console.log(checkbox.checked);
//     if(checkbox.checked==false)
//     {
//         pricingDiv.replaceChild(plansContainer1,plansContainer2);
//     }
//     else if(checkbox.checked==true)
//     {
//         pricingDiv.replaceChild(plansContainer2,plansContainer1);
//     }
// }

//first we need to hide planContainer 
//so when we load document this function wiil be executed
document.onload=hidePlanContainer2();
function hidePlanContainer2(){
    if(!checkbox.checked)
    {
        plansContainer2.classList.add("hide");
    }
}

checkbox.addEventListener("click",function(){
    if(checkbox.checked==true){
        plansContainer1.classList.remove("show");
        plansContainer2.classList.remove("hide");
        plansContainer1.classList.add("hide");
        plansContainer2.classList.add("show");

    }
    else if(checkbox.checked==false){
        plansContainer1.classList.remove("hide");
        plansContainer2.classList.remove("show");
        plansContainer1.classList.add("show");
        plansContainer2.classList.add("hide");
    }
})

//faq div 
faqDivItems[0].addEventListener("click",function(){
   faqDivItems[0].classList.toggle("faq-div-item1");
   faqDropdownImg[0].classList.toggle("faq-dropdown-img-animation");

})
faqDivItems[1].addEventListener("click",function(){
    faqDivItems[1].classList.toggle("faq-div-item2");
    faqDropdownImg[1].classList.toggle("faq-dropdown-img-animation");
})
faqDivItems[2].addEventListener("click",function(){
    faqDivItems[2].classList.toggle("faq-div-item3");
    faqDropdownImg[2].classList.toggle("faq-dropdown-img-animation");
})
faqDivItems[3].addEventListener("click",function(){   
    faqDivItems[3].classList.toggle("faq-div-item4");
    faqDropdownImg[3].classList.toggle("faq-dropdown-img-animation");
})



