class NumberFormatter {
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
    // https://www.php.net/manual/en/class.numberformatter.php
    
    
    // #region ==================== CURRENCIES
    
    static #CURRENCIES = {
        "TRY" : {
            "name" : "Turkish lira",
            "sign" : "₺",
            "code" : "TRY",
            "abbr" : "TL",
        },
        "USD" : {
            "name" : "United States dollar",
            "sign" : "$",
            "code" : "USD",
            "abbr" : "US$",
        },
        "EUR" : {
            "name" : "Euro",
            "sign" : "€",
            "code" : "EUR",
            "abbr" : null,
        },
    };
    
    //#endregion
    
    
    // #region ==================== LOCALES
    
    static #LOCALES = {
        "tr-TR" : {
            "code" : "tr-TR",
            "global" : {
                "fraction" : {
                    "minDigits" : null,
                    "maxDigits" : null,
                },
                "seperator" : {
                    "decimal"  : ",",
                    "thousand" : ".",
                },
            },
            "value" : {
                "fraction" : {
                    "minDigits" : 0,
                    "maxDigits" : 4,
                },
            },
            "decimal" : {
                "fraction" : {
                    "minDigits" : 0,
                    "maxDigits" : 4,
                },
            },
            "currency" : {
                "fraction" : {
                    "minDigits" : 2,
                    "maxDigits" : 2,
                },
                "indicator" : {
                    "type"     : "sign",
                    "sign"     : "₺",
                    "position" : "after",
                    "space"    : false,
                },
            },
            "percent" : {
                "indicator" : {
                    "sign"     : "%",
                    "position" : "before",
                    "space"    : false,
                },
            },
        },
        "en-US" : {
            "code" : "en-US",
            "global" : {
                "fraction" : {
                    "minDigits" : null,
                    "maxDigits" : null,
                },
                "seperator" : {
                    "decimal"  : ".",
                    "thousand" : ",",
                },
            },
            "value" : {
                "fraction" : {
                    "minDigits" : 0,
                    "maxDigits" : 4,
                },
            },
            "decimal" : {
                "fraction" : {
                    "minDigits" : 0,
                    "maxDigits" : 4,
                },
            },
            "currency" : {
                "fraction" : {
                    "minDigits" : 2,
                    "maxDigits" : 2,
                },
                "indicator" : {
                    "type"     : "sign",
                    "sign"     : "$",
                    "position" : "before",
                    "space"    : false,
                },
            },
            "percent" : {
                "indicator" : {
                    "sign"     : "%",
                    "position" : "after",
                    "space"    : false,
                },
            },
        },
    };
    
    //#endregion
    
    
    // #region ==================== STATE
    
    static #active = {
        currency : "USD",
        locale   : "en-US",
    };
    
    static #elementClasses = {
        element  : "money",
        amount   : "amount",
        currency : "currency",
    };
    
    static #customOptions = {
        currency     : {},
        locale       : {},
        elementClass : {},
    };
    
    //#endregion
    
    
    // #region ==================== STATE SETTERS
    
    static setActiveCurrency(currency) {
        let allowedCurrencies = Object.keys(NumberFormatter.#CURRENCIES);
        if (!allowedCurrencies.includes(currency)) {
            return false;
        }
        NumberFormatter.#active.currency = currency;
        return true;
    }
    
    static setActiveLocale(locale) {
        let allowedLocales = Object.keys(NumberFormatter.#LOCALES);
        if (!allowedLocales.includes(locale)) {
            return false;
        }
        NumberFormatter.#active.locale = locale;
        return true;
    }
    
    static setLocaleOptions(locale = null, options) {
        let allowedLocales = Object.keys(NumberFormatter.#LOCALES);
        if (locale) {
            if (!allowedLocales.includes(locale)) {
                return false;
            }
            NumberFormatter.#customOptions.locale[locale] = options;
        } else {
            for (let allowedLocale of allowedLocales) {
                NumberFormatter.#customOptions["locale"][allowedLocale] = Object.merge(
                    NumberFormatter.#customOptions["locale"][allowedLocale] ?? [],
                    options
                );
            }
        }
        return true;
    }
    
    static getState() {
        return NumberFormatter.#active;
    }
    
    static getCustomOptions() {
        return NumberFormatter.#customOptions;
    }
    
    //#endregion
    
    
    // #region ==================== OUTPUT HELPERS
    
    static #buildOutputLocale(type, userOptions = {}) {
        
        let locale = Object.clone(
            NumberFormatter.#LOCALES[ NumberFormatter.#active.locale ]["global"]
        );
        locale = Object.merge(
            locale,
            NumberFormatter.#LOCALES[ NumberFormatter.#active.locale ][type]
        );
        locale = Object.merge(locale, userOptions);
        
        if (locale.fraction.minDigits != null) {
            if (locale.fraction.minDigits < 0) {
                throw new Error("locale.fraction.minDigits value is out of range.");
            }
        }
        if (locale.fraction.maxDigits != null) {
            if (locale.fraction.maxDigits > 16) {
                throw new Error("locale.fraction.maxDigits value is out of range.");
            }
        }
        if (locale.fraction.minDigits != null &&
            locale.fraction.maxDigits != null) {
            if (locale.fraction.minDigits > locale.fraction.maxDigits) {
                throw new Error("locale.fraction.maxDigits value is out of range.");
            }
        }
        
        if (locale.fraction.maxDigits !== null) {
            if (locale.fraction.minDigits === null) {
                locale.fraction.minDigits = 0;
            }
        }
        if (locale.fraction.minDigits !== null) {
            if (locale.fraction.maxDigits === null) {
                locale.fraction.maxDigits = locale.fraction.minDigits;
            }
        }
        
        return locale;
    }
    
    static #trimFractionDigits(number, locale) {
        if (locale.fraction.minDigits != locale.fraction.maxDigits) {
            let [integer, fraction] = number.split(locale.seperator.decimal);
            let fractionDigits = fraction.split("");
            fractionDigits.reverse();
            while (
                fractionDigits.length &&
                fractionDigits[0] == "0" &&
                fractionDigits.length > locale.fraction.minDigits
            ) {
                fractionDigits.shift();
            }
            fractionDigits.reverse();
            number = integer;
            if (fractionDigits.length) {
                number += locale.seperator.decimal + fractionDigits.join("");
            }
        }
        return number;
    }
    
    static #getCurrencyIndicator(currency, indicators = ["sign"]) {
        let indicator = null;
        for (let indicatorType of indicators) {
            let candidate = NumberFormatter.#CURRENCIES[currency][indicatorType] ?? null;
            if (candidate) {
                indicator = candidate;
                break;
            }
        }
        return indicator;
    }
    
    //#endregion
    
    
    // #region ==================== OUTPUT METHODS
    
    static value(number, userOptions = {}, asFloat = false) {
        
        let locale = NumberFormatter.#buildOutputLocale("value", userOptions);
        locale = Object.merge(locale, {
            seperator : {
                decimal : ".",
                thousand : "",
            },
        });
        
        number = Number.format(
            number,
            locale.fraction.maxDigits,
            locale.seperator.decimal,
            locale.seperator.thousand
        );
        
        number = NumberFormatter.#trimFractionDigits(number, locale);
        
        if (asFloat) {
            number = parseFloat(number);
        }
        
        return number;
    }
    
    static decimal(number, userOptions = {}) {
        
        let locale = NumberFormatter.#buildOutputLocale("decimal", userOptions);
        
        number = Number.format(
            number,
            locale.fraction.maxDigits,
            locale.seperator.decimal,
            locale.seperator.thousand
        );
        
        number = NumberFormatter.#trimFractionDigits(number, locale);
        
        return number;
    }
    
    static currency(number, userOptions = {}, userCurrencyCode = null) {
        
        let locale = NumberFormatter.#buildOutputLocale("currency", userOptions);
        
        number = Number.format(
            number,
            locale.fraction.maxDigits,
            locale.seperator.decimal,
            locale.seperator.thousand
        );
        
        number = NumberFormatter.#trimFractionDigits(number, locale);
        
        let currencyIndicator = null;
        if (locale.indicator.type) {
            currencyIndicator = NumberFormatter.#getCurrencyIndicator(
                userCurrencyCode ?? NumberFormatter.#active.currency,
                [ locale.indicator.type ]
            );
        } else {
            currencyIndicator = locale.indicator.sign;
        }
        
        if (currencyIndicator) {
            let space = locale.indicator.space ? " " : "";
            switch (locale.indicator.position) {
                case "before":
                    number = currencyIndicator + space + number;
                    break;
                case "after":
                    number = number + space + currencyIndicator;
                    break;
            }
        }
        
        return number;
    }
    
    static element(number, userOptions = {}, userCurrencyCode = null) {
        
        let locale = NumberFormatter.#buildOutputLocale("currency", userOptions);
        
        let currencyIndicator = null;
        if (locale.indicator.type) {
            currencyIndicator = NumberFormatter.#getCurrencyIndicator(
                userCurrencyCode ?? NumberFormatter.#active.currency,
                [ locale.indicator.type ]
            );
        } else {
            currencyIndicator = locale.indicator.sign;
        }
        
        locale.indicator.type = false;
        locale.indicator.sign = false;
        number = NumberFormatter.currency(number, locale);
        
        let [integer, fraction] = number.split(locale.seperator.decimal);
        
        let moneyEl = elem("div", {"class" : NumberFormatter.#elementClasses.element});
        let amountEl = elem("span", {"class" : NumberFormatter.#elementClasses.amount}, [
            elem("span", {"class" : "int"}, integer),
            elem("span", {"class" : "frc"}, locale.seperator.decimal + fraction),
        ]);
        let curEl = elem("span", {
            "class" : NumberFormatter.#elementClasses.currency
        }, currencyIndicator);
        
        switch (locale.indicator.position) {
            case "before":
                moneyEl.append(curEl);
                moneyEl.append(amountEl);
                break;
            case "after":
                moneyEl.append(amountEl);
                moneyEl.append(curEl);
                break;
        }
        
        return moneyEl;
    }
    
    
    static percent(number, userOptions = {}) {
        
        let locale = NumberFormatter.#buildOutputLocale("percent", userOptions);
        
        number = Number.format(
            number,
            locale.fraction.maxDigits,
            locale.seperator.decimal,
            locale.seperator.thousand
        );
        
        number = NumberFormatter.#trimFractionDigits(number, locale);
        
        let sign  = locale.indicator.sign;
        let space = locale.indicator.space ? " " : "";
        
        switch (locale.indicator.position) {
            case "before":
                number = sign + space + number;
                break;
            case "after":
                number = number + space + sign;
                break;
        }
        
        return number;
    }
    
    //#endregion
    
    
    // #region ==================== INPUT
    
    static parse(text) {
        
        text = text.toString();
        
        stripCurrency:
        {
            let currencies = [];
            for (let code in NumberFormatter.#CURRENCIES) {
                let currency = NumberFormatter.#CURRENCIES[code];
                currencies.push(currency.sign);
                currencies.push(currency.code);
                currencies.push(currency.abbr ?? "");
            }
            currencies = currencies.sort((a,b) => b.length - a.length);
            let replaceValues = [];
            currencies.forEach(currency => replaceValues.push(currency + " "));
            currencies.forEach(currency => replaceValues.push(" " + currency));
            replaceValues = replaceValues.concat(replaceValues, currencies);
            replaceValues.forEach(val => text = text.replace(val, ""));
        }
        
        stripSeperators:
        {
            let seperators = text.match(/[^0-9]/g);
            let decimalSeperator = seperators.pop();
            seperators.forEach(char => text = text.replace(char, ""));
            text = text.replace(decimalSeperator, ".");
        }
        
        let number = parseFloat(text);
        
        return number;
    }
    
    //#endregion
    
    
}