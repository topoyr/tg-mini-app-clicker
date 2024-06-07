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

async function saveItem(key, value) {
  const result = await setDoc(doc(db, key, userId + ""), value);
}

//overwrites save file
async function save() {
  if (money) {
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
    await saveItem("stat", values);
  }
}
console.log({ wa: Telegram.WebApp });
const userId = Telegram.WebApp.WebAppUser?.id || 12334;

const getItem = async (key) => {
  try {
    const querySnapshot = await getDoc(doc(db, key, userId+""));
    return querySnapshot.data() || defaultValues;
  } catch (error) {
    console.error(error);
    return defaultValues;
  }
};
//loads save file
const load = async () => {
  const stat = await getItem("stat");
  money = Number.parseInt(stat.money || defaultValues.money);
  moneyup = Number.parseInt(stat.moneyup || defaultValues.moneyup);
  msec = Number.parseInt(stat.msec || defaultValues.msec);
  upcost = Number.parseInt(stat.upcost || defaultValues.upcost);
  catcost = Number.parseInt(stat.catcost || defaultValues.catcost);
  upown = Number.parseInt(stat.catadd || defaultValues.catadd);
  workercost = Number.parseInt(stat.workercost || defaultValues.workercost);
  upown = Number.parseInt(stat.workadd || defaultValues.workadd);
  catown = Number.parseInt(stat.catown || defaultValues.catown);
  workerown = Number.parseInt(stat.workerown || defaultValues.workerown);
  upown = Number.parseInt(stat.upown || defaultValues.upown);
  catadd = Number.parseInt(stat.catadd || defaultValues.catadd);
  workadd = Number.parseInt(stat.workadd || defaultValues.workadd);
  cboost = Number.parseInt(stat.cboost || defaultValues.cboost);
  wboost = Number.parseInt(stat.wboost || defaultValues.wboost);
  catmax = Number.parseInt(stat.catmax || defaultValues.catmax);
  workmax = Number.parseInt(stat.workmax || defaultValues.workmax);
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
  if (loaded) {
    money += msec;
    document.getElementById("total").innerHTML = `LB: ${addcomma(money)}`;
    await save();
  } else {
    load();
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
