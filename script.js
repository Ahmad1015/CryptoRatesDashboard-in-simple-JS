const table = document.getElementById("Main_Table")

async function refresh(){
  location.reload()
}

setTimeout(refresh,5000)
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

var red = 'rgb(255, 0, 0)';
var green = 'rgb(0,128,0)';

function createRow(values){
    const newRow = table.insertRow()
    const cell1 = newRow.insertCell(0)
    const cell2 = newRow.insertCell(1)
    const cell3 = newRow.insertCell(2)
    const cell4 = newRow.insertCell(3)
    const cell5 = newRow.insertCell(4)
    const cell6 = newRow.insertCell(5)
    const cell7 = newRow.insertCell(6)
    const cell8 = newRow.insertCell(7)
    const symbol = values.symbol.toUpperCase()
    cell2.innerHTML = `
  <div class="cryto_image">
    <a href="${values.image}">
      <img src="${values.image}" alt="${values.name}" style="max-width: 100px; height: auto;">
    </a>
    <p>${values.name}</p>
    <p>${symbol}</p>
  </div>
`;
    
    cell1.innerText = values.market_cap_rank
    cell8.innerText = formatter.format(values.market_cap)
    cell3.innerText = formatter.format(values.current_price)
    cell4.innerText = String(Math.round(values.price_change_percentage_1h_in_currency*100)/100) + "%"
    cell5.innerText = String(Math.round(values.price_change_percentage_24h*100)/100) + "%"
    cell6.innerText = String(Math.round(values.price_change_percentage_7d_in_currency*100)/100) + "%"
    cell7.innerText = formatter.format(values.total_volume)
    if (values.price_change_percentage_24h > 0){
        cell5.style.color = green
    }
    else if (values.price_change_percentage_24h<0){
        cell5.style.color = red
    }
    if (values.price_change_percentage_1h_in_currency > 0){
        cell4.style.color = green
    }
    else if (values.price_change_percentage_1h_in_currency<0){
        cell4.style.color = red
    }
    if (values.price_change_percentage_7d_in_currency > 0){
        cell6.style.color = green
    }
    else if (values.price_change_percentage_7d_in_currency<0){
        cell6.style.color = red
    }
}

async function getData(){
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d"
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





