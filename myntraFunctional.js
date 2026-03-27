
let bagItems;
let itemId=item.id;

function addToBag(itemId){
bagItems.push(itemId);   
console.log(bagItems); 
localStorage.setItem('bagItems',JSON.stringify(bagItems));
displayBagIcon();
}

function displayBagIcon(){
let bagItemCount= document.querySelector('.bag-item-count');
bagItemCount.innerText=bagItems.length;
if(bagItems && bagItems.length>0){
    bagItemCount.style.visibility='visible';
    bagItemCount.innerText=bagItems.length;
}
else bagItemCount.style.visibility='hidden';
}

function displayItemsOnHomePage(){
    let itemContainerElement=document.querySelector('.pic-container');
if(itemContainerElement===null) return;

let innerhtml=``;
item.forEach(item=>{
innerhtml+=`<div class="item-container">
<img src="${item.item_image}" alt="" class="images">
        <div class="rating">${item.rating.stars}⭐| ${item.rating.noOfReviews}</div>
        <div class="companyName">${item.company_name}</div>
        <div class="itemName">${item.item_name}</div>
        <div class="price">
            <span class="currentPrice">Rs ${item.price.current_price}</span>
            <span class="originalPrice">Rs ${item.price.original_price}</span>
            <span class="discount">(${item.price.discount}% OFF)</span>
        </div>
        <button class="addToBag" onclick="addToBag(${item.id})">Add To Bag</button>
        </div>`
});
itemContainerElement.innerHTML= innerhtml;
}

window.onload= function(){
    bagItems= JSON.parse(localStorage.getItem('bagItems')) || [];
    displayItemsOnHomePage();
    displayBagIcon();
}
