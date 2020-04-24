//1kx1k == 50x50 grid with buttons outside canvas bounds

/*TODO:
//  Labels for txt inputs
//  Canvas sized to the printed grid, to a max
//  Block size adjusts size to make sure the grid always fits in the canvas
//  Print out total inventory and items that dont fit
//  Put the inputs within their div container and fix display
*/

/// <reference path="../p5.d/p5.global-mode.d.ts" />
const BLOCK_SIZE = 20;
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 800;
var PlayerBackpack, itemId;
let btnDrawSpace;
let btnAddItem, txtItemHeight, txtItemWidth;
let btnCreateBackpack, txtBackpackHeight, txtBackpackWidth;

function setup() {
    let bkpk = createCanvas(CANVAS_HEIGHT, CANVAS_WIDTH);
    background(220);
    bkpk.parent('panelBackpack');
    PlayerBackpack = new Backpack(0, 0);
    itemId = 1;

    buildControlPanel();
}

function buildControlPanel(){
    txtBackpackHeight = createInput('', 'number').size(50).value(10).attribute('min','1').attribute('max','40').parent('panelControls');
    txtBackpackWidth = createInput('', 'number').size(50).value(10).attribute('min','1').attribute('max','40').parent('panelControls');
    btnCreateBackpack = createButton('Create Backpack').attribute('onclick','CreateBackpack()').parent('panelControls');

    txtItemHeight = createInput('', 'number').size(50).value(0).attribute('min','1').attribute('max','1').parent('panelControls');
    txtItemWidth = createInput('', 'number').size(50).value(0).attribute('min','1').attribute('max','1').parent('panelControls');
    btnAddItem = createButton('Add Item').attribute('onclick','AddItem()').parent('panelControls');
}

function draw() {
    // DrawControls();
}

function DrawControls() {
    let btnXPos = 850;
    let lblXPos = 0;
    // if (PlayerBackpack.Width > 10) {
    //     btnXPos = (PlayerBackpack.Width * BLOCK_SIZE) + 50;
    //     // lblXPos = (PlayerBackpack.Width * BLOCK_SIZE) + 10;
    // }
    // else {
    //     btnXPos = (10 * BLOCK_SIZE) + 50;
    //     // lblXPos = (10 * BLOCK_SIZE) + 10;
    // }

    txtBackpackHeight.position(btnXPos, 10);
    txtBackpackWidth.position(btnXPos, 30);
    btnCreateBackpack.position(btnXPos, 50);

    txtItemHeight.position(btnXPos, 90);
    txtItemWidth.position(btnXPos, 110);
    btnAddItem.position(btnXPos, 130);
}

function CreateBackpack() {
    if(parseInt(txtBackpackHeight.value(),10)<=0 || parseInt(txtBackpackWidth.value(),10)<=0 || parseInt(txtBackpackHeight.value(),10)>40 || parseInt(txtBackpackWidth.value(),10)>40) return;
    PlayerBackpack = new Backpack(parseInt(txtBackpackHeight.value(),10), parseInt(txtBackpackWidth.value(),10));
    txtItemHeight.value('1');
    txtItemWidth.value('1');
    itemId = 1;
    let bkpk = createCanvas(CANVAS_HEIGHT, CANVAS_WIDTH);
    txtItemHeight.attribute('min','1').attribute('max',PlayerBackpack.Height);
    txtItemWidth.attribute('min','1').attribute('max',PlayerBackpack.Width);
    background(220);
    bkpk.parent('panelBackpack');
    PrintBackpack();
    console.log("Backpack made: " + PlayerBackpack.Height + " x " + PlayerBackpack.Width);
}

function AddItem() {
    if (parseInt(txtItemHeight.value(), 10) <= 0 || parseInt(txtItemWidth.value(), 10) <= 0 || parseInt(txtItemHeight.value(), 10) > PlayerBackpack.Height || parseInt(txtItemWidth.value(), 10) > PlayerBackpack.Width) return;
    PlayerBackpack.AddItem(parseInt(txtItemHeight.value(),10), parseInt(txtItemWidth.value(),10), itemId);
    console.log("Item Added - " +itemId +" : "+ txtItemHeight.value() + " x " + txtItemWidth.value());
    txtItemHeight.value('1');
    txtItemWidth.value('1');
    itemId++;
    PrintBackpack();
}

function PrintBackpack() {
    PlayerBackpack.Organize();
    var space = PlayerBackpack.Space;
    for (let r = 0; r < space.length; r++) {
        for (let c = 0; c < space[0].length; c++) {
            fill(PlayerBackpack.GetColor(space[r][c]));
            square(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}