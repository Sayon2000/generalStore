const axiosInstance = axios.create({
    baseURL : "https://crudcrud.com/api/f92d362c436540caa81fe2d5d3a33c83/generalstore"
})
let ul = document.querySelector('.display ul')

window.addEventListener('load' , renderElements)

document.querySelector('.addItem form').addEventListener('submit', handleSubmit)

ul.addEventListener('click', handleClick)




async function handleSubmit(e){
    try{
    e.preventDefault();



    const itemName = e.target["item-name"].value.trim()
    const itemDesc = e.target["item-description"].value.trim()
    const itemPrice = e.target["item-price"].value
    const itemQty = e.target["item-qty"].value



    if(itemName.trim().length === 0 || itemDesc.trim().length === 0 || itemPrice === "0" || itemQty === "0")
        alert("Wrong input")

    

    const data ={
        "item-name" : itemName,
        "item-description" : itemDesc,
        "item-price" : itemPrice,
        "item-qty" : itemQty
    }

    let res;
    let id ;

    res = await axiosInstance.post('/', data)
    console.log(res)
    id = res.data._id

    let li = document.createElement('li')
    const text = document.createElement("div")

    text.textContent = `Item name : ${data["item-name"]} Description : ${data["item-description"]} Price : ${data["item-price"]} Quantity : ${data["item-qty"]}`
    li.appendChild(text)

    const buttons = document.createElement("div")

    const buy1 = document.createElement('button')
    buy1.classList.add('buy1')
    buy1.textContent = "Buy1"
    buy1.id = id

    const buy2 = document.createElement('button')
    buy2.classList.add('buy2')
    buy2.textContent = "Buy2"
    buy2.id = id

    const buy3 = document.createElement('button')
    buy3.classList.add('buy3')
    buy3.textContent = "Buy3"
    buy3.id = id

    buttons.appendChild(buy1)
    buttons.appendChild(buy2)
    buttons.appendChild(buy3)
    li.appendChild(buttons)

    ul.appendChild(li)

    e.target["item-name"].value = ''
    e.target["item-description"].value = ''
    e.target["item-price"].value = ''
    e.target["item-qty"].value = ''
}catch(e){
    console.log(e)
}
}

async function renderElements(e){
    try{
    let res = await axiosInstance.get()


    res.data.forEach(data => {
        let id = data._id

        let li = document.createElement('li')
        const text = document.createElement("div")
  
        text.textContent = `Item name : ${data["item-name"]} Description : ${data["item-description"]} Price : ${data["item-price"]} Quantity : ${data["item-qty"]}`
        li.appendChild(text)
    
        const buttons = document.createElement("div")

        const buy1 = document.createElement('button')
        buy1.classList.add('buy1')
        buy1.textContent = "Buy1"
        buy1.id = id
    
        const buy2 = document.createElement('button')
        buy2.classList.add('buy2')
        buy2.textContent = "Buy2"
        buy2.id = id
    
        const buy3 = document.createElement('button')
        buy3.classList.add('buy3')
        buy3.textContent = "Buy3"
        buy3.id = id
    
        buttons.appendChild(buy1)
        buttons.appendChild(buy2)
        buttons.appendChild(buy3)
        li.appendChild(buttons)
    
        ul.appendChild(li)
    
    })
}catch(e){
    console.log(e)
}
}

async function handleClick(e){
    try{
    if(e.target.classList.contains('buy1') || e.target.classList.contains('buy2') || e.target.classList.contains('buy3')){
        const buyQty = Number(e.target.textContent.substring(3))

        
        let id = e.target.id
        let str = e.target.parentNode.parentNode.firstElementChild.textContent;
        const itemName = str.substring(12,str.indexOf("Description")-1);
        const desc = str.substring(str.indexOf("Description") + 14  
        , str.indexOf("Price ")-1);
        const price = Number(str.substring(str.indexOf("Price") + 8 
        , str.indexOf("Quantity ")-1))

        const itemQty = Number(str.substring(str.lastIndexOf("Quantity") +11));


        if(itemQty < buyQty)
            alert(`quantity less than ${buyQty}`)
        else{
            const data ={
                "item-name" : itemName,
                "item-description" : desc,
                "item-price" : price,
                "item-qty" : itemQty -buyQty
            }
        

        let res = await axiosInstance.put(`/${id}`,data)
        if(res.status === 200){
            e.target.parentNode.parentNode.firstElementChild.textContent = 
            `Item name : ${data["item-name"]} Description : ${data["item-description"]} Price : ${data["item-price"]} Quantity : ${data["item-qty"]}`

        }
        if(data["item-qty"] === 0 ){
            let del = await axiosInstance.delete(`/${id}`)
            if(del.status === 200)
                ul.removeChild(e.target.parentNode.parentNode)
        }
    }

    }
}catch(e){
    console.log(e)
}
}