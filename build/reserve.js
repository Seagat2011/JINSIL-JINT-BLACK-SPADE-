// MINIFY
    this.tokenize = function(){
        var s = this.innerText
            .replace(/\s/m,' SsS ')
            .replace(/\n/m,' NnN ')
            .replace(/\s+/gm,' ')
            .replace(/([\W]+)/gm,' $1 ')
            .split(/\s+/)
        /* var keywordMapper = */ // external declaration //
        var line_comment = Infinity
        var multiline_comment = Infinity
        this.toHTML = s.map(function(w,i,me){
            var token = w
            if (w.match(keywordMapper["multiline.comment.open"])) {
                multiline_comment = Math.min(i+1, multiline_comment)
                token = "<ace_comment>"+w
            } else
            if (w.match(keywordMapper["multiline.comment.close"])) {
                multiline_comment = 1e308
                token = w+"</ace_comment>"
            } else
            if (multiline_comment && (i>multiline_comment-1)) {
                if (w.match(keywordMapper["newline"])) {
                    token = "<br>" 
                } else 
                if (w=='SsS') {
                    token = "&nbsp;"
                } else {
                    // NOP //
                }
            } else
            if (w.match(keywordMapper["line.comment"])) {
                line_comment = Math.min(i+1, line_comment)
                token = "<ace_comment>"+w
            } else
            if (w.match(keywordMapper["newline"]) && line_comment) {
                line_comment = 1e308
                token = "</ace_comment><br>"
            } else
            if (w.match(keywordMapper["newline"])) {
                token = "<br>"
            } else
            if (line_comment && (i>line_comment-1) ) {
                if (w=='SsS') {
                    token = "&nbsp;"
                } else {
                    // NOP //
                }
            } else
            if (w.match(keywordMapper["variable.language"])) {
                token = "<ace_variable>"+w+"</ace_variable>"
            } else
            if (w.match(keywordMapper["keyword"])) {
                token = "<ace_keyword>"+w+"</ace_keyword>"
            } else
            if (w.match(keywordMapper["storage.type"])) {
                token = "<ace_storage>"+w+"</ace_storage>"
            } else
            if (w.match(keywordMapper["constant.language"])) {
                token = "<ace_constant>"+w+"</ace_constant>"
            } else
            if (w.match(keywordMapper["support.function"])) {
                token = "<ace_function>"+w+"</ace_function>"
            } else 
            if (w.match(keywordMapper["constant.language.boolean"])) {
                token = "<ace_constant>"+w+"</ace_constant>"
            } else
            if (w.match(keywordMapper["numeric"])) {
                token = "<ace_numeric>"+w+"</ace_numeric>"
            } else
            if (w.match(keywordMapper["operator"])) {
                token = "<ace_operator>"+w+"</ace_operator>"
            } else
            if ((line_comment || multiline_comment) && (i==me.length-1)) {
                token = w+"</ace_comment>"
            } else 
            if (w=='SsS') {
                token = "&nbsp;"
            } 
            return token
        })
    }

