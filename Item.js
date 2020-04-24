class Item {
  constructor(h, w, i) {
    this.ID = i;
    this.Height = h;
    this.Width = w;
    this.Area = this.Height * this.Width;
    this.Color = color(random(255),random(255),random(255));
  }
}