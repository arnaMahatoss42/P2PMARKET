import { useMemo, useState } from "react";

const marketData = [
  { symbol: "BTC", name: "Bitcoin", price: 67842, change: 2.34, volume: "$24.1B", cap: "$1.33T", spark: [52, 54, 53, 58, 61, 60, 64] },
  { symbol: "ETH", name: "Ethereum", price: 3481, change: 1.87, volume: "$15.6B", cap: "$418B", spark: [21, 22, 21, 24, 23, 25, 27] },
  { symbol: "SOL", name: "Solana", price: 162.4, change: 4.62, volume: "$4.3B", cap: "$72B", spark: [19, 18, 20, 23, 22, 25, 28] },
  { symbol: "XRP", name: "XRP", price: 0.64, change: -0.84, volume: "$2.9B", cap: "$37B", spark: [35, 34, 33, 33, 32, 31, 31] },
  { symbol: "USDT", name: "Tether", price: 1.0, change: 0.02, volume: "$41.2B", cap: "$109B", spark: [10, 10, 10, 10, 10, 10, 10] },
];

const p2pOffers = [
  { merchant: "CryptoHawk", verified: true, orders: 1241, rate: 98.7, price: 89.74, coin: "USDT", fiat: "INR", payment: "UPI / Bank", limit: "₹5,000 - ₹2,00,000", time: "15 min" },
  { merchant: "QuickPeer", verified: true, orders: 893, rate: 97.9, price: 89.92, coin: "BTC", fiat: "INR", payment: "IMPS / UPI", limit: "₹10,000 - ₹5,00,000", time: "20 min" },
  { merchant: "VaultFlow", verified: true, orders: 2044, rate: 99.2, price: 89.61, coin: "USDT", fiat: "INR", payment: "UPI", limit: "₹1,000 - ₹50,000", time: "10 min" },
  { merchant: "BitBridge", verified: false, orders: 176, rate: 95.1, price: 90.12, coin: "ETH", fiat: "INR", payment: "Bank Transfer", limit: "₹20,000 - ₹3,00,000", time: "30 min" },
];

const walletAssets = [
  { asset: "Bitcoin", symbol: "BTC", balance: "0.245", value: "$16,621" },
  { asset: "Ethereum", symbol: "ETH", balance: "3.48", value: "$12,114" },
  { asset: "Tether", symbol: "USDT", balance: "5,940", value: "$5,940" },
  { asset: "Solana", symbol: "SOL", balance: "22.4", value: "$3,638" },
];

const transactions = [
  { type: "Deposit", asset: "USDT", amount: "+2,000", time: "2 min ago", status: "Completed" },
  { type: "P2P Buy", asset: "BTC", amount: "+0.018", time: "45 min ago", status: "Escrow Released" },
  { type: "Withdraw", asset: "ETH", amount: "-0.70", time: "3 hrs ago", status: "Pending" },
  { type: "Spot Sell", asset: "SOL", amount: "-12.0", time: "Today", status: "Completed" },
];

const detailedTransactions = [
  { type: "Deposit", asset: "USDT", amount: "+2,000", time: "Today • 20:41", status: "Completed", method: "TRC20", ref: "DEP-846213", account: "Funding" },
  { type: "Withdraw", asset: "ETH", amount: "-0.70", time: "Today • 17:14", status: "Processing", method: "ERC20", ref: "WDR-220914", account: "Funding" },
  { type: "Spot Buy", asset: "BTC", amount: "+0.028", time: "Today • 15:22", status: "Completed", method: "Market Order", ref: "SPT-511243", account: "Trading" },
  { type: "P2P Order", asset: "USDT", amount: "+850", time: "Today • 13:08", status: "Escrow Released", method: "UPI", ref: "P2P-991726", account: "P2P" },
  { type: "Internal Transfer", asset: "USDT", amount: "-500", time: "Yesterday • 22:10", status: "Completed", method: "Funding → Trading", ref: "TRF-402761", account: "Transfer" },
  { type: "Reward Claim", asset: "USDT", amount: "+12", time: "Yesterday • 18:44", status: "Completed", method: "Bonus Center", ref: "RWD-188245", account: "Rewards" },
];

const quickActions = [
  { label: "Add Funds", hint: "Instant deposit", emoji: "✦" },
  { label: "Rewards", hint: "Claim bonuses", emoji: "★" },
  { label: "Gift Center", hint: "Promo cards", emoji: "🎁" },
  { label: "Refer & Earn", hint: "Invite friends", emoji: "↗" },
  { label: "DApps", hint: "Web3 tools", emoji: "⬢" },
  { label: "Security", hint: "Safe account", emoji: "🔒" },
];

function formatPrice(price) {
  return typeof price === "number" ? `$${price.toLocaleString()}` : price;
}

