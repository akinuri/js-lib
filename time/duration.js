function Duration(num) {
    this.ms = null;
    this.s  = null;
    this.m  = null;
    this.h  = null;
    this.d  = null;
    this.parse(num);
}

Duration.constants = {
    ms : 1,
    s  : 1000,
    m  : 1000 * 60,
    h  : 1000 * 60 * 60,
    d  : 1000 * 60 * 60 * 24,
};

Duration.prototype.parse = function num2duration(num) {
    var remainder = 0;
    
    this.d = Math.floor(num / Duration.constants.d);
    remainder  = num % Duration.constants.d;
    if (this.d == 0)
        remainder = num;
    
    this.h = Math.floor(remainder / Duration.constants.h);
    remainder  = remainder % Duration.constants.h;
    if (this.h == 0)
        remainder = num;
    
    this.m = Math.floor(remainder / Duration.constants.m);
    remainder  = remainder % Duration.constants.m;
    if (this.m == 0)
        remainder = num;
    
    this.s = Math.floor(remainder / Duration.constants.s);
    remainder  = remainder % Duration.constants.s;
    if (this.s == 0)
        remainder = num;
    
    this.ms = remainder;
};

Duration.prototype.toString = function () {
    return this.h.toString().padStart(2, "0") +":"+ this.m.toString().padStart(2, "0") +":"+ this.s.toString().padStart(2, "0") +"."+ this.ms.toString().padStart(3, "0");
};