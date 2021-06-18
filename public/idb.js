let db;
// let budgetVersion;
const request = indexedDB.open('budgetdb', 2);

request.onupgradeneeded = function(event) {
    // const { oldVersion } = e;
  // const newVersion = e.newVersion || db.version;

  db = event.target.result;
  // console.log(db);

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore('transactions', { autoIncrement: true });
  }
};

request.onerror = function(event) {
  console.log(event.target.errorCode);
};

request.onsuccess = function(event) {
  db = event.target.result;
  // console.log(db);

  if (navigator.onLine) {
    checkDatabase();
  }
};

const checkDatabase = () => {
  let transaction = db.transaction('transactions', 'readwrite');
  const store = transaction.objectStore('transactions');
  const transactions = store.getAll();

  transactions.onsuccess = () => {
    if (transactions.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(transactions.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(res => {
          if (res.length !== 0) {
            transaction = db.transaction('transactions', 'readwrite');
            const currentStore = transaction.objectStore('transactions');

            currentStore.clear();
          }
        });
    }
  };
}

const saveRecord = (record) => {
  const transaction = db.transaction('transactions', 'readwrite');
  const store = transaction.objectStore('transactions');

  store.add(record);
};

window.addEventListener('online', checkDatabase);
