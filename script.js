const table = document.getElementById("Main_Table")





function createRow(values){
    console.log(values) 
    const newRow = table.insertRow()
    const cell1 = newRow.insertCell(0)
    const cell2 = newRow.insertCell(1)
    const cell3 = newRow.insertCell(2)
    const cell4 = newRow.insertCell(3)
    const cell5 = newRow.insertCell(4)
    const cell6 = newRow.insertCell(5)
    const cell7 = newRow.insertCell(6)
    const cell8 = newRow.insertCell(7)
    
    cell2.innerHTML = `
  <div class="cryto_image">
    <a href="${values.image}">
      <img src="${values.image}" alt="${values.name}" style="max-width: 100px; height: auto;">
    </a>
    <p>${values.name}</p>
  </div>
`;

    cell1.innerText = values.market_cap_rank
    cell8.innerText = values.market_cap
    cell3.innerText = values.current_price
    cell5.innerText = values.price_change_percentage_24h
    
}

async function getData(){
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    try{
        const response = await fetch(url)
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        json.forEach(createRow)
    } catch (error) {
        console.error(error.message);
      }
}

getData()





