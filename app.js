async function loadData(){
  // cafes.json is loaded as a separate script tag with type=application/json
  const resp = document.querySelector('script[type="application/json"]').textContent;
  const data = JSON.parse(resp);
  return data.cafes || [];
}

function renderList(cafes){
  const ul = document.getElementById('cafes');
  ul.innerHTML = '';
  cafes.forEach(c=>{
    const li = document.createElement('li'); li.className='card';
    li.innerHTML = `<strong>${c.name}</strong><br><small>${c.address}</small>`;
    ul.appendChild(li);
  });
}

function showResult(c){
  document.getElementById('r_name').textContent = c.name;
  document.getElementById('r_addr').textContent = c.address;
  document.getElementById('r_meta').textContent = `${c.opening||''} · 插座：${c.outlet||'不詳'} · 燈光：${c.lighting||'不詳'}`;
  document.getElementById('r_desc').textContent = c.desc||'';
  const map = document.getElementById('r_map');
  map.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`;
  map.textContent = '打開 Google 地圖';
  document.getElementById('result').classList.remove('hidden');
}

function hideResult(){ document.getElementById('result').classList.add('hidden'); }

window.addEventListener('load', async ()=>{
  const cafes = await loadData();
  renderList(cafes);
  document.getElementById('pickBtn').addEventListener('click', ()=>{
    if(!cafes.length) return;
    const c = cafes[Math.floor(Math.random()*cafes.length)];
    showResult(c);
  });
  document.getElementById('closeBtn').addEventListener('click', hideResult);
});