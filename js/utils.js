//used in the ViewModel to help figure out what the string starts with in the search function. 

var stringContains = function (string, contain_string) {          
    string = string || "";
    if (contain_string.length > string.length)
        return false;
    return string.indexOf( contain_string ) != -1;
};