function _editor(){
    this.timeout = 1400
    this.getTime = function() { return new Date().getTime() }
    this.startTime = this.getTime()
    this.invalidateFlag = false
    this.spellcheck = false
    this.contentEditable = true
    this.getCursor = function() {
        return document.getSelection().focusOffset
    }
    this.setCursor = function(v) {
        if (this.toHTML[v]) {
            //this.toHTML[v] = "<ace></ace>" + this.toHTML[v]
        }
    }
    this.resize = function(ht){
        if (ht && (ht>this.clientHeight)) {
            this.style.height = ht
        }
    }
    this.toHTML = ''
    this.tokenize = function(){
        var s = this.innerText
            .replace(/\n/gm,' NnN ')
            .replace(/([\W]+)/gm,' $1 ')
            .split(/\s+/)
        /* var keywordMapper = */ // external declaration //
        var line_comment = Infinity
        var multiline_comment = Infinity
        this.toHTML = s.map(function(w,i,me){
            var token = w
            if (w.match(keywordMapper["multiline.comment.open"])) {
                multiline_comment = Math.min(i+1, multiline_comment)
                token = "<ace_comment>"+w
            } else
            if (w.match(keywordMapper["multiline.comment.close"])) {
                multiline_comment = 1e308
                token = w+"</ace_comment>"
            } else
            if (multiline_comment && (i>multiline_comment-1)) {
                if (w.match(keywordMapper["newline"])) {
                    token = "<br>" 
                } else {
                    // NOP //
                }
            } else
            if (w.match(keywordMapper["line.comment"])) {
                line_comment = Math.min(i+1, line_comment)
                token = "<ace_comment>"+w
            } else
            if (w.match(keywordMapper["newline"]) && line_comment) {
                line_comment = 1e308
                token = "</ace_comment><br>"
            } else
            if (w.match(keywordMapper["newline"])) {
                token = "<br>"
            } else
            if (line_comment && (i>line_comment-1) ) {
                // NOP //
            } else
            if (w.match(keywordMapper["variable.language"])) {
                token = "<ace_variable>"+w+"</ace_variable>"
            } else
            if (w.match(keywordMapper["keyword"])) {
                token = "<ace_keyword>"+w+"</ace_keyword>"
            } else
            if (w.match(keywordMapper["storage.type"])) {
                token = "<ace_storage>"+w+"</ace_storage>"
            } else
            if (w.match(keywordMapper["constant.language"])) {
                token = "<ace_constant>"+w+"</ace_constant>"
            } else
            if (w.match(keywordMapper["support.function"])) {
                token = "<ace_function>"+w+"</ace_function>"
            } else 
            if (w.match(keywordMapper["constant.language.boolean"])) {
                token = "<ace_constant>"+w+"</ace_constant>"
            } else
            if (w.match(keywordMapper["numeric"])) {
                token = "<ace_numeric>"+w+"</ace_numeric>"
            } else
            if (w.match(keywordMapper["operator"])) {
                token = "<ace_operator>"+w+"</ace_operator>"
            } else
            if ((line_comment || multiline_comment) && (i==me.length-1)) {
                token = w+"</ace_comment>"
            } 
            return token
        })
    }
    this.annotate = function(){
        this.innerHTML = this.toHTML.join(' ') || this.innerHTML
    }
    this.keybuff
    this.invalidate = function() {
        this.invalidateFlag = true
        this.startTime = this.getTime() + this.timeout
    }
    this.voidkeycode = {
        16:1,17:1,18:1,20:1,33:1,34:1,35:1,36:1,37:1,38:1,39:1,40:1,45:1,225:1,
    }
    this.redraw = function(drw) {
        if (drw) {
            this.tokenize()
            this.annotate()
            this.keybuff = null
            this.invalidateFlag = false
            this.startTime = this.getTime()
        } else
        if (this.invalidateFlag) { // first check flag (performance) //
            if (this.getTime() > (this.startTime + this.timeout)) { 
                this.tokenize()
                this.annotate()
                this.keybuff = null
                this.invalidateFlag = false
                this.startTime = this.getTime()
            }
        } 
    }
    this.redraw('force')
    this.resize(editor_shell.clientHeight)
}
_editor.prototype = __editor__

this.keybuff
    this.invalidate = function(kcode) {
        this.invalidateFlag = true
        this.keybuff = !this.voidkeycode[this.keybuff] ? this.keybuff:kcode.keyCode
        this.startTime = this.getTime() + this.timeout
    }
    this.voidkeycode = {
        16:1,17:1,20:1,33:1,34:1,37:1,38:1,39:1,40:1,45:1,225:1,
    }
    this.redraw = function(drw) {
        if (drw) {
            this.tokenize()
            this.annotate()
            this.keybuff = null
            this.invalidateFlag = false
            this.startTime = this.getTime()
        } else
        if (this.invalidateFlag) { // first check flag (performance) //
            if ((this.getTime() > (this.startTime + this.timeout)) && !this.voidkeycode[this.keybuff]) { 
                this.tokenize()
                this.annotate()
                this.keybuff = null
                this.invalidateFlag = false
                this.startTime = this.getTime()
            }
        } 
    }

function updateTHEMELIBRARY(attr) { // href
    var dom = new __dom()
    if (!dom.styleSheets[1]) {
    //dom.styleSheets.push(dom.styleSheets[0])
    //dom.styleSheets[1].href
    }

}

