// @ts-check

export class Complex{
    constructor(re = 0, im = 0){
        this.re = re;
        this.im = im;
    }

    static add(z1 = new Complex(0, 0), z2 = new Complex(0, 0)){
        return new Complex(z1.re + z2.re, z1.im + z2.im);
    }

    static sub(z1 = new Complex(0, 0), z2 = new Complex(0, 0)){
        return new Complex(z1.re - z2.re, z1.im - z2.im);
    }

    static square(z = new Complex(0, 0)){
        return new Complex(z.re * z.re - z.im * z.im, 2 * z.re * z.im);
    }

    static mandelbrot_set_check(c = new Complex(0, 0), iterations = 0){
        let z = new Complex(0, 0);

        var i = 0
        while(i < iterations && z.sqrMagnitude() <= 4){
            z = z.square().add(c);
            i+=1
        }
        return i;
    }

    sqrMagnitude(){
        return this.re * this.re + this.im * this.im;
    }

    sub(z = new Complex(0, 0)){
        return new Complex(this.re - z.re, this.im - z.im);
    }

    add(z = new Complex(0, 0)){
        return new Complex(this.re + z.re , this.im + z.im);
    }

    square(){
        return new Complex(this.re * this.re - this.im * this.im, 2 * this.re * this.im);
    }

}