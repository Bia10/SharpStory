var status = 0;
var opt = 0; // 1 = View/Buy Auctions || 2 = Add Auction || 3 - Remove Auction
// 12 = Stage 2 of Option 1 || 22 - Stage 2 of Option 2
var String = "";
var id = 0;
var ice = 0;
var black = 0;
var tear = 0;
var cloud = 0;
var meso = 0;
var vp = 0;
var shards = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    selected = selection;
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#eHello, I'm the #rSharpStory#k #bEquipment Auction#k NPC!\r\n\
\r\n\
#fUI/UIWindow.img/QuestIcon/3/0##b\r\n\
#L3#Search EQUIP Auctions\r\n\
#L0#View Auctions\r\n\
#L1#Add Auction\r\n\
#L2##bRemove My Auction");
        } else if (status == 1) {
            if (selection == 3) {
                opt = 40;
                cm.sendGetNumber("#eEnter the Auction ID of the equip you wish to view -", 1, 0, 2000000000);
            } else if (selection == 0) {
                String = "#ePlease select the auction you wish to view -\r\n\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n";
                opt = 1;
                cm.sendSimple(String+cm.getEquipAuctions());
            } else if (selection == 1) {
                String = "#ePlease select the item you wish to auction -\r\n\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n";
                opt = 2;
                if (cm.EquipList(cm.getClient()) != "") {
                    cm.sendSimple(String+cm.EquipList(cm.getClient()));
                } else {
                    cm.sendOk("#e#rYou must have an equipment in your inventory!");
                    cm.dispose();
                }
            } else if (selection == 2) {
                String = "#ePlease select the item you wish to remove from auction -\r\n\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n";
                opt = 3;
                cm.sendSimple(String+cm.getOwnedEquipAuctions());
            }
        } else if (status == 2) {
            if (opt == 40) {
                String = "#d#eEquip Information -\r\n";
                opt = 12;
                id = selection;
                cm.sendOk(String+cm.searchEquipAuction(selection));
            } else if (opt == 1) {
                String = "#d#eEquip Information -\r\n";
                opt = 12;
                id = selection;
                cm.sendOk(String+cm.getEquipInfo(selection));
            } else if (opt == 2) {
                id = selection;
                opt = 22;
                cm.sendGetNumber("#e#bInsert how many Crystal Shards your item should cost - ", 1, 0, 5000);
            } else if (opt == 3) {
                id = selection;
                if (id == 0) {
                    cm.sendOk("#e#rYou do not have any item auctions.");
                    cm.dispose();
                } else {
                    cm.retriveEquipAuction(id, false);
                    cm.sendOk("#e#bThere you go, I hope you come back.");
                    cm.dispose();
                }
            }
        } else if (opt == 12) {
            String = "#d#eEquip Price -\r\n";
            opt = 13;
            cm.sendOk(String+cm.getPrice(id));
        } else if (opt == 13) {
            cm.sendOk(cm.buyEquipAuction(id));
            cm.dispose();
        } else if (opt == 22) {
            shards = selection;
            opt = 23;
            cm.sendGetNumber("#e#bInsert how many Black Crystals your item should cost - ", 1, 0, 5000);
        } else if (opt == 23) {
            black = selection;
            opt = 24;
            cm.sendGetNumber("#e#bInsert how many Ice Tears your item should cost - ", 1, 0, 5000);
        } else if (opt == 24) {
            tear = selection;
            opt = 25;
            cm.sendGetNumber("#e#bInsert how many Ice Pieces your item should cost - ", 1, 0, 5000);
        } else if (opt == 25) {
            ice = selection;
            opt = 26;
            cm.sendGetNumber("#e#bInsert how many Vote Points your item should cost - ", 1, 0, 5000);
        } else if (opt == 26) {
            vp = selection;
            opt = 27;
            cm.sendGetNumber("#e#bInsert how many Mesos your item should cost - ", 1, 0, 2000000000);
        } else if (opt == 27) {
            meso = selection;
            opt = 28;
            cm.sendOk("#e#bPress ok to confirm the process.");
        } else if (opt == 28) {
            if (cm.addEquipAuction(id, ice, black, tear, cloud, meso, vp, shards)) {
                cm.sendOk("#eThank You for your transaction.");
                cm.dispose();
            } else {
                cm.sendOk("#eThere was a...problem. Note that items with tagged owners cannot be sold, as well as pets, or there was a problem with your input.");
                cm.dispose();
            }
        }
    }
}