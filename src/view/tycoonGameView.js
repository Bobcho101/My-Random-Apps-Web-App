import { html, renderInMain } from "../lib/lit-html.js";

const template = () => html`
<div id="notification-box"><h3></h3></div>
    <div id="farmers-box">
        <h1 id="my-money">My money: 0$</h1>
        <button id="collect-btn">Collect</button> 
        <h1 id="generated-money">Generated money: 0$</h1>  
        <h1 id="generator-multyplayer">Multyplayer: 1x</h1>
        <h1 id="my-upgrade">Upgrade: 0</h1>
        <button id="upgrade-btn">Upgrade: 50$</button>
    </div>
    <div id="clicker">Click</div>
`;

export default async function tycoonGameView(ctx) {
    
    renderInMain(template());

    generateMoneyandUpgrades();
    function generateMoneyandUpgrades(){
        const myMoneyEl = document.querySelector("#my-money");
        const collectBtnEl = document.querySelector("#collect-btn");
        const generatedMoneyEl = document.querySelector("#generated-money");
        const upgradeBtn = document.querySelector("#upgrade-btn");
        const upgradeLevelEl = document.querySelector("#my-upgrade");
        const generatorMultyplayerEl = document.querySelector("#generator-multyplayer");
        const clickerButton = document.querySelector("#clicker");
        const notificationBox = document.querySelector("#notification-box");
        const notificationBoxH3 = document.querySelector("#notification-box h3");
    
    
        const moneyPerUpgrade = {
            "upgrade 0": 1,
            "upgrade 1": 2,
            "upgrade 2": 3,
            "upgrade 3": 5,
            "upgrade 4": 10,
            "upgrade 5": 15,
            "upgrade 6": 20,
            "upgrade max": 30
        };
    
        const upgradePrice = {
            "upgrade 1": 100,
            "upgrade 2": 200,
            "upgrade 3": 500,
            "upgrade 4": 1000,
            "upgrade 5": 1800,
            "upgrade 6": 3000,
            "upgrade 7": 5000
        };
    
        const levelBeforeMax = Object.entries(moneyPerUpgrade).at(-2)[0].split(" ")[1];
        
    
        let myMoney = 0;
        let generatedMoney = 0;
        let upgradeLevel = 0;
        let generatorMultyplayer = 1;
        
        collectBtnEl.addEventListener('click', (e) => {
            myMoney += generatedMoney;
            generatedMoney = 0;
            myMoneyEl.textContent = `My money: ${myMoney}$`;
        });
    
        clickerButton.addEventListener('click', (e) => {
            myMoney += 1;
            myMoneyEl.textContent = `My money: ${myMoney}$`;
        });
       
        
        upgradeBtn.addEventListener('click', (e) => {
            const upgradeCost = upgradeBtn.textContent.split(": ")[1].replace('$', '');
            if(myMoney >= upgradeCost){
                myMoney -= upgradeCost;
                myMoneyEl.textContent = `My money: ${myMoney}$`;
                
                if(upgradeLevel !== levelBeforeMax && upgradeLevel !== "max"){
                    upgradeBtn.textContent = `Upgrade: ${upgradePrice[`upgrade ${upgradeLevel + 1}`]}$`
                    upgradeLevel += 1;
                    upgradeLevelEl.textContent = `Upgrade: ${upgradeLevel}`;
                    updateMultyplayerEl();
                } else {
                    upgradeLevel = "max";
                    upgradeBtn.disabled = true;  
                    upgradeBtn.textContent = 'MAX';
                    upgradeLevelEl.textContent = `Upgrade: ${upgradeLevel}`;
                    updateMultyplayerEl();
                }
            } else{
                alert("Not enough money!");
            }
        });
        
        const intervalMS = 500;
        if(upgradeLevel <= levelBeforeMax){
            setInterval(() => {
                generatedMoney += moneyPerUpgrade[`upgrade ${upgradeLevel}`];
                generatedMoneyEl.textContent = `Generated money: ${generatedMoney}$`;
            }, intervalMS);
        } else if(upgradeLevel === "max"){
            setInterval(() => {
                generatedMoney += moneyPerUpgrade[`upgrade ${upgradeLevel}`];
                generatedMoneyEl.textContent = `Generated money: ${generatedMoney}$`;
            }, intervalMS);
        } 
    
        function updateMultyplayerEl(){
            generatorMultyplayer = moneyPerUpgrade[`upgrade ${upgradeLevel}`];
            generatorMultyplayerEl.textContent = `Multyplayer: ${generatorMultyplayer}x`;
        }
        function errorNotification(message){
            notificationBox.style.transform = 'translateY(-19em)';
            notificationBoxH3.textContent = message;
            upgradeBtn.disabled = true;
            setTimeout(() => {
                notificationBox.style.transform = 'translateY(-250em)';
                notificationBoxH3.textContent = "";
                upgradeBtn.disabled = false;
            }, 2000)
        }
    }
}