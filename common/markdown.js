/**
 * Created by hama on 2017/10/12.
 */
const MarkdownIt = require('markdown-it');
const _          = require('lodash');
const validator  = require('validator');
const jsxss      = require('xss');
// Set default options
var md = new MarkdownIt();

md.set({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    linkify:      true,        // Autoconvert URL-like text to links
    typographer:  true,        // Enable smartypants and other sweet transforms
});

md.renderer.rules.fence = function (tokens, idx) {
    var token    = tokens[idx];
    var language = token.info && ('language-' + token.info) || '';
    language     = validator.escape(language);

    return '<pre class="prettyprint ' + language + '">'
        + '<code>' + validator.escape(token.content) + '</code>'
        + '</pre>';
};

md.renderer.rules.code_block = function (tokens, idx /*, options*/) {
    var token    = tokens[idx];
    return '<pre class="prettyprint">'
        + '<code>' + validator.escape(token.content) + '</code>'
        + '</pre>';
};
var myxss = new jsxss.FilterXSS({
    onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
        // 让 prettyprint 可以工作
        if (tag === 'pre' && name === 'class') {
            return name + '="' + jsxss.escapeAttrValue(value) + '"';
        }
    }
});
exports.markdown = function (text) {
    return '<div class="markdown-text">' + myxss.process(md.render(text || '')) + '</div>';
};