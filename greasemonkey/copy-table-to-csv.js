// ==UserScript==
// @name     Export table to clipboard as CSV
// @version  1
// @grant    none
// ==/UserScript==
const exportTableToCsv = () => {
    let selection = document.getSelection();
    let csv = "";
    if (selection) {
        let node = selection.focusNode;
        while (node) {
            if (node.tagName == "TABLE") {
                for (let i = 0; i < node.rows.length; i++) {
                    let row = node.rows[i];
                    for (let j = 0; j < row.cells.length; j++) {
                        csv += row.cells[j].innerText + "\t";
                    }
                    csv += "\n";
                }
                console.log(csv);
                navigator.clipboard.writeText(csv);
                break;
            }
            node = node.parentNode;
        }
    }
    if (!csv) {
        alert('Table não selecionada');
    }
}
document.querySelectorAll('table').forEach(table => {
    table.addEventListener('contextmenu', e => {
        //test if ctrl key is pressed
        if (e.ctrlKey) {
            e.preventDefault();
            exportTableToCsv();
        }
    });
});



// var body = document.body;
// body.addEventListener("contextmenu", initMenu, false);

// var menu = body.appendChild(document.createElement("menu"));
// menu.outerHTML = '<menu id="userscript-copytable-as-csv" type="context">\
//                     <menuitem label="Copy table to clipboard as CSV"\></menuitem>\
//                   </menu>';

// function initMenu(aEvent) {
//     // Executed when user right click on web page body
//     // aEvent.target is the element you right click on
//     var node = aEvent.target;
//     var item = document.querySelector("#userscript-copytable-as-csv menuitem");
//     var nodeHasTableAncestor = false;
//     while (node) {
//         if (node.localName == "table") {
//             nodeHasTableAncestor = true;
//             break;
//         }
//         node = node.parentNode;
//     }
//     console.log('initMenu', node, nodeHasTableAncestor);

//     if (nodeHasTableAncestor) {
//         body.setAttribute("contextmenu", "userscript-copytable-as-csv");
//         //item.setAttribute("imageURL", node.src);
//     } else {
//         //body.removeAttribute("contextmenu");
//         //item.removeAttribute("imageURL");
//     }
// }

// document.querySelector("#userscript-copytable-as-csv menuitem")
//     .addEventListener("click", exportTableToCsv, false);