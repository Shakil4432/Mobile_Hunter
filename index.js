const loadData=async(searchText)=>{
    const response=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data=await response.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer=document.getElementById('phones_container');
    phonesContainer.innerHTML="";

    if(phones.length>10){
        const showAll=document.getElementById("showAll");
        showAll.classList.remove("hidden");
    }else{
        showAll.classList.add("hidden");
    }
    phones=phones.slice(0,10);
    phones.map(phone=>{
        console.log(phone);
        const phoneDiv = document.createElement("div");
        phoneDiv.classList=(`card card-compact w-80 p-4 bg-base-100 shadow-xl`);
        phoneDiv.innerHTML=`
            <div class="w-60 m-auto bg-cyan-50 rounded-lg p-10" ><img class="w-[80%] lg:h-[30vh] m-auto" src="${phone.image}"  alt="Shoes" /></div>
                <div class="card-body flex flex-col justify-center items-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>${phone.slug}</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    loadingData(true);
}


// search products
const handleSearch = ()=>{
    loadingData(false);
   const inputField=document.getElementById("inputField");
   const inputFieldValue = inputField.value;
   loadData(inputFieldValue);
}

const loadingData = (isLoad)=>{
    const loading= document.getElementById("loading_data");
    if(isLoad){
        loading.classList.add("hidden");
    }else{
        loading.classList.remove("hidden");
    }
}
loadData();