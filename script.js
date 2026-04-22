// Live Prices (Free API)
async function loadPrices() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd");
  const data = await res.json();

  document.getElementById("btc").innerText = "$" + data.bitcoin.usd;
  document.getElementById("eth").innerText = "$" + data.ethereum.usd;
}

// Fake P2P Data (you can upgrade later)
const offers = [
  { name: "TraderX", price: 89000, pay: "UPI", limit: "₹5k - ₹50k" },
  { name: "CryptoKing", price: 89500, pay: "Bank", limit: "₹10k - ₹1L" },
  { name: "FastSell", price: 88500, pay: "UPI", limit: "₹2k - ₹20k" }
];

function loadOffers() {
  const table = document.getElementById("offers");
  offers.forEach(o => {
    const row = `
      <tr>
        <td>${o.name}</td>
        <td>${o.price}</td>
        <td>${o.pay}</td>
        <td>${o.limit}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

loadPrices();
loadOffers();
