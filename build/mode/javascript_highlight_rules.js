
var keywordMapper = {
    "variable.language":
        "^(Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"     + // Constructors
        "Namespace|QName|XML|XMLList|"                                                  + // E4X
        "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"        +
        "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                         +
        "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"        + // Errors
        "SyntaxError|TypeError|URIError|"                                               +
        "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|"      + // Non-constructor functions
        "isNaN|parseFloat|parseInt|"                                                    +
        "JSON|Math|"                                                                    + // Other
        "this|arguments|prototype|window|document)$"                                    , // Pseudo
    "keyword":
        "^(const|yield|import|get|set|" +
        "break|case|catch|continue|default|delete|do|else|finally|for|function|"            +
        "if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|"  +
        "__parent__|__count__|escape|unescape|with|__proto__|prototype"                     + // invalid or reserved
        "class|enum|extends|super|export|implements|private|public|interface|package|protected|static)$",
    "storage.type":
        "^(const|let|var|function)$",
    "constant.language":
        "^(null|Infinity|NaN|undefined)$",
    "support.function":
        "^alert$",
    "constant.language.boolean": "^(true|false)$",
    "numeric":"^(0[xX][0-9a-fA-F]+|-?\\d+((\\.\\d*)?([eE\\^][+-]?\\d+)?)?)$",
    "operator":"^(\\~|\\%|\\^|&&|&|\\*|\\?|\\!|\\+|<<=|>>=|>>>=|>>|<<|>>>|=|==|===|<=|>=|\\!=|<|>|\\|\\=|\\*=|=|&=|\\+=|\\-=|^=|\\+\\+|\\-\\-|\\-)$",
    "multiline.comment.open":"^(\\/\\*.*)$",
    "multiline.comment.close":"^(.*\\*\\/)$",
    "line.comment":"^(\\/\\/.*)$",
    "newline":"^(NnN)$",
}