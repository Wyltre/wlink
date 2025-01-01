document.addEventListener('DOMContentLoaded', () => {
    const linkInput = document.getElementById('link-input');
    const addButton = document.getElementById('add-link');
    const linksList = document.getElementById('links-list');
  
    loadLinks();
  
    addButton.addEventListener('click', addLink);
    linkInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addLink();
    });
  
  // ... diğer kodlar aynı

function addLink() {
    let url = linkInput.value.trim();
    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      const urlObj = new URL(url);
      const favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;
      
      // Site ismini almak için
      let siteName = urlObj.hostname.replace('www.', '').split('.')[0];
      // İlk harfi büyük yap
      siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1);
      
      const li = document.createElement('li');
      li.className = 'link-item';
      
      const img = document.createElement('img');
      img.src = favicon;
      img.className = 'favicon';
      img.alt = 'site icon';
      
      const a = document.createElement('a');
      a.href = url;
      a.textContent = siteName; // URL yerine site ismi
      a.target = '_blank';
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '×';
      
      deleteBtn.onclick = () => {
        li.remove();
        saveLinks();
      };
      
      li.appendChild(img);
      li.appendChild(a);
      li.appendChild(deleteBtn);
      linksList.appendChild(li);
      
      linkInput.value = '';
      saveLinks();
    } catch {
      alert('Geçerli bir URL giriniz');
    }
}
  
    function saveLinks() {
      const links = [];
      document.querySelectorAll('.link-item').forEach(item => {
        links.push({
          url: item.querySelector('a').href,
          title: item.querySelector('a').textContent
        });
      });
      chrome.storage.local.set({ 'quickLinks': links });
    }
  
    function loadLinks() {
      chrome.storage.local.get('quickLinks', (data) => {
        if (data.quickLinks) {
          data.quickLinks.forEach(link => {
            const urlObj = new URL(link.url);
            const favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;
            
            const li = document.createElement('li');
            li.className = 'link-item';
            
            const img = document.createElement('img');
            img.src = favicon;
            img.className = 'favicon';
            img.alt = 'site icon';
            
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.title;
            a.target = '_blank';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            
            deleteBtn.onclick = () => {
              li.remove();
              saveLinks();
            };
            
            li.appendChild(img);
            li.appendChild(a);
            li.appendChild(deleteBtn);
            linksList.appendChild(li);
          });
        }
      });
    }
  });