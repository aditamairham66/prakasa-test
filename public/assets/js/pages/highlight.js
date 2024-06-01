let elements = document.querySelectorAll('[data-clipboard-action="copy"]');
for (var i = 0; i < elements.length; i++) {
    let r = null;
    var clipboard = new ClipboardJS(elements[i],{
        target: function(e) {
            return (r = e.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".hidden")) && r.classList.remove("hidden"),
            e.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".language-html")
        }
    });
    clipboard.on("success", function(e) {
        var t = e.trigger.innerHTML;
        r && r.classList.add("hidden");
        let n = e.trigger.querySelector("span");
        n.innerHTML = "Copied",
        e.clearSelection(),
        setTimeout(function() {
            e.trigger.innerHTML = t
        }, 2e3)
    })
}
Prism.plugins.NormalizeWhitespace.setDefaults({
    "remove-trailing": !0,
    "remove-indent": !0,
    "left-trim": !0,
    "right-trim": !0
});
