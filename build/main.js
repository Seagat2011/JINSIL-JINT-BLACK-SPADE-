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
  JINSIL / JINT Blue renderer interface

INPUT:
  plain text

OUTPUT:
  pretty-text
  
SCRIPT TYPE: 
  pretty-text renderer

*/

function __dom() {
    var XHTML_NS = "http://www.w3.org/1999/xhtml"
    this.getDocumentHead = function(doc) {
        if (!doc) {
            doc = document
        }
        return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement
    }
    this.createElement = function(tag, ns) {
        return document.createElementNS ? 
        document.createElementNS(ns || XHTML_NS, tag) : 
        document.createElement(tag)
    }
    this.hasCSSClass = function(elem, name) {
        var classes = (elem.className || "").split(/\s+/g)
        return classes.indexOf(name) !== -1
    }
    this.addCSSClass = function(elem, name) {
        if (!this.hasCSSClass(elem, name)) {
            elem.className += " " + name
        }
    }
    this.removeCSSClass = function(elem, name) {
        var classes = elem.className.split(/\s+/g)
        while (true) {
            var index = classes.indexOf(name)
            if (index == -1) {
                break
            }
            classes.splice(index, 1)
        }
        elem.className = classes.join(" ")
    }
    this.updateCSSClass = function(node, className, include) {
        if (include) {
            this.addCSSClass(node, className)
        } else {
            this.removeCSSClass(node, className)
        }
    }
    this.appendCSSStylesheet = function(uri, doc) {
        if (doc.createStyleSheet) {
            doc.createStyleSheet(uri)
        } else {
            var link = this.createElement('link')
            link.rel = 'stylesheet'
            link.href = uri
            this.getDocumentHead(doc).appendChild(link)
        }
    }
    this.get = function(key) {
        if (!options.hasOwnProperty(key)) {
            throw new Error("Unknown config key: " + key)
        }
        return this.options[key]
    }
    this.set = function(key, value) {
        if (!options.hasOwnProperty(key)) {
            throw new Error("Unknown config key: " + key)
        }
        this.options[key] = value
    }
    this.options = {
        packaged: false,
        workerPath: null,
        modePath: null,
        themePath: null,
        basePath: "",
        suffix: ".js",
        $moduleUrls: {},
    }
}
__dom.prototype = document

function set_elem_tag(tag, attributes, content) {
    var dom = new __dom()
    var el = dom.createElement(tag)
    if (typeof content == "string") {
        el.appendChild(document.createTextNode(content))
    } else if (content) {
        content.forEach(function(ch) {
            el.appendChild(ch)
        })
    }
    for (var i in attributes) {
        el.setAttribute(i, attributes[i])
    }
    return el
}

function optArrayGroup(values, _default_) {
    return values.map(function(item) {
        if (typeof item == "string") {
            item = {name: item,caption: item}
        }
        var attr = {value: item.value || item.name}
        if (typeof item.name == "string" && item.name == _default_) {
            attr.selected = 'selected'
        }
        return set_elem_tag("option", attr, item.caption || item.desc)
    })
}

function optKeyGroup(values, _default_) {
    return Object.keys(values).map(function(i) {
        var attr = {"label": i}
        if (i == _default_) {
            attr.selected = 'selected'
        }
        return set_elem_tag("optgroup", attr, optgroup(values[i]))
    })
}

function dropdown(values, _default_) {
    var result
    if (Array.isArray(values)) {
        result = optArrayGroup(values, _default_)
    } else {
        result = optKeyGroup(values, _default_)
    }
    return result
}

function __util() {
    this.fillDropdown = function(el, values, _default_) {
        if (typeof el == "string") {
            el = document.getElementById(el)
        }
        dropdown(values, _default_).forEach(function(e) {
            el.appendChild(e)
        })
    }
}
__util.prototype = []


/*********** options panel ***********/
function __htm() {
    this.doc = document.getElementById("doc")
    this.mode = document.getElementById("mode")
    this.wrapMode = document.getElementById("soft_wrap")
    this.theme = document.getElementById("theme")
    this.folding = document.getElementById("folding")
    this.selectStyle = document.getElementById("select_style")
    this.highlightActive = document.getElementById("highlight_active")
    this.showHidden = document.getElementById("show_hidden")
    this.showGutter = document.getElementById("show_gutter")
    this.showPrintMargin = document.getElementById("show_print_margin")
    this.highlightSelectedWord = document.getElementById("highlight_selected_word")
    this.showHScroll = document.getElementById("show_hscroll")
    this.showVScroll = document.getElementById("show_vscroll")
    this.animateScroll = document.getElementById("animate_scroll")
    this.softTab = document.getElementById("soft_tab")
    this.behaviours = document.getElementById("enable_behaviours")
}
__htm.prototype = []

