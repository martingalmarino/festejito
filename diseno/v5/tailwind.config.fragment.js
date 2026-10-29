// Festejito · Confite v3. Paleta basada en cumpleplan.vercel.app (verde #237A32 sobre crema #FFFDF7)
module.exports = { theme: { extend: {
  colors: {
    brand:{50:'#EDF7EA',100:'#D3EBCC',500:'#339933',700:'#237A32',800:'#195D26',900:'#12441C'}, // 700 = acción (5.4:1 con blanco), 800 = hover
    accent:{100:'#EDF3FF',600:'#3366CC',800:'#244FA8'},  // verificado / links
    sun:{200:'#FFF7D9',400:'#F5B800',800:'#8A4B12'},     // destacado (texto 800 sobre 200: 6.3:1)
    danger:{100:'#F8E8E6',700:'#8C2F2F'},                // error / cerrado (6.9:1)
    peach:{100:'#FFF0E8',500:'#FF6633'},                 // decorativo, no se usa en texto
    ink:{900:'#17324D',700:'#2C4760',500:'#526477',300:'#B8C4CF',200:'#DCE3E8',100:'#F0F4F8'},
    surface:{DEFAULT:'#FFFDF7',raised:'#FFFFFF',muted:'#F6F3EA'},
    focus:'#244FA8',
  },
  fontFamily:{ display:['Fredoka','"Nunito Sans"','sans-serif'], sans:['"Nunito Sans"','"Segoe UI"','sans-serif'] },
  borderRadius:{ sm:'12px', md:'18px', lg:'28px' },
  boxShadow:{ card:'0 10px 24px rgba(23,50,77,.06)', hover:'0 14px 30px rgba(23,50,77,.12)' },
}}};
