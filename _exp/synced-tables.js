// TODO: rewrite this, since now we have sync-width.js
function syncedTableColumns($headerTable, $dataTable) {
    var $headerColumns      = $headerTable.find("tr:first-child th");
    var $headerColumnWidths = [];
    
    $headerColumns.each(function () {
        $headerColumnWidths.push(jQuery(this).outerWidth());
    });
    
    var $dataColumns      = $dataTable.find("tr:first-child td");
    var $dataColumnWidths = [];
    
    $dataColumns.each(function () {
        $dataColumnWidths.push(jQuery(this).outerWidth());
    });
    
    var maxWidths = [];
    
    for (var i = 0; i < $headerColumnWidths.length; i++) {
        var max = Math.max.call(null, $headerColumnWidths[i], $dataColumnWidths[i]);
        jQuery($headerColumns).eq(i).css("width", max + "px");
        jQuery($dataColumns).eq(i).css("width", max + "px");
        maxWidths.push(max);
    }
    
    return maxWidths;
}

function fullWidthTables($headerTable, $dataTable, widths) {
    var widths = widths || null;
    if (widths == null) {
        widths = [];
        var $headerColumns = $headerTable.find("tr:first-child th");
        $headerColumns.each(function () {
            widths.push(jQuery(this).outerWidth());
        });
    }
    
    var $wrapper = $dataTable.parent();
    if ($wrapper[0].scrollHeight > $wrapper[0].clientHeight) {
        $dataTable.find("tr:first-child td").last().css("width", widths[widths.length - 1] - 8 + "px");
    }
    
    $headerTable.css("width", "100%");
    $dataTable.css("width", "100%");
}