function __modelist() {
    this.modes = []
    this.modesByName = {}
    this.getModeForPath = function(path) {
        var mode = this.modesByName.text
        var fileName = path.split(/[\/\\]/).pop()
        for (var i = 0; i < this.modes.length; i++) {
            if (this.modes[i].supportsFile(fileName)) {
                mode = this.modes[i]
                break
            }
        }
        return mode
    }
    
    var supportedModes = {
        ABAP: ["abap"],
        ABC: ["abc"],
        ActionScript: ["as"],
        ADA: ["ada|adb"],
        Apache_Conf: ["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],
        AsciiDoc: ["asciidoc|adoc"],
        Assembly_x86: ["asm"],
        AutoHotKey: ["ahk"],
        BatchFile: ["bat|cmd"],
        C_Cpp: ["cpp|c|cc|cxx|h|hh|hpp"],
        C9Search: ["c9search_results"],
        Cirru: ["cirru|cr"],
        Clojure: ["clj|cljs"],
        Cobol: ["CBL|COB"],
        coffee: ["coffee|cf|cson|^Cakefile"],
        ColdFusion: ["cfm"],
        CSharp: ["cs"],
        CSS: ["css"],
        Curly: ["curly"],
        D: ["d|di"],
        Dart: ["dart"],
        Diff: ["diff|patch"],
        Dockerfile: ["^Dockerfile"],
        Dot: ["dot"],
        Dummy: ["dummy"],
        DummySyntax: ["dummy"],
        Eiffel: ["e"],
        EJS: ["ejs"],
        Elixir: ["ex|exs"],
        Elm: ["elm"],
        Erlang: ["erl|hrl"],
        Forth: ["frt|fs|ldr"],
        FTL: ["ftl"],
        Gcode: ["gcode"],
        Gherkin: ["feature"],
        Gitignore: ["^.gitignore"],
        Glsl: ["glsl|frag|vert"],
        golang: ["go"],
        Groovy: ["groovy"],
        HAML: ["haml"],
        Handlebars: ["hbs|handlebars|tpl|mustache"],
        Haskell: ["hs"],
        haXe: ["hx"],
        HTML: ["html|htm|xhtml"],
        HTML_Ruby: ["erb|rhtml|html.erb"],
        INI: ["ini|conf|cfg|prefs"],
        Io: ["io"],
        Jack: ["jack"],
        Jade: ["jade"],
        Java: ["java"],
        JavaScript: ["js|jsm"],
        JSON: ["json"],
        JSONiq: ["jq"],
        JSP: ["jsp"],
        JSX: ["jsx"],
        Julia: ["jl"],
        LaTeX: ["tex|latex|ltx|bib"],
        Lean: ["lean|hlean"],
        LESS: ["less"],
        Liquid: ["liquid"],
        Lisp: ["lisp"],
        LiveScript: ["ls"],
        LogiQL: ["logic|lql"],
        LSL: ["lsl"],
        Lua: ["lua"],
        LuaPage: ["lp"],
        Lucene: ["lucene"],
        Makefile: ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
        Markdown: ["md|markdown"],
        Mask: ["mask"],
        MATLAB: ["matlab"],
        Maze: ["mz"],
        MEL: ["mel"],
        MUSHCode: ["mc|mush"],
        MySQL: ["mysql"],
        Nix: ["nix"],
        ObjectiveC: ["m|mm"],
        OCaml: ["ml|mli"],
        Pascal: ["pas|p"],
        Perl: ["pl|pm"],
        pgSQL: ["pgsql"],
        PHP: ["php|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp"],
        Powershell: ["ps1"],
        Praat: ["praat|praatscript|psc|proc"],
        Prolog: ["plg|prolog"],
        Properties: ["properties"],
        Protobuf: ["proto"],
        Python: ["py"],
        R: ["r"],
        RDoc: ["Rd"],
        RHTML: ["Rhtml"],
        Ruby: ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
        Rust: ["rs"],
        SASS: ["sass"],
        SCAD: ["scad"],
        Scala: ["scala"],
        Scheme: ["scm|rkt"],
        SCSS: ["scss"],
        SH: ["sh|bash|^.bashrc"],
        SJS: ["sjs"],
        Smarty: ["smarty|tpl"],
        snippets: ["snippets"],
        Soy_Template: ["soy"],
        Space: ["space"],
        SQL: ["sql"],
        SQLServer: ["sqlserver"],
        Stylus: ["styl|stylus"],
        SVG: ["svg"],
        Swift: ["swift"],
        Tcl: ["tcl"],
        Tex: ["tex"],
        Text: ["txt"],
        Textile: ["textile"],
        Toml: ["toml"],
        Twig: ["twig|swig"],
        Typescript: ["ts|typescript|str"],
        Vala: ["vala"],
        VBScript: ["vbs|vb"],
        Velocity: ["vm"],
        Verilog: ["v|vh|sv|svh"],
        VHDL: ["vhd|vhdl"],
        XML: ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],
        XQuery: ["xq"],
        YAML: ["yaml|yml"],
        // Add the missing mode "Django" to ext-modelist //
        Django: ["html"],
    }
    
    var nameOverrides = {
        ObjectiveC: "Objective-C",
        CSharp: "C#",
        golang: "Go",
        C_Cpp: "C and C++",
        coffee: "CoffeeScript",
        HTML_Ruby: "HTML (Ruby)",
        FTL: "FreeMarker"
    }
    
    function Mode(name, caption, extensions) {
        this.name = name
        this.caption = caption
        this.mode = "mode/" + name
        this.src = "mode/" + name + "_highlight_rules.js"
        this.extensions = extensions
        if (/\^/.test(extensions)) {
            var re = extensions.replace(/\|(\^)?/g, function(a, b) {
                return "$|" + (b ? "^" : "^.*\\.")
            }) + "$"
        } else {
            var re = "^.*\\.(" + extensions + ")$"
        }
        this.extRe = new RegExp(re, "gi")
    }
    
    Mode.prototype.supportsFile = function(filename) {
        return filename.match(this.extRe)
    }
    
    for (var name in supportedModes) {
        var data = supportedModes[name]
        var displayName = (nameOverrides[name] || name).replace(/_/g, " ")
        var filename = name.toLowerCase()
        var mode = new Mode(filename, displayName, data[0])
        this.modesByName[filename] = mode
        this.modes.push(mode)
    }
}
__modelist.prototype = []

