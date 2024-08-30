let money = 0;
const clickValue = 10;
const initialIncomePerSecond = 1;
const upgradeCost = 100;
const carCost = 1000;
const miniGameCost = 500;
const miniGameReward = 1000;
const miniGamePenalty = 500;
const lotteryPrize = 10000;
const lotteryChance = 0.10; // 복권 성공 확률 10%
const successThreshold = 50000; // 목표 금액
const purchaseLimit = 200; // 총 구매 횟수 제한
let incomePerSecond = initialIncomePerSecond;
let autoIncomeInterval;
let lotteryInterval;
let totalPurchases = 0; // 총 구매 횟수
const miniGameChance = 0.30; // 도박 성공 확률

// HTML 요소
const moneyDisplay = document.getElementById('status');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const carButton = document.getElementById('carButton');
const miniGameButton = document.getElementById('miniGameButton');
const targetAmountDisplay = document.getElementById('targetAmount');
const lotteryStatusDisplay = document.getElementById('lotteryStatus');

// 클릭 버튼 클릭 시 호출되는 함수
function handleClick() {
    money += clickValue;
    updateDisplay();
}

// 업그레이드 버튼 클릭 시 호출되는 함수
function handleUpgrade() {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        updateDisplay();
        upgradeButton.disabled = true; // 업그레이드 버튼 비활성화
        startAutoIncome(); // 자동 수입 시작
        totalPurchases++;
    }
}

// 자동차 버튼 클릭 시 호출되는 함수
function handleCarPurchase() {
    if (money >= carCost) {
        money -= carCost;
        incomePerSecond += 5; // 자동차 구매 시 초당 수입 증가 (5원)
        updateDisplay();
        carButton.disabled = true; // 자동차 버튼 비활성화
        totalPurchases++;
    }
}

// 도박 버튼 클릭 시 호출되는 함수
function handleMiniGame() {
    if (money >= miniGameCost) {
        money -= miniGameCost;
        if (Math.random() < miniGameChance) { // 30% 확률
            money += miniGameReward;
            alert('도박 성공! 1000원을 얻었습니다.');
        } else {
            alert('도박 실패. 500원을 잃었습니다.');
        }
        updateDisplay();
    } else {
        alert('돈이 부족합니다!');
    }
}

// 복권 기능을 처리하는 함수
function checkLottery() {
    if (Math.random() < lotteryChance) { // 10% 확률
        money += lotteryPrize;
        alert('복권 당첨! 10,000원을 얻었습니다.');
    }
    updateDisplay();
}

// 화면에 돈을 업데이트하는 함수
function updateDisplay() {
    moneyDisplay.textContent = `돈: ${money}원`;
    targetAmountDisplay.textContent = `목표 금액: ${successThreshold}원`;
    if (money >= upgradeCost) {
        upgradeButton.disabled = false; // 업그레이드 버튼 활성화
    }
    if (money >= carCost) {
        carButton.disabled = false; // 자동차 버튼 활성화
    }
    if (totalPurchases >= purchaseLimit) {
        alert('게임 엔딩! 총 구매 횟수에 도달했습니다.');
        resetGame();
    }
    if (money >= successThreshold) {
        alert('사업에 성공했습니다! 축하합니다.');
        resetGame();
    }
}

// 초당 수입을 처리하는 함수
function startAutoIncome() {
    if (autoIncomeInterval) clearInterval(autoIncomeInterval);
    autoIncomeInterval = setInterval(() => {
        money += incomePerSecond;
        updateDisplay();
    }, 1000);
}

// 복권 타이머를 처리하는 함수
function startLottery() {
    let secondsLeft = 30;
    lotteryStatusDisplay.textContent = `복권: ${secondsLeft}초`;
    lotteryInterval = setInterval(() => {
        secondsLeft--;
        lotteryStatusDisplay.textContent = `복권: ${secondsLeft}초`;
        if (secondsLeft <= 0) {
            checkLottery();
            secondsLeft = 30; // 타이머 재설정
        }
    }, 1000);
}

// 게임을 재시작하는 함수
function resetGame() {
    money = 0;
    incomePerSecond = initialIncomePerSecond;
    totalPurchases = 0;
    updateDisplay();
    upgradeButton.disabled = false;
    carButton.disabled = false;
    startAutoIncome(); // 게임 시작 시 자동 수입 시작
    startLottery(); // 복권 타이머 시작
}

// 초기화 함수
function init() {
    updateDisplay();
    clickButton.addEventListener('click', handleClick);
    upgradeButton.addEventListener('click', handleUpgrade);
    carButton.addEventListener('click', handleCarPurchase);
    miniGameButton.addEventListener('click', handleMiniGame);
    startAutoIncome(); // 게임 시작 시 자동 수입 시작
    startLottery(); // 복권 타이머 시작
}

init();
