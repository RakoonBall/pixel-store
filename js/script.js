let dataSet;
let count = 0;

const countIconEl = document.getElementById('count-icon');
const countIconSmallEl = document.getElementById('count-icon-sm');
const productCountEl = document.getElementById('product-count');
const priceEl = document.getElementById('price');
const taxEl = document.getElementById('tax');
const totalPriceEl = document.getElementById('total-price');


fetch("https://raw.githubusercontent.com/prosany/Grand-Session/main/data.json")
  .then((res) => res.json())
  .then((data) => {
    dataSet = data;
    showCards(data);
  });

const loadData = async()=>{
    const res =await fetch('../page/data.json');
    const data = await res.json();
    showCards(data);
    dataSet = data;
}

const showCards=(data)=>{
    console.log(data)
    const cardContainerEl = document.getElementById('card-container');
    data.forEach(card=>{
        const {id,price, img, name}= card;
        const divEl = document.createElement('div');
        divEl.classList.add('card', 'w-[350px]','bg-base-100', 'shadow-2xl','mx-auto');
        divEl.innerHTML=`
        <div class="px-6 py-3">
            <figure><img class="rounded-lg w-full h-[300px]" src="${img}" alt="Shoes" /></figure>
        </div>                      
        <div class="card-body gap-0 p-[15px]">
            <div id="parent-name-icon-container" class="flex justify-between">
                <h2 class="card-title">${name}</h2>
                <div>
                  <span><i class="fa-sharp fa-solid fa-heart text-yellow-500 mr-3"></i></span>
                  <span><i class="fa-solid fa-square-minus text-red-600 "></i></span>
                </div>
            </div>
          
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <h2 class="text-[18px] font-semibold">Price: $${price}</h2>
          <div class="card-actions justify-between mb-0">
            <label onclick="handleModal('${id}')" for="my-modal-3" class="btn btn-outline btn-primary modal-button w-[45%]"><i class="fa-solid fa-circle-info mr-2"></i> DETAILS</label>
            <button onclick="handleBuyNow('${id}')" class="btn btn-outline btn-secondary w-[45%]"><i class="fa-solid fa-cart-shopping mr-2"></i>Buy</button>
          </div>
        </div>
        `
        cardContainerEl.appendChild(divEl);
    })


}
const handleModal=(id)=>{
    const product = dataSet.find(item=> item.id === id);
    const {img, name, price} = product;
    const modalDataEl = document.getElementById('modal-data');
    modalDataEl.innerHTML=`
    <img src="${img}" alt="" class="w-[80%] h-[300px] mx-auto rounded-xl">
    <h1 class="text-[20px] font-bold mt-4 mb-1"><span class="text-violet-600">Product: </span> <span> ${name}</span></h1>
    <p class="text-lg text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam magnam necessitatibus molestiae, magni labore assumenda quam, aliquid laborum maxime dolorem beatae sapiente et, sed maiores?</p>
    <h1 class="text-[20px] font-bold mt-4 mb-1"><span class="text-violet-600"> FEATURES:</span></h1>
    <p class="text-lg text-gray-500">Lorem ipsum dolor sit amet . Cupiditate, nam.</p>
    <h1 class="text-[20px] font-bold mt-4 mb-1"><span class="text-violet-600" >PRICE:</span> <span>$${price}</span></h1>
    `

}

const cartContainerEl = document.getElementById('cart-container');
const handleBuyNow=(id)=>{
    count++;
    const product = dataSet.find(item=> item.id === id);
    const {img, name, price} = product;
    const divEl = document.createElement('div');
    divEl.classList.add("border-[2px]", "flex", "justify-between","items-center", "bg-white","rounded-lg" ,"shadow-xl","p-2","mb-2");

    divEl.innerHTML=`
    <img src="${img}" alt="" class="w-[15%]">
    <p class="font-semibold">${name}</p>
    <p class="border px-4 rounded-lg">1</p>
    <i id='trash-btn' class="fa-solid fa-trash text-red-500 text-[23px]" onclick="handleTrashButton('${id}')"></i>

    `
    cartContainerEl.appendChild(divEl);
    countIconEl.innerText=count;
    countIconSmallEl.innerText = count;

    productCountEl.innerText = count;
    priceEl.innerText= (price +  +priceEl.innerText).toFixed(2);
    taxEl.innerText = ((price +  +priceEl.innerText)* .1).toFixed(2);
    totalPriceEl.innerText = (+priceEl.innerText + +taxEl.innerText).toFixed(2);
}
const handleTrashButton = (id) =>{
    product = dataSet.find(item=> item.id===id);
    const {price}= product;
    const trashBtnEl = document.getElementById('trash-btn');
    console.log(trashBtnEl.parentNode); 
    trashBtnEl.parentNode.remove()
    count =count-1;
    countIconEl.innerText=count;
    countIconSmallEl.innerText = count;
    productCountEl.innerText = count;
    taxEl.innerText = (((+priceEl.innerText)* .1) - price*.1).toFixed(2);
    priceEl.innerText= ((+priceEl.innerText) - price).toFixed(2);;
    totalPriceEl.innerText = ((+priceEl.innerText + +taxEl.innerText)).toFixed(2); 

}
const handleClearCart= ()=>{
    document.getElementById('cart-container').innerHTML=``;
    count=0;
    countIconEl.innerText=count;
    countIconSmallEl.innerText = count;
    productCountEl.innerText = count;
    priceEl.innerText= '0.00';
    taxEl.innerText = '0.00';
    totalPriceEl.innerText ='0.00';
}

loadData();