function updateMODELIBRARY(attr) { // outterHTML + src
    var dom = new __dom()
    if (!dom.scripts[1]) {
    //dom.scripts.push(dom.scripts[0])
    //dom.scripts[1].src
    //dom.scripts[1].outterHTML
    }

}

function optArrayGroup(values, _default_) {
    return values.map(function(item) {
        if (typeof item == "string") {
            item = {name: item,caption: item}
        }
        var attr = {value: item.value || item.name}
        if (typeof item.name == "string" && item.name == _default_) {
            updateTHEMELIBRARY(attr)
            updateMODELIBRARY(attr)
            attr.selected = 'selected'
        }
        return set_elem_tag("option", attr, item.caption || item.desc)
    })
}

function optKeyGroup(values, _default_) {
    return Object.keys(values).map(function(i) {
        var attr = {"label": i}
        if (i == _default_) {
            updateTHEMELIBRARY(attr)
            updateMODELIBRARY(attr)
            attr.selected = 'selected'
        }
        return set_elem_tag("optgroup", attr, optgroup(values[i]))
    })
}

//addEventListener('keyup',function(){ var tm = setTimeout(function(tm) { editor.redraw(tm) }, editor.timeout) },false)

//editor.addEventListener('scroll',function(pos){ console.log(pos) },false)