function Sparkline({ points, height = 56 }) {
  const width = 180;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(max - min, 1);
  const step = width / (points.length - 1);
  const path = points
    .map((value, i) => {
      const x = i * step;
      const y = height - ((value - min) / range) * (height - 10) - 5;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="sparkline" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#sparkGrad)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BigChart() {
  return (
    <div className="chartWrap">
      <Sparkline points={[61, 63, 62, 66, 69, 68, 72, 74, 73, 76]} height={220} />
      <div className="chartLabels">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}

function Badge({ children, tone = "default" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="sectionHeader">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function TopNav({ page, setPage, mobileOpen, setMobileOpen }) {
  const links = ["Home", "Markets", "Exchange", "P2P", "Wallet", "History"];
  return (
    <>
      <header className="topnav">
        <button className="brand" onClick={() => setPage("Home")}>
          <div className="brandTitle">P2PMarket.in</div>
          <div className="brandSub">Crypto Exchange + P2P Marketplace</div>
        </button>

        <nav className="desktopNav">
          {links.map((link) => (
            <button key={link} className={`navLink ${page === link ? "active" : ""}`} onClick={() => setPage(link)}>
              {link}
            </button>
          ))}
        </nav>

        <div className="navRight">
          <Badge tone="green">Live Demo</Badge>
          <button className="ghostBtn desktopOnly">Login</button>
          <button className="primaryBtn desktopOnly">Connect Wallet</button>
          <button className="ghostBtn mobileOnly" onClick={() => setMobileOpen((s) => !s)}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobileMenu">
          {links.map((link) => (
            <button
              key={link}
              className={`mobileMenuLink ${page === link ? "active" : ""}`}
              onClick={() => {
                setPage(link);
                setMobileOpen(false);
              }}
            >
              {link}
            </button>
          ))}
          <div className="mobileMenuActions">
            <button className="ghostBtn">Login</button>
            <button className="primaryBtn">Get Started</button>
          </div>
        </div>
      )}
    </>
  );
}

function Hero({ setPage }) {
  return (
    <section className="hero sectionWrap">
      <div className="heroLeft">
        <Badge tone="violet">Exchange & P2P in one platform</Badge>
        <h1>
          Trade Faster on <span>P2PMarket.in</span>
        </h1>
        <p>
          Buy, sell, swap, and trade with trusted P2P merchants through a cleaner premium exchange UI,
          faster flows, and a sharper mobile experience.
        </p>
        <div className="ctaRow">
          <button className="primaryBtn" onClick={() => setPage("Exchange")}>Start Trading</button>
          <button className="ghostBtn" onClick={() => setPage("P2P")}>Try P2P</button>
        </div>
        <div className="statsGrid">
          {[
            ["1M+", "Active Users"],
            ["100+", "Coins Listed"],
            ["$2B+", "Daily Volume"],
            ["99.9%", "Uptime"],
          ].map(([value, label]) => (
            <Card key={label}>
              <div className="statValue">{value}</div>
              <div className="mutedText">{label}</div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="heroPanel">
        <div className="panelTop">
          <div className="dots"><span /><span /><span /></div>
          <div className="mutedText">P2PMarket.in Exchange</div>
          <Badge tone="green">Live</Badge>
        </div>
        <div className="miniGrid">
          {marketData.slice(0, 2).map((coin) => (
            <Card key={coin.symbol} className="miniCard">
              <div className="mutedText">{coin.symbol} / USDT</div>
              <div className="miniPrice">{formatPrice(coin.price)}</div>
              <div className={coin.change >= 0 ? "upText" : "downText"}>
                {coin.change >= 0 ? "↑" : "↓"} {Math.abs(coin.change)}% (24h)
              </div>
              <Sparkline points={coin.spark} />
            </Card>
          ))}
        </div>
        <div className="miniGrid twoCols">
          <Card className="miniCard">
            <div className="mutedText">24h Volume</div>
            <div className="miniPrice">$2.1B</div>
            <div className="upText">↑ Record high</div>
          </Card>
          <Card className="miniCard">
            <div className="mutedText">Trading Fee</div>
            <div className="miniPrice">0.1%</div>
            <div className="upText">Lowest rate</div>
          </Card>
        </div>
        <Card className="chartCard">
          <div className="spaceBetween">
            <div>
              <div className="mutedText">BTC Price Chart</div>
              <div className="panelTitle">7D Trend</div>
            </div>
            <Badge tone="violet">Instant Swap</Badge>
          </div>
          <BigChart />
        </Card>
      </Card>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <div className="pageStack">
      <Hero setPage={setPage} />

      <section className="sectionWrap twoColWide">
        <Card className="gradientCyan">
          <div className="spaceBetween wrapGap">
            <div>
              <Badge>Dashboard Overview</Badge>
              <div className="mutedText topSpace">Total Balance</div>
              <div className="megaValue">$88.24</div>
              <div className="inlineMeta">
                <span className="downText">-$114.2 • -56.41%</span>
                <span className="mutedText">Today’s PnL</span>
              </div>
            </div>
            <div className="actionStack">
              <button className="cyanBtn">Add Funds</button>
              <div className="twoBtnGrid">
                <button className="ghostBtn">Deposit</button>
                <button className="ghostBtn">Withdraw</button>
              </div>
            </div>
          </div>

          <div className="quickGrid topBlock">
            {quickActions.map((item) => (
              <button key={item.label} className="quickAction">
                <div className="quickIcon">{item.emoji}</div>
                <div>
                  <div className="quickTitle">{item.label}</div>
                  <div className="quickHint">{item.hint}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="stackGap">
          <Card className="gradientGreen">
            <Badge tone="green">Trading Spotlight</Badge>
            <div className="cardHeadline">BTC momentum stays strong.</div>
            <p className="mutedPara">Fast market conditions, clean execution, and sharper mobile flows make this feel like a live exchange instead of a static landing page.</p>
            <div className="tagRow">
              <Badge>BTCUSDT</Badge>
              <Badge tone="green">+2.34%</Badge>
              <Badge tone="cyan">Hot Pick</Badge>
            </div>
            <button className="greenBtn" onClick={() => setPage("Exchange")}>Trade now</button>
          </Card>

          <div className="twoCol">
            <Card>
              <div className="mutedText">Rewards & Gift Center</div>
              <div className="subHeadline">Claim bonus drops</div>
              <p className="mutedPara">Daily check-in, task rewards, invite bonuses, and gift cards.</p>
            </Card>
            <Card>
              <div className="mutedText">Activity Snapshot</div>
              <div className="subHeadline">4 recent actions</div>
              <p className="mutedPara">Wallet moves, spot trades, P2P releases, and reward claims feel active.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="sectionWrap">
        <SectionHeader
          eyebrow="Quick Market Pulse"
          title="Hot picks, movers, and watchlist-ready cards"
          action={<button className="ghostBtn desktopOnly" onClick={() => setPage("Markets")}>Open Markets</button>}
        />
        <div className="chipRow">
          {['Favorites', 'Hot Picks', 'Top Gainers', 'New', 'Alerts'].map((chip) => (
            <button key={chip} className="chipBtn">{chip}</button>
          ))}
        </div>
        <div className="threeCol">
          {marketData.slice(0, 3).map((coin) => (
            <Card key={coin.symbol}>
              <div className="spaceBetween">
                <div>
                  <div className="coinTitle">{coin.name}</div>
                  <div className="mutedText">{coin.symbol} / USDT</div>
                </div>
                <Badge tone={coin.change >= 0 ? "green" : "red"}>{coin.change >= 0 ? "+" : ""}{coin.change}%</Badge>
              </div>
              <div className="cardPrice">{formatPrice(coin.price)}</div>
              <Sparkline points={coin.spark} />
              <div className="twoBtnGrid topSpace">
                <button className="primaryBtn">Buy</button>
                <button className="ghostBtn">Alert</button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="sectionWrap twoColWide bottomPad">
        <Card className="gradientViolet">
          <Badge tone="green">Escrow Protected P2P</Badge>
          <div className="cardHeadline large">P2P should feel like a real exchange desk.</div>
          <p className="mutedPara">More merchant stats, faster payment flow, cleaner offer cards, timer states, and dispute placeholders help the P2P page feel more trustworthy and advanced.</p>
          <div className="twoCol topBlock">
            {['Browse verified offers', 'Escrow is locked', 'Pay with UPI / bank', 'Seller releases crypto'].map((step, i) => (
              <div key={step} className="stepItem">
                <div className="stepIndex">{i + 1}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="ctaRow topSpace">
            <button className="primaryBtn" onClick={() => setPage("P2P")}>Open P2P Desk</button>
            <button className="ghostBtn" onClick={() => setPage("History")}>View Order History</button>
          </div>
        </Card>

        <div className="stackGap">
          {detailedTransactions.slice(0, 3).map((entry) => (
            <Card key={entry.ref} className="darkCard">
              <div className="spaceBetween">
                <div>
                  <div className="coinTitle">{entry.type}</div>
                  <div className="mutedText">{entry.time} • {entry.account}</div>
                </div>
                <Badge>{entry.status}</Badge>
              </div>
              <div className="twoCol topSpace">
                <div className="infoBox">
                  <div className="mutedText">Asset</div>
                  <div>{entry.asset}</div>
                </div>
                <div className="infoBox">
                  <div className="mutedText">Amount</div>
                  <div>{entry.amount}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function MarketsPage() {
  const [tab, setTab] = useState("Hot Picks");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let rows = [...marketData];
    if (tab === "Favorites") rows = rows.slice(0, 2);
    if (tab === "Hot Picks") rows = [marketData[2], marketData[0], marketData[1], marketData[3]];
    if (tab === "Top Gainers") rows = [...marketData].sort((a, b) => b.change - a.change).filter((c) => c.change > 0);
    if (tab === "New") rows = [marketData[4], marketData[2], marketData[3]];
    if (tab === "Losers") rows = rows.filter((c) => c.change < 0);
    if (query) rows = rows.filter((c) => `${c.name} ${c.symbol}`.toLowerCase().includes(query.toLowerCase()));
    return rows;
  }, [tab, query]);

  return (
    <section className="sectionWrap pageTop pageStack bottomPad">
      <SectionHeader eyebrow="Markets" title="Sharpened market discovery" />
      <div className="toolbarRow">
        <input className="searchInput" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search coins" />
      </div>
      <div className="chipRow">
        {['Favorites', 'Hot Picks', 'All', 'New', 'Top Gainers', 'Losers'].map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`chipBtn ${tab === item ? 'activeChip' : ''}`}>{item}</button>
        ))}
      </div>
      <Card>
        <div className="spaceBetween wrapGap">
          <div className="mutedPara">Enable alerts to get the latest hot picks and unusual movers on mobile.</div>
          <div className="inlineMeta">
            <Badge>24h</Badge>
            <button className="cyanBtn smallBtn">Enable</button>
          </div>
        </div>
      </Card>
      <div className="stackGap">
        {filtered.map((coin) => (
          <Card key={coin.symbol}>
            <div className="marketRow">
              <div>
                <div className="coinTitle">{coin.name}</div>
                <div className="mutedText">{coin.symbol}</div>
              </div>
              <div className="marketMeta">
                <div>{formatPrice(coin.price)}</div>
                <Badge tone={coin.change >= 0 ? "green" : "red"}>{coin.change >= 0 ? '+' : ''}{coin.change}%</Badge>
              </div>
            </div>
            <Sparkline points={coin.spark} />
            <div className="marketMetaGrid">
              <div className="infoBox"><div className="mutedText">Cap</div><div>{coin.cap}</div></div>
              <div className="infoBox"><div className="mutedText">Vol</div><div>{coin.volume}</div></div>
            </div>
            <div className="twoBtnGrid topSpace">
              <button className="primaryBtn">Trade</button>
              <button className="ghostBtn">Alert</button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ExchangePage() {
  const [mode, setMode] = useState("buy");
  return (
    <section className="sectionWrap pageTop pageStack bottomPad">
      <SectionHeader eyebrow="Exchange" title="Spot trading dashboard" />
      <div className="tagRow">
        <Badge tone="green">BTC/USDT Live</Badge>
        <Badge>Fee 0.10%</Badge>
        <Badge tone="violet">Low Slippage</Badge>
      </div>
      <div className="twoColWide">
        <Card>
          <div className="spaceBetween wrapGap">
            <div className="inlineMeta"><button className="ghostBtn">BTC / USDT</button><Badge tone="green">+2.34%</Badge></div>
            <div className="mutedText">24h High: 68,002 • 24h Low: 64,891</div>
          </div>
          <BigChart />
          <div className="threeCol topSpace">
            {[["Open Orders", "08"], ["Filled Today", "14"], ["Available Balance", "$24,590"]].map(([k, v]) => (
              <div key={k} className="infoBox"><div className="mutedText">{k}</div><div className="coinTitle">{v}</div></div>
            ))}
          </div>
        </Card>

        <Card className="darkCard">
          <div className="segmented">
            <button className={mode === "buy" ? "segActive buyTone" : "segBtn"} onClick={() => setMode("buy")}>Buy</button>
            <button className={mode === "sell" ? "segActive sellTone" : "segBtn"} onClick={() => setMode("sell")}>Sell</button>
          </div>
          <div className="tabRow topSpace">
            {['Market', 'Limit', 'Stop'].map((t, i) => <button key={t} className={i === 0 ? 'smallChip activeChip' : 'smallChip'}>{t}</button>)}
          </div>
          {[['Price', '$67,842.30'], ['Amount', mode === 'buy' ? '0.25 BTC' : '0.18 BTC'], ['Total', mode === 'buy' ? '$16,960.57' : '$12,211.61'], ['Fee', '0.10%']].map(([k, v]) => (
            <div key={k} className="formRow"><span>{k}</span><strong>{v}</strong></div>
          ))}
          <div className="tabRow topSpace">
            {['25%', '50%', '75%', '100%'].map((x) => <button key={x} className="smallChip">{x}</button>)}
          </div>
          <button className={mode === 'buy' ? 'greenBtn fullBtn' : 'dangerBtn fullBtn'}>{mode === 'buy' ? 'Buy BTC' : 'Sell BTC'}</button>
          <div className="mutedPara infoBox topSpace">Fee preview, order validation, and mobile-first controls are laid out like a real trading panel.</div>
        </Card>
      </div>

      <div className="twoColWide">
        <Card>
          <div className="coinTitle">Open Orders</div>
          <div className="stackGap topSpace">
            {[
              ['Limit Buy BTC', '$66,920', '0.15 BTC', 'Open'],
              ['Market Sell ETH', '$3,480', '1.2 ETH', 'Filled'],
              ['Stop Buy SOL', '$158.10', '18 SOL', 'Pending'],
            ].map(([a, b, c, d]) => (
              <div key={a} className="listRow">
                <div><div>{a}</div><div className="mutedText">{b} • {c}</div></div>
                <Badge>{d}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="coinTitle">Recent Trades</div>
          <div className="stackGap topSpace">
            {[['BTC', '$67,842', '+0.0041'], ['ETH', '$3,481', '+1.24'], ['SOL', '$162.40', '-5.10']].map(([a, b, c]) => (
              <div key={a} className="listRow">
                <div><div>{a}</div><div className="mutedText">Market trade</div></div>
                <div className="rightText"><div>{b}</div><div className="upText">{c}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function P2PPage() {
  const [mode, setMode] = useState("Buy");
  return (
    <section className="sectionWrap pageTop pageStack bottomPad">
      <SectionHeader eyebrow="P2P Marketplace" title="More exchange-like, sharper, and safer" />
      <div className="fourCol">
        {[["Active Offers", "1,248"], ["Avg Release", "11 min"], ["Verified Merchants", "326"], ["Escrow Uptime", "99.9%"]].map(([k, v]) => (
          <Card key={k}><div className="mutedText">{k}</div><div className="cardHeadline">{v}</div></Card>
        ))}
      </div>
      <div className="twoColWide">
        <Card>
          <div className="spaceBetween wrapGap">
            <div className="segmented smallSeg">
              {['Buy', 'Sell'].map((item) => (
                <button key={item} className={mode === item ? 'segActive violetTone' : 'segBtn'} onClick={() => setMode(item)}>{item}</button>
              ))}
            </div>
            <div className="filterGrid">
              {['Coin: USDT', 'Fiat: INR', 'Payment: UPI', 'Amount: Any'].map((x) => <button key={x} className="ghostBtn filterBtn">{x} ▾</button>)}
            </div>
          </div>
          <div className="stackGap topBlock">
            {p2pOffers.map((offer) => (
              <Card key={offer.merchant} className="darkCard">
                <div className="p2pGrid">
                  <div>
                    <div className="merchantRow">
                      <div className="coinTitle">{offer.merchant}</div>
                      <Badge tone={offer.verified ? 'green' : 'red'}>{offer.verified ? 'Online' : 'Review'}</Badge>
                    </div>
                    <div className="mutedText topMini">{offer.orders} orders • {offer.rate}% completion • Avg release {offer.time}</div>
                    <div className="tagRow topMini">
                      <Badge>Escrow Protected</Badge>
                      <Badge tone="violet">{offer.payment}</Badge>
                      <Badge tone="cyan">Merchant Verified</Badge>
                    </div>
                  </div>
                  <div className="marketMetaGrid">
                    <div className="infoBox"><div className="mutedText">Price</div><div>₹{offer.price}</div></div>
                    <div className="infoBox"><div className="mutedText">Limit</div><div>{offer.limit}</div></div>
                    <div className="infoBox wideBox"><div className="mutedText">Payment window</div><div>{offer.time} • UPI / Bank instructions visible after order</div></div>
                  </div>
                  <div className="p2pActionCol">
                    <div className="mutedPara infoBox">Order timer, chat box, payment proof upload, and dispute action can live in the trade drawer.</div>
                    <div className="twoBtnGrid">
                      <button className="ghostBtn">Details</button>
                      <button className="primaryBtn">{mode} {offer.coin}</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
        <div className="stackGap">
          <Card>
            <div className="coinTitle">Trade Status Tracker</div>
            <div className="stackGap topSpace">
              {['Order placed', 'Awaiting payment', 'Marked as paid', 'Seller confirms', 'Crypto released'].map((step, i) => (
                <div key={step} className="stepItem">
                  <div className={`stepIndex ${i > 2 ? 'dimStep' : ''}`}>{i + 1}</div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="coinTitle">Payment & Safety</div>
            <div className="stackGap topSpace">
              <div className="infoBox">Timer for order expiry: <strong>14:32</strong></div>
              <div className="infoBox">Payment instruction box, chat placeholder, and proof upload area should appear inside the active order state.</div>
              <div className="infoBox">Dispute button, trust checklist, and merchant safety FAQ improve confidence on mobile.</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function WalletPage({ setPage }) {
  const [walletTab, setWalletTab] = useState("Funding");
  return (
    <section className="sectionWrap pageTop pageStack bottomPad">
      <SectionHeader eyebrow="Wallet & Assets" title="Portfolio dashboard" action={<div className="tabRow"><button className="cyanBtn smallBtn">Deposit</button><button className="ghostBtn">Withdraw</button><button className="ghostBtn">Transfer</button></div>} />
      <div className="twoColWide">
        <Card className="gradientCyan">
          <div className="mutedText">Total Portfolio Balance</div>
          <div className="megaValue">$38,313</div>
          <div className="inlineMeta"><span className="upText">+8.41% this week</span><span className="mutedText">Today’s PnL: +$1,204</span></div>
          <div className="topBlock"><BigChart /></div>
          <div className="tabRow topSpace">
            {['Funding', 'Trading', 'Rewards'].map((tab) => (
              <button key={tab} className={walletTab === tab ? 'smallChip activeChip' : 'smallChip'} onClick={() => setWalletTab(tab)}>{tab}</button>
            ))}
          </div>
        </Card>
        <Card>
          <div className="spaceBetween wrapGap">
            <div className="coinTitle">Asset List</div>
            <input className="searchInput compact" placeholder="Search assets" />
          </div>
          <div className="stackGap topSpace">
            {walletAssets.map((asset) => (
              <div key={asset.symbol} className="listRow">
                <div><div>{asset.asset}</div><div className="mutedText">{asset.symbol} • {walletTab}</div></div>
                <div className="rightText"><div>{asset.balance}</div><div className="mutedText">{asset.value}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="twoColWide">
        <Card>
          <div className="spaceBetween wrapGap">
            <div className="coinTitle">Recent Transactions</div>
            <button className="ghostBtn" onClick={() => setPage('History')}>View full history</button>
          </div>
          <div className="stackGap topSpace">
            {transactions.map((tx) => (
              <div key={`${tx.type}-${tx.time}`} className="listRow">
                <div><div>{tx.type} • {tx.asset}</div><div className="mutedText">{tx.time}</div></div>
                <div className="inlineMeta"><div>{tx.amount}</div><Badge>{tx.status}</Badge></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="coinTitle">Rewards & Utility</div>
          <div className="twoCol topSpace">
            {[['Rewards Hub', 'Claim daily bonuses'], ['Gift Center', 'Voucher & promo cards'], ['Refer & Earn', 'Invite-based rewards'], ['Task Center', 'Mission progress']].map(([title, text]) => (
              <div key={title} className="infoBox"><div>{title}</div><div className="mutedText topMini">{text}</div></div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function HistoryPage() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    let items = [...detailedTransactions];
    if (tab === 'Deposits') items = items.filter((x) => x.type.includes('Deposit'));
    if (tab === 'Withdrawals') items = items.filter((x) => x.type.includes('Withdraw'));
    if (tab === 'Spot Trades') items = items.filter((x) => x.type.includes('Spot'));
    if (tab === 'P2P Orders') items = items.filter((x) => x.type.includes('P2P'));
    if (tab === 'Transfers') items = items.filter((x) => x.type.includes('Transfer'));
    if (tab === 'Rewards') items = items.filter((x) => x.type.includes('Reward'));
    if (query) items = items.filter((x) => `${x.type} ${x.asset} ${x.ref} ${x.method}`.toLowerCase().includes(query.toLowerCase()));
    return items;
  }, [tab, query]);

  return (
    <section className="sectionWrap pageTop pageStack bottomPad">
      <SectionHeader eyebrow="History" title="Transaction history" />
      <div className="toolbarRow"><input className="searchInput" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by asset or reference" /></div>
      <div className="chipRow">
        {['All', 'Deposits', 'Withdrawals', 'Spot Trades', 'P2P Orders', 'Transfers', 'Rewards'].map((item) => (
          <button key={item} className={`chipBtn ${tab === item ? 'activeChip' : ''}`} onClick={() => setTab(item)}>{item}</button>
        ))}
      </div>
      <div className="chipRow compactRow">
        {['Date Range', 'Asset', 'Status', 'Account Type'].map((x) => <button key={x} className="ghostBtn filterBtn">{x} ▾</button>)}
      </div>
      <div className="stackGap">
        {rows.map((entry) => (
          <Card key={entry.ref}>
            <div className="historyGrid">
              <div>
                <div className="coinTitle">{entry.type}</div>
                <div className="mutedText topMini">{entry.time} • {entry.method}</div>
                <div className="tinyText topMini">Ref: {entry.ref}</div>
              </div>
              <div className="marketMetaGrid historyMeta">
                <div className="infoBox"><div className="mutedText">Asset</div><div>{entry.asset}</div></div>
                <div className="infoBox"><div className="mutedText">Amount</div><div>{entry.amount}</div></div>
                <div className="infoBox"><div className="mutedText">Account</div><div>{entry.account}</div></div>
                <div className="statusBox"><Badge>{entry.status}</Badge></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="sectionWrap footerGrid">
        <div>
          <div className="brandTitle footTitle">P2PMarket.in</div>
          <p className="mutedPara maxW">Premium crypto exchange and P2P marketplace concept with cleaner branding, polished sections, and better desktop + mobile presentation.</p>
        </div>
        <div>
          <div className="footHeading">Product</div>
          <div className="footLinks">
            {['Markets', 'Exchange', 'P2P', 'Wallet', 'History'].map((x) => <button key={x} onClick={() => setPage(x)}>{x}</button>)}
          </div>
        </div>
        <div>
          <div className="footHeading">Trust</div>
          <div className="footLinks staticText">
            <div>Escrow Protected</div>
            <div>Secure Access</div>
            <div>Global Support</div>
          </div>
        </div>
        <div>
          <div className="footHeading">Highlights</div>
          <div className="footLinks staticText">
            <div>Live market look</div>
            <div>P2P payment support</div>
            <div>Conversion-focused UI</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [page, setPage] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="appShell">
        <div className="bgOrbs" />
        <TopNav page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        {page === "Home" && <HomePage setPage={setPage} />}
        {page === "Markets" && <MarketsPage />}
        {page === "Exchange" && <ExchangePage />}
        {page === "P2P" && <P2PPage />}
        {page === "Wallet" && <WalletPage setPage={setPage} />}
        {page === "History" && <HistoryPage />}
        <Footer setPage={setPage} />

        <div className="bottomNav">
          {[
            ["Home", "⌂"],
            ["Markets", "↗"],
            ["Exchange", "⇄"],
            ["P2P", "◎"],
            ["Wallet", "◔"],
          ].map(([label, icon]) => (
            <button key={label} onClick={() => setPage(label)} className={`bottomNavBtn ${page === label ? "active" : ""} ${label === 'Exchange' ? 'tradeFab' : ''}`}>
              <span>{icon}</span>
              <small>{label === 'Exchange' ? 'Trade' : label}</small>
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        :root {
          --bg: #05030b;
          --panel: rgba(255,255,255,0.04);
          --panel-2: rgba(255,255,255,0.03);
          --line: rgba(255,255,255,0.08);
          --text: #ffffff;
          --muted: rgba(255,255,255,0.58);
          --violet: #8b5cf6;
          --fuchsia: #d946ef;
          --cyan: #22d3ee;
          --green: #34d399;
          --red: #fb7185;
          --shadow: 0 18px 60px rgba(0,0,0,0.35);
        }
        * { box-sizing: border-box; }
        html, body, #__next { margin: 0; padding: 0; min-height: 100%; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        button, input { font: inherit; }
        button { cursor: pointer; }
        .appShell { position: relative; min-height: 100vh; overflow-x: hidden; background: var(--bg); }
        .bgOrbs {
          position: fixed; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at top left, rgba(34,211,238,.10), transparent 24%),
            radial-gradient(circle at top right, rgba(168,85,247,.16), transparent 26%),
            radial-gradient(circle at bottom center, rgba(236,72,153,.10), transparent 28%),
            linear-gradient(to bottom, rgba(255,255,255,.015) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,.015) 1px, transparent 1px);
          background-size: auto, auto, auto, 42px 42px, 42px 42px;
          opacity: 1;
        }
        .sectionWrap { width: min(1180px, calc(100% - 32px)); margin: 0 auto; }
        .pageTop { padding-top: 34px; }
        .pageStack { display: flex; flex-direction: column; gap: 28px; }
        .topnav {
          position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 16px 0;
          backdrop-filter: blur(18px);
        }
        .topnav::before {
          content: ""; position: absolute; inset: 0 -18px; border-bottom: 1px solid var(--line); background: rgba(7,4,15,.68); backdrop-filter: blur(18px); z-index: -1;
          box-shadow: 0 10px 50px rgba(0,0,0,.35);
        }
        .brand { display: flex; flex-direction: column; gap: 3px; border: none; background: transparent; color: var(--text); padding: 0; text-align: left; }
        .brandTitle { font-size: 22px; font-weight: 900; letter-spacing: -.04em; background: linear-gradient(90deg,#fff,#ddd6fe,#a5f3fc); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .brandSub { font-size: 12px; color: rgba(255,255,255,.45); }
        .desktopNav { display: flex; align-items: center; gap: 6px; }
        .navLink, .ghostBtn, .primaryBtn, .cyanBtn, .greenBtn, .dangerBtn, .chipBtn, .smallChip, .filterBtn {
          border-radius: 16px; border: 1px solid transparent; padding: 11px 16px; transition: .2s ease; text-decoration: none;
        }
        .navLink { background: transparent; color: rgba(255,255,255,.72); border: none; }
        .navLink:hover, .chipBtn:hover, .ghostBtn:hover, .smallChip:hover { background: rgba(255,255,255,.08); color: #fff; }
        .navLink.active { background: rgba(255,255,255,.1); color: #fff; }
        .navRight, .inlineMeta, .tagRow, .ctaRow, .tabRow, .toolbarRow, .chipRow { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .desktopOnly { display: inline-flex; }
        .mobileOnly { display: none; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; border: 1px solid var(--line); background: rgba(255,255,255,.06); color: #fff; }
        .badge-green { background: rgba(52,211,153,.12); color: #86efac; border-color: rgba(52,211,153,.18); }
        .badge-violet { background: rgba(168,85,247,.12); color: #ddd6fe; border-color: rgba(168,85,247,.18); }
        .badge-cyan { background: rgba(34,211,238,.12); color: #a5f3fc; border-color: rgba(34,211,238,.18); }
        .badge-red { background: rgba(251,113,133,.12); color: #fda4af; border-color: rgba(251,113,133,.18); }
        .primaryBtn { background: linear-gradient(90deg, var(--violet), var(--fuchsia), var(--cyan)); color: #fff; border: none; box-shadow: 0 0 34px rgba(168,85,247,.34); }
        .primaryBtn:hover { transform: translateY(-1px) scale(1.01); }
        .ghostBtn { background: rgba(255,255,255,.06); color: #fff; border-color: var(--line); backdrop-filter: blur(16px); }
        .cyanBtn { background: var(--cyan); color: #041116; border: none; font-weight: 700; }
        .greenBtn { background: linear-gradient(90deg, #22c55e, #34d399, #22d3ee); color: #041116; border: none; font-weight: 700; }
        .dangerBtn { background: linear-gradient(90deg, #f43f5e, #fb7185, #fb923c); color: #fff; border: none; font-weight: 700; }
        .smallBtn { padding: 10px 14px; }
        .card {
          border: 1px solid var(--line); background: rgba(255,255,255,.04); backdrop-filter: blur(18px); box-shadow: var(--shadow);
          border-radius: 28px; padding: 22px;
        }
        .darkCard { background: rgba(13,9,23,.88); }
        .gradientCyan { background: linear-gradient(135deg, rgba(34,211,238,.10), rgba(12,9,23,.96), rgba(168,85,247,.10)); }
        .gradientGreen { background: linear-gradient(135deg, rgba(34,197,94,.10), rgba(8,13,18,.96), rgba(34,211,238,.10)); }
        .gradientViolet { background: linear-gradient(135deg, rgba(168,85,247,.12), rgba(18,10,36,.96), rgba(236,72,153,.10)); }
        .hero { display: grid; gap: 28px; align-items: center; padding-top: 26px; padding-bottom: 12px; }
        .heroLeft h1 { margin: 16px 0 0; font-size: clamp(3rem, 6vw, 5.4rem); line-height: .92; letter-spacing: -.04em; max-width: 760px; }
        .heroLeft h1 span { background: linear-gradient(90deg, #c084fc, #f0abfc, #fb923c); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .heroLeft p { max-width: 620px; font-size: 18px; line-height: 1.8; color: rgba(255,255,255,.65); }
        .heroPanel { position: relative; overflow: hidden; background: rgba(13,9,23,.90); }
        .panelTop, .spaceBetween, .marketRow, .merchantRow, .listRow, .formRow { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .dots { display: flex; gap: 8px; }
        .dots span { width: 10px; height: 10px; border-radius: 999px; display: inline-block; }
        .dots span:nth-child(1) { background: #fb7185; }
        .dots span:nth-child(2) { background: #fbbf24; }
        .dots span:nth-child(3) { background: #34d399; }
        .miniGrid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; margin-top: 16px; }
        .miniGrid.twoCols { grid-template-columns: repeat(2, minmax(0,1fr)); }
        .miniCard { padding: 16px; border-radius: 22px; }
        .miniPrice, .cardPrice, .panelTitle, .coinTitle, .subHeadline, .cardHeadline, .megaValue, .statValue { font-weight: 800; }
        .miniPrice { font-size: 34px; margin-top: 8px; }
        .panelTitle { font-size: 20px; }
        .cardPrice { font-size: 32px; margin: 14px 0 8px; }
        .coinTitle { font-size: 19px; }
        .subHeadline { font-size: 28px; margin-top: 8px; }
        .cardHeadline { font-size: 36px; margin-top: 12px; }
        .cardHeadline.large { max-width: 650px; }
        .megaValue { font-size: clamp(3rem, 5vw, 4.5rem); margin-top: 6px; }
        .statValue { font-size: 30px; }
        .mutedText, .mutedPara, .tinyText { color: var(--muted); }
        .mutedPara { line-height: 1.8; }
        .tinyText { font-size: 12px; }
        .upText { color: #86efac; }
        .downText { color: #fda4af; }
        .topSpace { margin-top: 12px; }
        .topMini { margin-top: 6px; }
        .topBlock { margin-top: 20px; }
        .stackGap { display: grid; gap: 16px; }
        .twoColWide { display: grid; gap: 24px; }
        .twoCol, .twoBtnGrid, .marketMetaGrid { display: grid; gap: 14px; }
        .threeCol, .fourCol, .quickGrid { display: grid; gap: 14px; }
        .quickAction { display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 22px; background: rgba(255,255,255,.04); border: 1px solid var(--line); color: #fff; text-align: left; }
        .quickIcon { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 16px; background: linear-gradient(90deg, rgba(139,92,246,.22), rgba(217,70,239,.18)); }
        .quickTitle { font-weight: 700; }
        .quickHint { font-size: 12px; color: rgba(255,255,255,.45); margin-top: 4px; }
        .chipBtn, .smallChip { background: rgba(255,255,255,.04); color: rgba(255,255,255,.75); border-color: var(--line); }
        .activeChip { background: linear-gradient(90deg, var(--violet), var(--fuchsia)); color: #fff !important; border-color: transparent; }
        .filterBtn { min-width: fit-content; }
        .infoBox, .formRow, .listRow, .stepItem { border-radius: 20px; border: 1px solid var(--line); background: rgba(255,255,255,.03); padding: 14px 16px; }
        .stepItem { display: flex; align-items: center; gap: 12px; }
        .stepIndex { width: 34px; height: 34px; border-radius: 999px; display: grid; place-items: center; background: linear-gradient(90deg, var(--violet), var(--fuchsia)); font-weight: 800; }
        .dimStep { background: rgba(255,255,255,.10); color: rgba(255,255,255,.58); }
        .chartWrap { margin-top: 14px; }
        .chartLabels { display: flex; justify-content: space-between; color: rgba(255,255,255,.45); font-size: 12px; margin-top: 10px; }
        .sparkline { width: 100%; height: 100%; min-height: 56px; margin-top: 8px; }
        .sectionHeader { display: flex; justify-content: space-between; align-items: end; gap: 16px; margin-bottom: 18px; }
        .sectionHeader h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); margin: 6px 0 0; }
        .eyebrow { color: #c4b5fd; font-size: 12px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; }
        .searchInput {
          width: min(100%, 420px); border-radius: 18px; border: 1px solid var(--line); background: rgba(255,255,255,.04); color: #fff; padding: 14px 16px;
          outline: none; box-shadow: var(--shadow);
        }
        .searchInput.compact { width: 260px; }
        .searchInput::placeholder { color: rgba(255,255,255,.35); }
        .marketMeta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
        .historyMeta { min-width: min(100%, 680px); }
        .historyGrid, .p2pGrid { display: grid; gap: 16px; }
        .statusBox { display: flex; align-items: center; justify-content: flex-end; }
        .rightText { text-align: right; }
        .segmented { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 6px; background: rgba(255,255,255,.05); padding: 6px; border-radius: 18px; }
        .smallSeg { width: 220px; }
        .segBtn, .segActive { padding: 12px 14px; border-radius: 14px; border: none; background: transparent; color: rgba(255,255,255,.7); }
        .segActive { color: #fff; }
        .buyTone { background: rgba(16,185,129,.18); color: #86efac; }
        .sellTone { background: rgba(244,63,94,.18); color: #fda4af; }
        .violetTone { background: linear-gradient(90deg, rgba(139,92,246,.30), rgba(217,70,239,.26)); }
        .fullBtn { width: 100%; margin-top: 14px; }
        .formRow { margin-top: 12px; }
        .filterGrid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; width: 100%; }
        .p2pActionCol { display: flex; flex-direction: column; justify-content: space-between; gap: 12px; }
        .wideBox { grid-column: span 2; }
        .footer { border-top: 1px solid var(--line); background: #05030a; margin-top: 24px; padding-bottom: 90px; }
        .footerGrid { display: grid; gap: 24px; padding-top: 36px; padding-bottom: 36px; }
        .footTitle { color: white; background: none; }
        .footHeading { font-weight: 700; margin-bottom: 10px; }
        .footLinks { display: grid; gap: 8px; }
        .footLinks button { background: transparent; border: none; color: rgba(255,255,255,.58); padding: 0; text-align: left; }
        .footLinks button:hover { color: #fff; }
        .staticText { color: rgba(255,255,255,.58); }
        .maxW { max-width: 320px; }
        .bottomNav {
          position: fixed; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 25; width: min(520px, calc(100% - 24px));
          display: none; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 8px; padding: 10px; border-radius: 26px;
          border: 1px solid var(--line); background: rgba(11,7,18,.86); backdrop-filter: blur(20px); box-shadow: 0 16px 50px rgba(0,0,0,.35);
        }
        .bottomNavBtn {
          border: none; background: transparent; color: rgba(255,255,255,.55); display: flex; flex-direction: column; gap: 4px; align-items: center; justify-content: center;
          padding: 10px 6px; border-radius: 18px; min-height: 58px;
        }
        .bottomNavBtn.active { background: rgba(255,255,255,.10); color: #fff; }
        .bottomNavBtn.tradeFab {
          transform: translateY(-18px); border-radius: 22px; background: linear-gradient(90deg, var(--violet), var(--fuchsia), var(--cyan)); color: #fff; box-shadow: 0 10px 35px rgba(168,85,247,.42);
        }
        .bottomNavBtn small { font-size: 11px; }
        .mobileMenu {
          width: min(1180px, calc(100% - 32px)); margin: 0 auto; display: none; flex-direction: column; gap: 10px; padding: 0 0 12px;
        }
        .mobileMenuLink {
          width: 100%; text-align: left; border-radius: 18px; border: 1px solid var(--line); background: rgba(255,255,255,.04); color: rgba(255,255,255,.78); padding: 14px 16px;
        }
        .mobileMenuLink.active { background: rgba(255,255,255,.10); color: #fff; }
        .mobileMenuActions { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        .compactRow { gap: 10px; }
        .bottomPad { padding-bottom: 28px; }

        @media (min-width: 900px) {
          .hero, .twoColWide { grid-template-columns: 1.08fr .92fr; }
          .twoCol { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .threeCol { grid-template-columns: repeat(3, minmax(0,1fr)); }
          .fourCol { grid-template-columns: repeat(4, minmax(0,1fr)); }
          .quickGrid { grid-template-columns: repeat(3, minmax(0,1fr)); }
          .marketMetaGrid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .historyGrid { grid-template-columns: .9fr 1.1fr; align-items: center; }
          .p2pGrid { grid-template-columns: 1.25fr .95fr .85fr; }
          .footerGrid { grid-template-columns: 1.2fr .8fr .8fr .8fr; }
        }
        @media (max-width: 899px) {
          .desktopNav, .desktopOnly { display: none; }
          .mobileOnly, .mobileMenu { display: flex; }
          .bottomNav { display: grid; }
          .footer { padding-bottom: 110px; }
          .sectionHeader { align-items: flex-start; flex-direction: column; }
          .filterGrid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .smallSeg { width: 100%; }
          .heroLeft p { font-size: 16px; }
          .cardHeadline { font-size: 28px; }
          .miniGrid, .threeCol, .fourCol, .quickGrid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .sectionWrap { width: calc(100% - 20px); }
          .topnav { width: calc(100% - 20px); }
          .topnav::before { inset: 0 -10px; }
          .brandTitle { font-size: 20px; }
          .heroLeft h1 { font-size: 2.7rem; }
          .card { padding: 18px; border-radius: 24px; }
          .miniGrid.twoCols, .twoBtnGrid, .twoCol, .marketMetaGrid { grid-template-columns: 1fr; }
          .historyMeta { min-width: 100%; }
          .searchInput { width: 100%; }
          .searchInput.compact { width: 100%; }
        }
      `}</style>
    </>
  );
}
