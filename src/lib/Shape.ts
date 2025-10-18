export class Shape {
    private color: string;
    private url: string;
    private element: HTMLElement;
    private size: number;

    public constructor(color: string, url: string, size: number) {
        this.color = color;
        this.url = url;
        this.element = document.createElement("div");
        this.size = size
        this.element.style.width = `${this.size}px`
        this.element.style.height = `${this.size}px`
        this.element.style.backgroundImage = `url(${this.url})`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundPosition = "center";
        this.element.style.backgroundRepeat = "no-repeat";
    }

    public setPosition(x: number, y: number) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
}