/*

TITLE: 
  MAIN.JS

AUTHOR: Seagat2011 
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
    
REFERENCES:
  N/A

DESCRIPTION: 
  JINSIL / JINT BLACK SPADE - (sourcecode editor for JINSIL / JINT BLUE)

INPUT:
  plain text

OUTPUT:
  pretty-text
  
SCRIPT TYPE: 
  pretty-text renderer

*/

var id = null 
var toTEXTBUFFER = ''
var voidkeycode = {
    16: 1,
    17: 1,
    18: 1,
    20: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
    37: 1,
    38: 1,
    39: 1,
    40: 1,
    45: 1,
    225: 1,
}
function setText(o,w) {
    if('innerText' in o) {
        o.innerText = w
    } else {
        o.innerHTML = w
    }
}
function getText(o) {
    var ret
    if('innerText' in o) {
        ret = o.innerText
    } else {
        ret = o.textContent
    }
    return ret
}
function newline(o) {
    var ret
    if('innerText' in o) {
        ret = '\n'
    } else {
        ret = '<br>'
    }
    return ret
}
function _rows() {
    this.rows = []
    this.fontsize = 9
    this.lastResizeNum
    this.resize = function(startIDX, ht) {
        this.rows = []
        startIDX = startIDX || 0
        ht = Math.max(ht || 0, te.clientHeight, te.scrollHeight)
        if (ht != this.lastResizeNum || !this.lastResizeNum) {
            var B = parseInt((ht / this.fontsize) * 0.62)
            /* 12pt:0.80; 13pt:0.75; 9pt:0.65; 10pt:0.62 */
            for (var b = startIDX; b < B; b++) {
                this.rows.push(b + 1)
            }
            setText(__rows__,this.rows.join(newline(__rows__)))
            this.lastResizeNum = ht
        }
    }
    this.resize()
}
_rows.prototype = __rows__
function _editor(ent,md,th) {
    this.getLines = function() {
        return getText(te).split(/\n/gm)
    }
    this.setLine = function(i,w) {
        var status = false
        var ret = getText(te).split(/\n/gm)
        if (i in ret) {
            status = true
            ret[i] = w
            setText(te,ret.join(newline(__rows__)))
            this.highlight_keywords(getText(te), de)
        } else 
        if(i==0) {
            setText(te,w)
            this.highlight_keywords(getText(te), de)
        }
        return status
    }
    this.setMODE = function() {
    
    }
    this.setTHEME = function() {
    
    }
    this.highlight_keywords = function(txt, v) {
        if (toTEXTBUFFER != txt) {
            toTEXTBUFFER = txt
            var s = txt
            .replace(/\n/gm, '%#%NnN%#%')
            .replace(/\s/gm, ' SsS ')
            .replace(/([\W]+)/gm, ' $1 ')
            .replace(/('|"|`)/gm, ' $1 ')
            .replace(/(%#%)+/gm, ' ')
            .split(/\s+/)
            var _s = s
            /* var keywordMapper = */// external declaration //
            var fe = {
                token: "",
                hasFE: null ,
            }
            var toHTML = s.map(function(w, i, me) {
                fe.token = w
                if (keywordMapper.hasOwnProperty(w)) {
                    fe = keywordMapper[w](fe)
                } else 
                if (w.match(keywordMapper["numeric"]) && !(fe.hasFE)) {
                    fe.token = "<ace_numeric>" + w + "</ace_numeric>"
                }
                return fe.token
            }
            )
            v.innerHTML = toHTML.join('')
        }
    }
}
_editor.prototype = __editor__

var rows = new _rows()
var editor = new _editor()

function init() {
    te.addEventListener('keyup', function(e) {
        if (id) {
            delete id
            editor.highlight_keywords(getText(te), de)
        }
    }
    , false)
    te.addEventListener('keydown', function(e) {
        if (!voidkeycode[e.keycode]) {
            id = 1
        }
        de.scrollTop = te.scrollTop
        de.scrollLeft = te.scrollLeft
        rows.resize()
    }
    , false)
    te.addEventListener('scroll', function(e) {
        de.scrollTop = e.target.scrollTop
        de.scrollLeft = e.target.scrollLeft
        __rows__.scrollTop = te.scrollTop
        __rows__.scrollLeft = te.scrollLeft
    }
    , false)
}
init()
