/*
    Math.random(a [, b])
    Math.sum(a [, b [, c ...]])
    Math.average(a [, b [, c ...]])
    Math.factorial(n)
    Math.factors(n)
    Math.median(a [, b [, c ...]])
*/

Math.random = function (random) {
    return function (a, b) {
        switch (arguments.length) {
            case 1:
                return random() * a;
            case 2: 
                return a + random() * (b - a);
        }
        return random();
    }
}(Math.random);

Math.sum = function () {
    return Array.from(arguments).reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });
};

Math.average = function () {
    var input = Array.from(arguments);
    return Math.sum(input) / input.length;
};

Math.factorial = function (n) {
    var result = 1;
    while (n > 0) {
        result *= n;
        n--;
    }
    return result;
};

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
    return  {
        factors	: factors,
        primes	: primes,
    }
};

Math.median = function () {
    var sorted = Array.from(arguments).sort();
    var values = [];
    if (sorted.length % 2) {
        values.push( sorted[ (sorted.length / 2) - 1 ] );
        values.push( sorted[  sorted.length / 2      ] );
    } else {
        values.push( sorted[ (sorted.length + 1) / 2 ] );
    }
    return Math.average.apply(null, values);
};