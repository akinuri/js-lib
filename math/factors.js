Math.factors = function (number) {
    var factors	= [];
    var primes	= {};
    var n		= 2;
    while (number != 1) {
        if (number % n == 0) {
            number = number / n;
            factors.push(n);
        } else {
            n++;
        }
    }
    factors.forEach(function (value) {
        primes[value] = value;
    });
    primes = Object.values(primes);
    return  {factors, primes}
};