this.redraw = function(selfcall) {
        /*
        if (this.timeout_handle) {
            //clearTimeout(tm)
            //tm = setTimeout(null,this.timeout)
            //document.getSelection()
            clearTimeout(this.timeout_handle)
            this.timeout_handle = this.timeout_handle = setTimeout(null,this.timeout)
        */
        //this.endTime = this.getTime()
        if (
        (drw) ||
        ( this.getTime() > (this.startTime + this.timeout) ) {
        //( this.endTime > (this.startTime + this.timeout) ) {
            this.getCursor()
            this.tokenize()
            this.annotate()
            this.setCursor()
            this.startTime = this.getTime()
            //this.endTime = this.startTime = this.getTime()
        } 
        else {
            this.startTime += this.timeout
            /*
            this.getCursor()
            this.tokenize()
            this.annotate()
            this.setCursor()
            */
        }
    }

this.redraw = function(tm) {
        if (tm || this.timeout_handle) {
            clearTimeout(tm)
            clearTimeout(this.timeout_handle)
            this.timeout_handle = setTimeout(function(){  },this.timeout)
        } else {
            this.tokenize()
            this.annotate()
            /*
            if(et){
                this.tokenize()
                this.annotate()
                this.startTime = this.endTimer = this.getTime()
            } else
            if(this.endTime-this.startTimer>this.timeout) {
                    this.tokenize()
                    this.annotate()
                    this.startTime = this.endTime
                }
            }
            this.endTime = this.getTime()
            */
        }
    }

this.redraw = function(et) {
        /*
        if (tm || this.timeout_handle) {
            clearTimeout(tm)
            clearTimeout(this.timeout_handle)
            this.timeout_handle = setTimeout(null,this.timeout)
        } else {
        */
        this.endTime = this.getTime()
        if (et || (this.endTime-this.startTime>this.timeout)) {
            setTimeout(null, this.timeout)
            this.tokenize()
            this.annotate()
            this.startTime = this.endTime = this.getTime()
            /*
            if(et){
                this.tokenize()
                this.annotate()
                this.startTime = this.endTimer = this.getTime()
            } else
            if(this.endTime-this.startTimer>this.timeout) {
                    this.tokenize()
                    this.annotate()
                    this.startTime = this.endTime
                }
            }
            this.endTime = this.getTime()
            */
        }
        this.startTime += this.timeout
    }

setInterval(function(){ editor.redraw() },100)

function __cursor(){
    var dom = new __dom()
    this.element = dom.__proto__.getElementById('cursor')
    this.blinkInterval = 500
    this.session = false
    this.position = {row : 0, col : 0}
    this.blink = function(){
        if (!this.isVisible) {
            this.showCursor()
        } else 
        if (this.isVisible) {
            this.hideCursor()
        }
    }
    this.hideCursor = function() {
        this.isVisible = false
        dom.removeCSSClass(this.element, "blink")
    }
    this.showCursor = function() {
        this.isVisible = true
        dom.addCSSClass(this.element, "blink")
    }
    this.getCursor = function() {
        return this.position
    }
    this.setCursor = function(position, onScreen) {
        if (!this.session) {
            this.session = true
        }
        if (!position) {
            position = this.getCursor()
        } else {
            var x = position.x || position.clientX || position.pageX
            var y = position.y || position.clientY || position.pageY
            var cursorCOL = pos.column * this.config.characterWidth
            var cursorROW = (pos.row - (onScreen ? this.position.row : 0)) * this.config.lineHeight
            this.positon = {row : cursorROW, col : cursorCOL}
        }
    }
}
__cursor.prototype = {}

var themelist = new __themelist()
var util = new __util()
var htm = new __htm()
var modelist = new __modelist()
//var cursor = new __cursor()


util.fillDropdown(htm.mode, modelist.modes, modelist.modes[50].name) /* default mode library: javascript */
util.fillDropdown(htm.theme, themelist.themes, themelist.themes[0].name) /* default theme: chrome */

//editor.addEventListener('click',function(pos){ cursor.setCursor(pos) },false)
addEventListener('resize',function(){ rows.resize() },false)

//editor.addEventListener('scroll',function(pos){ console.log(pos) },false)

//setInterval(function(){ cursor.blink() }, cursor.blinkInterval)

.divSourceWindow {
    float:left;
    width:97%;
    /*height:100%;*/
    /*border: 1px rgba(0,0,0,0.25) solid;*/
    cursor:text;
    display:inline;
    padding-left:2px;
}
.divSettingsPane {
    float:left;
    width:18%;
    height:100%;
    background:#f8f8f8;
}
.cssScroll {
    padding-top: 4px;
    width:21px;
    /*height:100%;
    border-top:1px #8e8e8e solid;
    border-left:1px #8e8e8e solid;
    border-bottom:1px #8e8e8e solid;*/
    font-family:'liberation mono, courier new';
    font-size:12px;
    float:left;
    background:#dedede;
    color:#4e4e4e;
}
cursor {
    z-index:2;
    padding:1px;
    position:absolute;
    height:1.8%;
}
.blink {
   background-color: #8e8e8e;
}
.overwrite {
    padding:4px;
    height:1%;
}

<cursor id=cursor class=blink></cursor>

function __cursor(){
    var dom = new __dom()
    this.element = dom.__proto__.getElementById('cursor')
    this.blinkInterval = 500
    this.session = false
    this.position = {row : 0, col : 0}
    this.blink = function(){
        if (!this.isVisible) {
            this.showCursor()
        } else 
        if (this.isVisible) {
            this.hideCursor()
        }
        //this.intervalId = setTimeout(__cursor.restartTimer, 2 * this.blinkInterval)
        //this.restartTimer() 
       //setTimeout(function() { this.restartTimer() }, this.blinkInterval)
    }//.bind(this)
    this.hideCursor = function() {
        this.isVisible = false
        dom.removeCSSClass(this.element, "blink")
        //this.restartTimer()
    }
    this.showCursor = function() {
        this.isVisible = true
        dom.addCSSClass(this.element, "blink")
        //this.restartTimer()
    }
    this.restartTimer = function() {
        //setTimeout(null, this.blinkInterval) 
        clearInterval(this.intervalId)
        clearTimeout(this.timeoutId)
        if (!this.isVisible) {
            this.showCursor()
        } else 
        if (this.isVisible) {
            this.hideCursor()
        }
        this.intervalId = setInterval(__cursor.restartTimer, this.blinkInterval)
        this.blink()
    }
    this.getCursor = function() {
        return this.position
    }
    this.setCursor = function(position, onScreen) {
        if (!this.session) {
            this.session = true
        }
        if (!position) {
            position = this.getCursor()
        } else {
            var x = position.x || position.clientX || position.pageX
            var y = position.y || position.clientY || position.pageY
            var cursorCOL = pos.column * this.config.characterWidth
            var cursorROW = (pos.row - (onScreen ? this.position.row : 0)) * this.config.lineHeight
            this.positon = {row : cursorROW, col : cursorCOL}
        }
    }
}
__cursor.prototype = {}