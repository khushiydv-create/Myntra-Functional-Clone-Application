let bagItemObjects;
function loadBagItemsObject(){
console.log(bagItems);
 bagItemObjects= bagItems.map(itemId=>{
  for(let i=0; i<item.length; i++){
    if(itemId==item[i].id){
      return item[i];
    }
  }
}); 
console.log(bagItemObjects);
}
function displayBagItems(){
let bag_items_container= document.querySelector('.bag-items-container');
let innerhtml=``;
bagItemObjects.forEach(bagItems=> {
  innerhtml+=generateItem(bagItems);
});
bag_items_container.innerHTML= innerhtml;
}

function removeItem(itemId){
bagItems= bagItems.filter(bagItemsId=> bagItemsId!==itemId); //this filters by skipping the item which was removed and filtering all remaining items in bagItems.
localStorage.setItem('bagItems',JSON.stringify(bagItems));
loadBagItemsObject();
displayBagItems();
location.reload();
}

function generateItem(item){
return ` <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.item_image}" style="height: 250px; width:200px">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.price.current_price}</span>
                <span class="original-price">Rs ${item.price.original_price}</span>
                <span class="discount-percentage">(${item.price.discount}% OFF)</span>
              </div> 
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeItem(${item.id})">X</div>
          </div>`
}

function displayBagSummary(){
let bagSummaryElement= document.querySelector('.bag-summary');
let totalMRP=0;
let totalDiscount=0;
let finalPayment=0;

bagItemObjects.forEach(bagItemObjects=>{
  totalMRP+=Math.floor(bagItemObjects.price.original_price);
  totalDiscount+=Math.floor(((bagItemObjects.price.original_price)*(bagItemObjects.price.discount)/100));
  finalPayment= Math.floor((totalMRP-totalDiscount)+99);
})

bagSummaryElement.innerHTML=`
<div class="bag-details-container">
<div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
<div class="price-item">
  <span class="price-item-tag">Total MRP</span>
  <span class="price-item-value">Rs ${totalMRP}</span>
</div>
<div class="price-item">
  <span class="price-item-tag">Discount on MRP</span>
  <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
</div>
<div class="price-item">
  <span class="price-item-tag">Convenience Fee</span>
  <span class="price-item-value">Rs 99</span>
</div>
<hr>
<div class="price-footer">
  <span class="price-item-tag">Total Amount</span>
  <span class="price-item-value">Rs ${finalPayment}</span>
</div>
</div>

<button class="btn-place-order">
<div class="css-xjhrni">PLACE ORDER</div>
</button>
`;
}

function onload(){
//     let bagItemsStr= localStorage.getItem('bagItems');
// bagItems= bagItemsStr ? JSON.parse(bagItemsStr) :  [];
  bagItems= JSON.parse(localStorage.getItem('bagItems')) || [];
    loadBagItemsObject();
    displayBagItems();
    displayBagSummary();
}
onload();

