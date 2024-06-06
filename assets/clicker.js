const defaultValues = {
  money: 0,
  moneyup: 1,
  msec: 0,
  upcost: 15,
  catcost: 25,
  workercost: 250,
  upown: 0,
  catown: 0,
  workerown: 0,
  catadd: 1,
  workadd: 15,
  cboost: 1,
  wboost: 1,
  catmax: 0,
  workmax: 0,
};

const values = {
  ...defaultValues,
};

let loaded = 0;

//save before exiting
function closingCode() {
  if (confirm("You have closed the window, would you like to save?") === true) {
    save();
    return null;
  }
}

function addcomma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//updates all values
function reloadall() {
  document.getElementById("click").innerHTML = `LB/click: ${addcomma(
    moneyup
  )} | LB/sec: ${addcomma(msec)}`;
  document.getElementById("total").innerHTML = `LB: ${addcomma(money)}`;
  document.getElementById("cat").innerHTML = `${catown}-clicker cat: ${addcomma(
    catcost
  )} | +${addcomma(catadd)}/sec`;
  document.getElementById(
    "worker"
  ).innerHTML = `${workerown}-worker: ${addcomma(workercost)} | +${addcomma(
    workadd
  )}/sec`;
  document.getElementById("upgrade").innerHTML = `${addcomma(
    upown
  )}-main upgrade: ${addcomma(upcost)}`;
}

function saveItem(key, value) {
  Telegram.WebApp.CloudStorage.setItem(key, value);
}

//overwrites save file
function save() {
  values.money = money;
  values.moneyup = moneyup;
  values.msec = msec;
  values.upcost = upcost;
  values.catcost = catcost;
  values.workercost = workercost;
  values.upown = upown;
  values.catown = catown;
  values.workerown = workerown;
  values.catadd = catadd;
  values.workadd = workadd;
  values.cboost = cboost;
  values.wboost = wboost;
  values.catmax = catmax;
  values.workmax = workmax;
  saveItem("stat", JSON.stringify(values));
}

const getItem = async (key) => {
  try {
    const result = await new Promise((resolve, reject) => {
      Telegram.WebApp.CloudStorage.getItem(key, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    console.log({ key, result, defaultValues });
    return result;
  } catch (error) {
    console.error(error);
    return defaultValues[key];
  }
};
//loads save file
const load = async () => {
  const stat = JSON.parse(await getItem("stat"));
  money = Number.parseInt(stat.money);
  moneyup = Number.parseInt(stat.moneyup);
  msec = Number.parseInt(stat.msec);
  upcost = Number.parseInt(stat.upcost);
  catcost = Number.parseInt(stat.catcost);
  upown = Number.parseInt(stat.catadd);
  workercost = Number.parseInt(stat.workercost);
  upown = Number.parseInt(stat.workadd);
  catown = Number.parseInt(stat.catown);
  workerown = Number.parseInt(stat.workerown);
  upown = Number.parseInt(stat.upown);
  catadd = Number.parseInt(stat.catadd);
  workadd = Number.parseInt(stat.workadd);
  cboost = Number.parseInt(stat.cboost);
  wboost = Number.parseInt(stat.wboost);
  catmax = Number.parseInt(stat.catmax);
  workmax = Number.parseInt(stat.workmax);
  loaded = 1;
  reloadall();
};
//resets all values
function reset() {
  if (confirm("Are you sure you want to reset?") === true) {
    money = 0;
    moneyup = 1;
    msec = 0;
    upcost = 15;
    catcost = 25;
    workercost = 250;
    catown = 0;
    workerown = 0;
    upown = 0;
    catadd = 1;
    workadd = 15;
    reloadall();
  }
}
//timer
async function myTimer() {
  money += msec;
  document.getElementById("total").innerHTML = `LB: ${addcomma(money)}`;
  if (loaded) {
    await save();
  }
}
setInterval(myTimer, 1000);

//what happens when button is clicked
function clicked() {
  money += moneyup;
  document.getElementById("total").innerHTML = `LB: ${addcomma(money)}`;
  save();
}
//upgrade function
function upgrade(name) {
  if (name === "clicker cat") {
    if (money >= catcost && catown < 50) {
      if (catown <= 13) {
        msec += catadd;
        catadd++;
        cboost = 1;
      } else if (catown === 14) {
        msec += catadd;
        catadd++;
        cboost = 200;
      } else if (catown <= 23) {
        msec += 200 * catadd;
        catadd++;
        cboost = 200;
      } else if (catown === 24) {
        msec += 200 * catadd;
        catadd++;
        cboost = 5000;
      } else if (catown <= 48) {
        msec += 5000 * catadd;
        catadd++;
        cboost = 5000;
      } else if (catown === 49) {
        msec += 5000 * catadd;
        catadd++;
        cboost = 15000;
      } else {
        msec += 15000 * catadd;
        catadd++;
        cboost = 15000;
      }
      catown += 1;
      money -= catcost;
      catcost = catcost * 2;
      document.getElementById(
        "cat"
      ).innerHTML = `${catown}-clicker cat: ${addcomma(catcost)} | +${addcomma(
        catadd * cboost
      )}/sec`;
    } else if (catown === 50) {
      document.getElementById(
        "cat"
      ).innerHTML = `${catown}-clicker cat: MAX | +15% click/sec`;
    }
  }

  if (name === "worker") {
    if (money >= workercost && workerown < 50) {
      if (workerown <= 13) {
        msec += workadd;
        workadd++;
        wboost = 1;
      } else if (workerown === 14) {
        msec += workadd;
        workadd++;
        wboost = 200;
      } else if (workerown <= 23) {
        msec += 200 * workadd;
        workadd++;
        wboost = 200;
      } else if (workerown === 24) {
        msec += 200 * workadd;
        workadd++;
        wboost = 5000;
      } else if (workerown <= 48) {
        msec += 5000 * workadd;
        workadd++;
        wboost = 5000;
      } else if (workerown === 49) {
        msec += 5000 * workadd;
        workadd++;
        wboost = 15000;
      } else {
        msec += 15000 * workadd;
        workadd++;
        wboost = 15000;
      }
      workerown += 1;
      money -= workercost;
      workercost = workercost * 3;
      document.getElementById(
        "worker"
      ).innerHTML = `${workerown}-worker: ${addcomma(workercost)} | +${addcomma(
        workadd * wboost
      )}/sec`;
    } else if (workerown === 50) {
      document.getElementById(
        "worker"
      ).innerHTML = `${workerown}-worker: MAX | +35% click/sec`;
    }
  }

  if (name === "upgrade") {
    if (money >= upcost) {
      moneyup += upcost / 15;
      money -= upcost;
      upown += 1;
      upcost = upcost * 5;
      document.getElementById("upgrade").innerHTML = `${addcomma(
        upown
      )}-main upgrade: ${addcomma(upcost)}`;
      if (catown === 50) {
        msec -= catmax;
        catmax = Math.floor(moneyup * 0.15);
        msec += catmax;
      }
      if (workerown === 50) {
        msec -= workmax;
        workmax = Math.floor(moneyup * 0.35);
        msec += workmax;
      }
    }
    save();
  }

  document.getElementById("click").innerHTML = `LB/click: ${addcomma(
    moneyup
  )} | LB/sec: ${addcomma(msec)}`;
  document.getElementById("total").innerHTML = `LB: ${addcomma(money)}`;
}
