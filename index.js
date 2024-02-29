const loadData = async (searchText, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    displayPhones(data.data, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phonesContainer = document.getElementById('phones_container');
    phonesContainer.innerHTML = "";

    if (phones.length > 10 && !isShowAll) {
        const showAll = document.getElementById("showAll");
        showAll.classList.remove("hidden");
    } else {
        showAll.classList.add("hidden");
    }
    if (!isShowAll) {
        phones = phones.slice(0, 10);
    }
    phones.map(phone => {
        console.log(phone);
        const phoneDiv = document.createElement("div");
        phoneDiv.classList = (`card card-compact w-80 p-4 bg-base-100 shadow-xl`);
        phoneDiv.innerHTML = `
            <div class="w-60 m-auto bg-cyan-50 rounded-lg p-10" ><img class="w-[80%] lg:h-[30vh] m-auto" src="${phone.image}"  alt="Shoes" /></div>
                <div class="card-body flex flex-col justify-center items-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>${phone.slug}</p>
                    <div class="card-actions justify-end">
                    <button onclick="handlePhoneDetails('${phone.slug}');show_modal_details.showModal()" class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    loadingData(true);
}


// search products
const handleSearch = (isShowAll) => {
    loadingData(false);
    const inputField = document.getElementById("inputField");
    const inputFieldValue = inputField.value;
    loadData(inputFieldValue, isShowAll);
}

const loadingData = (isLoad) => {
    const loading = document.getElementById("loading_data");
    if (isLoad) {
        loading.classList.add("hidden");
    } else {
        loading.classList.remove("hidden");
    }
}

const showAllData = () => {
    handleSearch(true);
}

const handlePhoneDetails=async(id)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await res.json();
    showPhoneDetails(data.data);
    console.log(data.data);
    
}

const showPhoneDetails = (data) =>{
    const phoneName = document.getElementById("show_phone_name");
    phoneName.innerText=data.name;

    const description = document.getElementById("description");
    description.innerHTML=`
         <p><span>Chip Set :</span>${data.mainFeatures.chipSet}</p>
         <p><span>Display :</span>${data.mainFeatures.displaySize}</p>
         <p><span>Memory :</span>${data.mainFeatures.memory}</p>
         <p><span>GPS :</span>${data.others.GPS}</p>
         <p><span>USB :</span>${data.others.USB}</p>
    `
}
loadData();