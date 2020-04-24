class Backpack {
    constructor(h, w) {
        this.Height = h;
        this.Width = w;
        this.Space = new Array(h);
        for (let r = 0; r < h; r++) {
            this.Space[r] = new Array(w).fill(0);
        }
        this.Inventory = [];
    }

    AddItem(h, w, i) {
        if (h > 0 && w > 0)
            this.Inventory.push(new Item(h, w, i));
    }

    Print() {
        for (let r = 0; r < this.Height; r++) {
            for (let c = 0; c < this.Width; c++) {
                console.log(this.Space[r][c] + " ");
            }
            console.log('\n');
        }
    }

    Organize() {
        //find the item of largest area
        //place in first free spot
        this.Inventory = this.Inventory.sort((a, b) => (a.Area > b.Area) ? 1 : -1);
        this.Inventory.reverse();
        this.Space = null;
        this.Space = new Array(this.Height);
        for (let r = 0; r < this.Height; r++) {
            this.Space[r] = new Array(this.Width).fill(0);
        }
        for (let i = 0; i < this.Inventory.length; i++) {
            let item = this.Inventory[i];
            var filled = false;
            for (let r = 0; r < this.Height; r++) {
                for (let c = 0; c < this.Width; c++) {
                    if (this.CheckFit(item, r, c)) {
                        this.FillSpace(item, r, c);
                        filled = true;
                    }
                    if (filled) break;
                }
                if (filled) break;
                else continue;
            }
            if (!filled)
                console.log("Not enough space to fit Item Number " + item.ID + ", of size " + item.Height + ", " + item.Width + "\n");
        }
    }

    CheckFit(i, r, c) {
        if (r + i.Height > this.Height || c + i.Width > this.Width)
            return false;
        for (let y = 0; y < i.Height; y++) {
            for (let x = 0; x < i.Width; x++) {
                //Overlap with another item
                if (this.Space[r + y][c + x] != 0)
                    return false;
            }
        }
        return true;
    }
    FillSpace(i, r, c) {
        for (let y = 0; y < i.Height; y++) {
            for (let x = 0; x < i.Width; x++)
                this.Space[y + r][c + x] = i.ID;
        }
    }
    GetColor(id) {
        if (id == 0) return color(40);
        for (let i = 0; i < this.Inventory.length; i++) {
            if (this.Inventory[i].ID == id) {
                return this.Inventory[i].Color;
            }
        }
    }
}