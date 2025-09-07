(function(){
  function uuid(){ return (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) }
  const btn = document.querySelector('#buy-pdf');
  if(!btn) return;
  btn.addEventListener('click', async function(){
    try{
      const r = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-idempotency-key': uuid() },
        body: JSON.stringify({})
      });
      const data = await r.json();
      if(data && data.url){ window.location = data.url; }
      else { alert('Impossibile iniziare il checkout. Riprova.'); }
    }catch(e){
      alert('Errore di rete, riprova.');
    }
  });
})();