function __themelist() {
    var themeData = [
        ["Chrome"], 
        ["Clouds"], 
        ["Crimson Editor"], 
        ["Dawn"], 
        ["Dreamweaver"], 
        ["Eclipse"], 
        ["GitHub"], 
        ["IPlastic"], 
        ["Solarized Light"], 
        ["TextMate"], 
        ["Tomorrow"], 
        ["XCode"], 
        ["Kuroir"], 
        ["KatzenMilch"], 
        ["SQL Server", "sqlserver", "light"], 
        ["Ambiance", "ambiance", "dark"], 
        ["Chaos", "chaos", "dark"], 
        ["Clouds Midnight", "clouds_midnight", "dark"], 
        ["Cobalt", "cobalt", "dark"], 
        ["idle Fingers", "idle_fingers", "dark"], 
        ["krTheme", "kr_theme", "dark"], 
        ["Merbivore", "merbivore", "dark"], 
        ["Merbivore Soft", "merbivore_soft", "dark"], 
        ["Mono Industrial", "mono_industrial", "dark"], 
        ["Monokai", "monokai", "dark"], 
        ["Pastel on dark", "pastel_on_dark", "dark"], 
        ["Solarized Dark", "solarized_dark", "dark"], 
        ["Terminal", "terminal", "dark"], 
        ["Tomorrow Night", "tomorrow_night", "dark"], 
        ["Tomorrow Night Blue", "tomorrow_night_blue", "dark"], 
        ["Tomorrow Night Bright", "tomorrow_night_bright", "dark"], 
        ["Tomorrow Night 80s", "tomorrow_night_eighties", "dark"], 
        ["Twilight", "twilight", "dark"], 
        ["Vibrant Ink", "vibrant_ink", "dark"], 
    ]
    var __self = this
    this.themesByName = {}
    this.themes = themeData.map(function(data) {
        var name = data[1] || data[0].replace(/ /g, "_").toLowerCase()
        var theme = {
            caption: data[0],
            theme: "theme/" + name,
            isDark: data[2] == "dark",
            name: name,
            href: "theme/" + name + '.css',
        }
        __self.themesByName[name] = theme
        return theme
    })
}
__themelist.prototype = []

