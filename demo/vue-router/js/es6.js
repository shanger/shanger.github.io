class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	sayHello(){
		console.log('x:' + this.x + ',y:' + this.y);
	}
}

class ColorPoint extends Point{
	constructor(x,y,color){
		super(x,y);
		this.color = color;
	}
	sayHello(){
		console.log('x:' + this.x + ',y:' + this.y + ',Color:' + this.color);
	}
}
const test = (a = 6) =>{
	console.log(a)
}
test();