function PasswordGenerator() {
    var self = this;
    self.constant = {
        includeLowercase: true,
        includeUppercase: true,
        includeNumbers: true,
        includeSymbols: true,
        mustHaveLowercase : true,
        mustHaveUppercase : true,
        mustHaveDigit : true,
        mustHaveNonAlphaNumeric : true,
        minLength : 4,
        maxLength : 4,
        excludedCharacters : "(){}[]\"'",
        quantity: 1
    }

    var lowerCase, upperCase, digits, nonAlphaNumeric, allCharacters;

    var includeLowercase, includeUppercase, includeNumbers,
        includeSymbols, mustHaveLowercase, mustHaveUppercase,
        mustHaveDigit, mustHaveNonAlphaNumeric,
        minLength, maxLength, excludedCharacters, quantity;

    function init () {
        lowerCase = "";
        upperCase = "";
        digits = "";
        nonAlphaNumeric = "";
        allCharacters = "";

        // Configs Default
        includeLowercase = self.constant.includeLowercase;
        includeUppercase = self.constant.includeUppercase;
        includeNumbers  = self.constant.includeNumbers;
        includeSymbols = self.constant.includeSymbols;
        mustHaveLowercase = self.constant.mustHaveLowercase;
        mustHaveUppercase = self.constant.mustHaveUppercase;
        mustHaveDigit = self.constant.mustHaveDigit;
        mustHaveNonAlphaNumeric = self.constant.mustHaveNonAlphaNumeric;
        minLength = self.constant.minLength;
        maxLength = self.constant.maxLength;
        excludedCharacters = self.constant.excludedCharacters;
        quantity = self.constant.quantity;
    }

    self.getConfigs = function() {
        return {
            includeLowercase: includeLowercase,
            includeUppercase: includeUppercase,
            includeNumbers: includeNumbers,
            includeSymbols: includeSymbols,
            minLength : minLength,
            maxLength : maxLength,
            excludedCharacters : excludedCharacters,
            quantity: quantity
        }
    }

    var setConfigs = function(inputs) {
        if(!inputs)
            return;

        if(inputs.includeLowercase == true) {
            includeLowercase = mustHaveLowercase = inputs.includeLowercase;
        } else {
            includeLowercase = mustHaveLowercase = false;
        }
        if(inputs.includeUppercase == true) {
            includeUppercase = mustHaveUppercase = inputs.includeUppercase;
        } else {
            includeUppercase = mustHaveUppercase = false;
        }
        if(inputs.includeNumbers == true) {
            includeNumbers = mustHaveDigit = inputs.includeNumbers;
        } else {
            includeNumbers = mustHaveDigit = false;
        }

        if(inputs.includeSymbols == true) {
            includeSymbols = mustHaveNonAlphaNumeric = inputs.includeSymbols;
        } else {
            includeSymbols = mustHaveNonAlphaNumeric = false;
        }

        if(Number.isInteger(inputs.minLength) && inputs.minLength > 0) {
            minLength = parseInt(inputs.minLength);
        }

        if(Number.isInteger(inputs.maxLength) && inputs.maxLength > 0 && inputs.maxLength >= inputs.minLength) {
            maxLength = parseInt(inputs.maxLength);
        }

        if(inputs.excludedCharacters) {
            excludedCharacters = inputs.excludedCharacters;
        }

        if(Number.isInteger(parseInt(inputs.quantity)) && inputs.quantity > 0 && inputs.quantity <= 100000) {
            quantity = parseInt(inputs.quantity);
        }
    }

    String.prototype.shuffle = function () {
        var a = this.split(""),
            n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    function populateCharacterSet() {
        for (var i = 1 + 32; i <= 94 + 32; i++) {
            var c = String.fromCharCode(i);

            //Check is this character excluded
            var isIgnored = false;
            for (var j = 0; j < excludedCharacters.length; j++) {
                if (c == excludedCharacters.charAt(j)) {
                    isIgnored = true;
                    break;
                }
            }

            //if this character is not excluded then put it to the specific character set variable
            if (!isIgnored) {
                //put digits (0-9) to the set of digit
                if (includeNumbers && 16 + 32 <= i && i <= 25 + 32) {
                    digits += c;
                }
                //put upper case characters (A-Z) to the set of uppercase characters
                if (includeUppercase && 33 + 32 <= i && i <= 58 + 32) {
                    upperCase += c;
                }
                //put lower case characters (a-z) to the set of lowercase characters
                if (includeLowercase && 65 + 32 <= i && i <= 90 + 32) {
                    lowerCase += c;
                }
                //put nonalphanumeric characters to the set of nonalphanumeric characters
                if (includeSymbols && ((1 + 32 <= i && i <= 15 + 32) || (26 + 32 <= i && i <= 32 + 32) || (59 + 32 <= i && i <= 64 + 32) || (91 + 32 <= i && i <= 94 + 32))) {
                    nonAlphaNumeric += c;
                }
            }
        }

        //marge all valid characters and put to the set of all valid characters
        allCharacters = digits + lowerCase + upperCase + nonAlphaNumeric;
    }

    function generateRandomPassword() {
        var rp = null; // Random Password

        //handle incompatible value of minLength and maxLength
        if (maxLength < minLength) {
            return {status: "error", message: "Maximum length should be greater than minimum length"};
        }
        //########################################### Step 3 : generate password length ##########################################################
        //initialize default password length as 10
        var passwordLength = 10;

        //count how many conditions will be applied
        var conditionNumber = 0;
        if (mustHaveLowercase) {
            conditionNumber++;
        }
        if (mustHaveUppercase) {
            conditionNumber++;
        }
        if (mustHaveDigit) {
            conditionNumber++;
        }
        if (mustHaveNonAlphaNumeric) {
            conditionNumber++;
        }
        // make number of conditions is equal to maxLength when maxLength is less than conditionNumber
        if(maxLength < conditionNumber)
            conditionNumber = maxLength;
        //update minLength when number of conditions is greater then minLength
        if (minLength < conditionNumber) {
            minLength = conditionNumber;
        }

        //generate random password length within minLength and maxLength if default password length 10 is not valid for range
        // if (10 < minLength || maxLength < 10) {
        passwordLength = minLength + Math.floor((Math.random() * (maxLength - minLength + 1)));
        // }

        //######################################################################################################################################

        //######################################## Step 4 : Choose random valid characters #####################################################
        var index;                      //to hold random index of the specific character set
        rp = "";                        //Initialize random password

        //add a lowercase character into the random password rp
        if (mustHaveLowercase) {
            index = Math.floor((Math.random() * lowerCase.length) + 1);
            rp += lowerCase.charAt(index);
        }
        //add a upper case character into the random password rp
        if (mustHaveUppercase) {
            index = Math.floor((Math.random() * upperCase.length) + 1);
            rp += upperCase.charAt(index);
        }
        //add a digit into the random password rp
        if (mustHaveDigit) {
            index = Math.floor((Math.random() * digits.length) + 1);
            rp += digits.charAt(index);
        }
        //add a nonalphanumeric character in to the random password rp
        if (mustHaveNonAlphaNumeric) {
            index = Math.floor((Math.random() * nonAlphaNumeric.length) + 1);
            rp += nonAlphaNumeric.charAt(index);
        }

        //now add rest of the valid characters in to the random password rp
        while(rp.length < passwordLength) {
            index = Math.floor((Math.random() * allCharacters.length) + 1);
            rp += allCharacters.charAt(index);
        }

        //now shuffle all characters in the random password
        return rp.shuffle();
    }

    self.generate = function(inputs) {
        init();
        setConfigs(inputs);
        populateCharacterSet();

        var results = [];

        for(var i=0; i < quantity; i++) {
            results.push(generateRandomPassword());
        }

        return {status: "ok", results: results};
    }
}