function _editor(){
    this.timeout = 1400
    this.getTime = function() { return new Date().getTime() }
    this.startTime = this.getTime()
    this.invalidateFlag = false
    this.spellcheck = false
    this.contentEditable = true
    display_indent_guides.value = "off"
    this.getCursor = function() {
        return document.getSelection().focusOffset
    }
    this.setCursor = function(v) {
        if (this.toHTML[v]) {
            this.toHTML[v] = "<ace></ace>" + this.toHTML[v]
        }
    }
    this.resize = function(ht){
        if (ht && (ht>this.clientHeight)) {
            this.style.height = ht
        }
    }
    this.verifyHighlight = {
        'SsS':function() {
                var w = '&nbsp;'
                if ( display_indent_guides.value=="on" ) {
                    w = '<ace_indent-guide>&nbsp;</ace_indent-guide>'
                }
                return w
            },
        'NnN':function() {
                return '<br>'
            },
    }
    this.toHTML = ''
    var verifyHighlight = this.verifyHighlight
    this.tokenize = function(){
        var s = this.innerText
            .replace(/\n/gm,'%#%NnN%#%')
            .replace(/\s/gm,' SsS ')
            .replace(/([\W]+)/gm,' $1 ')
            .replace(/(%#%)+/gm, ' ')
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
                multiline_comment = Infinity
                token = w+"</ace_comment>"
            } else
            if (multiline_comment && (i>multiline_comment-1)) {
                if (w.match(keywordMapper["newline"])) {
                    token = verifyHighlight[w]() 
                } else 
                if (w=='SsS') {
                    token = verifyHighlight[w]()
                } else {
                    // NOP //
                }
            } else
            if (w.match(keywordMapper["line.comment"]) && (line_comment==Infinity)) {
                line_comment = Math.min(i+1, line_comment)
                token = "<ace_comment>"+w
            } else
            if (w.match(keywordMapper["newline"]) && (line_comment!=Infinity)) {
                line_comment = Infinity
                token = "</ace_comment><br>"
            } else
            if (w.match(keywordMapper["newline"])) {
                token = verifyHighlight[w]()
            } else
            if ((line_comment!=Infinity) && (i>line_comment-1) ) {
                if (w=='SsS') {
                    token = verifyHighlight[w]()
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
            if (((line_comment!=Infinity) || (multiline_comment!=Infinity)) && (i==me.length-1)) {
                token = w+"</ace_comment>"
            } else 
            if (w=='SsS') {
                token = verifyHighlight[w]()
            } 
            return token
        })
    }
    this.annotate = function(){
        this.innerHTML = this.toHTML.join('') || this.innerHTML
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
        if (this.invalidateFlag) { // check flag first (performance) //
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

function _rows(){
    this.rows = []
    this.fontsize = 9
    this.lastResizeNum
    this.resize = function(startIDX, ht){
        this.rows = []
        startIDX = startIDX || 0
        ht = ht || editor_shell.clientHeight
        if (editor.clientHeight>ht) {
            ht = editor.clientHeight
        } 
        if (editor.scrollHeight>ht) {
            ht = editor.scrollHeight
        }
        if ( ht != this.lastResizeNum ) {
            var B = parseInt((ht/this.fontsize)*0.65) /* 12pt:0.80; 13pt:0.75; 9pt:0.65 */
            for (var b = startIDX; b<B; b++) {
                this.rows.push(b+1)
            }
            this.innerText = this.rows.join('\n')
            this.lastResizeNum = ht
        }
    }
    this.resize()
}
_rows.prototype = __rows__

var themelist = new __themelist()
var util = new __util()
var htm = new __htm()
var modelist = new __modelist()
var editor = new _editor()
var rows = new _rows()


util.fillDropdown(htm.mode, modelist.modes, modelist.modes[50].name) /* default mode library: javascript */
util.fillDropdown(htm.theme, themelist.themes, themelist.themes[9].name) /* default theme: TextMate */

addEventListener('resize',function(){ rows.resize() },false)

__editor__.addEventListener('keyup', function(v){ 
    editor.keybuff = (editor.keybuff && !editor.voidkeycode[editor.keybuff]) ? editor.keybuff:v.keyCode
    if (!editor.voidkeycode[editor.keybuff]) {
        editor.invalidate() 
    }
},false)

mode.addEventListener('change',function(n){ 
    var idx = n.currentTarget.selectedIndex
  __mode__.src = modelist.modes[idx].src 
},false)

theme.addEventListener('change',function(n){ 
    var idx = n.currentTarget.selectedIndex
  __theme__.href = themelist.themes[idx].href 
},false)

display_indent_guides.addEventListener('click', function(){
   display_indent_guides.value = (display_indent_guides.value=="on") ? "off":"on"
   editor.redraw("force")
},false)

setInterval(function(){ 
    if (editor.invalidateFlag) {
        rows.resize()
        editor.redraw()
    }
},100)
